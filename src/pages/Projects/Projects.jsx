import { useEffect, useMemo, useRef, useState } from 'react'
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx'
import FilterBar from '../../components/FilterBar/FilterBar.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'
import ProjectForm from '../../components/ProjectForm/ProjectForm.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import useDragReorder from '../../hooks/useDragReorder.js'
import { getProjectTasks, getStatusForTasks, PROJECT_STATUSES, PROJECT_STATUS_LABELS } from '../../interfaces/project.js'

const emptyFilters = { category: '', status: '', priority: '' }

export default function Projects({ projects, projectOrder, onReorderProjects, onAddProject, onUpdateProject, onDeleteProject }) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(emptyFilters)
  const [showFilters, setShowFilters] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)
  const extraFilterCount = Number(Boolean(filters.category)) + Number(Boolean(filters.priority))
  const hasFilters = Boolean(search || filters.status || extraFilterCount)

  const [announcement, setAnnouncement] = useState('')
  const listRef = useRef(null)
  const focusHandleId = useRef(null)

  const orderedProjects = useMemo(() => {
    const rank = new Map(projectOrder.map((id, index) => [id, index]))
    return [...projects].sort((a, b) => {
      const rankA = rank.get(a.id)
      const rankB = rank.get(b.id)
      if (rankA === undefined && rankB === undefined) return new Date(b.createdAt) - new Date(a.createdAt)
      if (rankA === undefined) return -1
      if (rankB === undefined) return 1
      return rankA - rankB
    })
  }, [projects, projectOrder])

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr')
    return orderedProjects.filter((project) => (
      `${project.title} ${project.description} ${(project.tasks ?? []).map((task) => task.text).join(' ')}`.toLocaleLowerCase('tr').includes(query) &&
      (!filters.category || project.category === filters.category) &&
      (!filters.status || project.status === filters.status) &&
      (!filters.priority || project.priority === filters.priority)
    ))
  }, [orderedProjects, search, filters])

  const moveProject = (from, to) => {
    const moving = filteredProjects[from]
    const target = filteredProjects[to]
    if (!moving || !target || from === to) return
    const ids = orderedProjects.map((project) => project.id).filter((id) => id !== moving.id)
    const targetIndex = ids.indexOf(target.id)
    ids.splice(to > from ? targetIndex + 1 : targetIndex, 0, moving.id)
    onReorderProjects(ids)
    setAnnouncement(`${moving.title} moved to position ${to + 1} of ${filteredProjects.length}.`)
  }
  const startDrag = useDragReorder(listRef, moveProject)
  const handleReorderKey = (event, index) => {
    const step = { ArrowUp: -1, ArrowDown: 1 }[event.key]
    if (!step) return
    event.preventDefault()
    const to = index + step
    if (to < 0 || to >= filteredProjects.length) return
    focusHandleId.current = filteredProjects[index].id
    moveProject(index, to)
  }

  useEffect(() => {
    if (!focusHandleId.current) return
    document.querySelector(`[data-drag-handle="${focusHandleId.current}"]`)?.focus()
    focusHandleId.current = null
  }, [filteredProjects])

  const toggleTask = (project, task) => {
    const tasks = getProjectTasks(project).map((item) => item.id === task.id ? { ...item, done: !item.done } : item)
    onUpdateProject(project.id, { tasks, description: '', status: getStatusForTasks(project.status, tasks) })
  }
  const closeForm = () => { setShowForm(false); setEditingProject(null) }
  const handleSubmit = (data) => {
    if (editingProject) onUpdateProject(editingProject.id, data)
    else onAddProject(data)
    closeForm()
  }

  return (
    <section className="page-shell">
      <div className="page-heading">
        <div>
          <h1>Projects</h1>
          <p className="page-description">Track and manage your projects.</p>
        </div>
        <button className="button button-primary" type="button" onClick={() => setShowForm(true)}><span aria-hidden="true">＋</span> New project</button>
      </div>
      <div className="project-panel">
        <div className="status-tabs" role="group" aria-label="Filter by project status">
          {['', ...PROJECT_STATUSES].map((status) => (
            <button key={status} className={`status-tab ${filters.status === status ? 'is-active' : ''}`}
              type="button" aria-pressed={filters.status === status} onClick={() => setFilters({ ...filters, status })}>
              {status ? PROJECT_STATUS_LABELS[status] : 'All projects'}<span>{status ? projects.filter((p) => p.status === status).length : projects.length}</span>
            </button>
          ))}
        </div>
        <div className="list-toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <button className={`button button-secondary ${extraFilterCount ? 'has-filters' : ''}`}
            type="button" aria-expanded={showFilters} aria-controls="project-filters" onClick={() => setShowFilters(!showFilters)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 7h16M7 12h10m-7 5h4" /></svg>
            Filters{extraFilterCount > 0 ? ` (${extraFilterCount})` : ''}
          </button>
        </div>
        {showFilters && <div id="project-filters" className="filter-panel">
          <FilterBar filters={filters} onChange={setFilters} />
          {extraFilterCount > 0 && <button className="text-button clear-filters" type="button" onClick={() => setFilters({ ...filters, category: '', priority: '' })}>Clear filters</button>}
        </div>}
        <p className="visually-hidden" role="status">{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}{hasFilters ? ' shown' : ''}</p>
        <p className="visually-hidden" aria-live="assertive">{announcement}</p>
        <p id="reorder-help" className="visually-hidden">Drag to change the order, or use the up and down arrow keys.</p>
        <div className="project-list" ref={listRef}>
          {filteredProjects.map((project, index) => <ProjectCard key={project.id} project={project}
            onDragStart={(event) => startDrag(event, index)} onReorderKey={(event) => handleReorderKey(event, index)}
            onToggleTask={toggleTask}
            onEdit={(item) => { setEditingProject(item); setShowForm(true) }} onDelete={setDeletingProject} />)}
        </div>
        {filteredProjects.length === 0 && <div className="empty-state">
          <span className="empty-symbol" aria-hidden="true">{projects.length ? '⌕' : '＋'}</span>
          <h2>{projects.length ? 'No matching projects' : 'Start with your first project'}</h2>
          <p>{projects.length ? 'Try another search or clear your filters.' : 'Add an idea and track its progress here.'}</p>
          <button className="button button-secondary" type="button" onClick={() => {
            if (projects.length) { setSearch(''); setFilters(emptyFilters) }
            else setShowForm(true)
          }}>{projects.length ? 'Clear filters' : 'Add a project'}</button>
        </div>}
      </div>
      {showForm && <Modal labelledBy="project-form-title" onCancel={closeForm}>
        <ProjectForm key={editingProject?.id ?? 'new'} project={editingProject} onSubmit={handleSubmit} onCancel={closeForm} />
      </Modal>}
      <DeleteModal project={deletingProject} onConfirm={() => { onDeleteProject(deletingProject.id); setDeletingProject(null) }} onCancel={() => setDeletingProject(null)} />
    </section>
  )
}
