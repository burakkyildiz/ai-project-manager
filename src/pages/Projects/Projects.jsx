import { useMemo, useState } from 'react'
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx'
import FilterBar from '../../components/FilterBar/FilterBar.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'
import ProjectForm from '../../components/ProjectForm/ProjectForm.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import { PROJECT_STATUSES, PROJECT_STATUS_LABELS } from '../../interfaces/project.js'

const emptyFilters = { category: '', status: '', priority: '' }

export default function Projects({ projects, onAddProject, onUpdateProject, onDeleteProject }) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(emptyFilters)
  const [showFilters, setShowFilters] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)
  const extraFilterCount = Number(Boolean(filters.category)) + Number(Boolean(filters.priority))
  const hasFilters = Boolean(search || filters.status || extraFilterCount)

  const filteredProjects = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr')
    return projects.filter((project) => (
      `${project.title} ${project.description}`.toLocaleLowerCase('tr').includes(query) &&
      (!filters.category || project.category === filters.category) &&
      (!filters.status || project.status === filters.status) &&
      (!filters.priority || project.priority === filters.priority)
    )).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }, [projects, search, filters])

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
        {showFilters && <div id="project-filters" className="filter-panel"><FilterBar filters={filters} onChange={setFilters} /></div>}
        <div className="list-caption">
          <span role="status">{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}{hasFilters ? ' shown' : ''}</span>
          {hasFilters ? <button className="text-button" type="button" onClick={() => { setSearch(''); setFilters(emptyFilters) }}>Clear filters</button> : <span>Newest first</span>}
        </div>
        <div className="project-list">
          {filteredProjects.map((project) => <ProjectCard key={project.id} project={project}
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
