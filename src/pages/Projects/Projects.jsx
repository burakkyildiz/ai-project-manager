import { useMemo, useState } from 'react'
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx'
import FilterBar from '../../components/FilterBar/FilterBar.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'
import ProjectForm from '../../components/ProjectForm/ProjectForm.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import Modal from '../../components/Modal/Modal.jsx'
import { PROJECT_STATUSES } from '../../interfaces/project.js'

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
        <div><p className="eyebrow">ÇALIŞMA ALANI</p><h1>Projeler</h1>
          <p className="page-description">Fikirlerini bir sonraki adıma taşı.</p></div>
        <button className="button button-primary" onClick={() => setShowForm(true)}><span aria-hidden="true">＋</span> Yeni proje</button>
      </div>
      <div className="project-panel">
        <div className="status-tabs" role="group" aria-label="Proje durumuna göre filtrele">
          {['', ...PROJECT_STATUSES].map((status) => (
            <button key={status} className={`status-tab ${filters.status === status ? 'is-active' : ''}`}
              aria-pressed={filters.status === status} onClick={() => setFilters({ ...filters, status })}>
              {status || 'Tüm projeler'}<span>{status ? projects.filter((p) => p.status === status).length : projects.length}</span>
            </button>
          ))}
        </div>
        <div className="list-toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <button className={`button button-secondary ${extraFilterCount ? 'has-filters' : ''}`}
            aria-expanded={showFilters} aria-controls="project-filters" onClick={() => setShowFilters(!showFilters)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 7h16M7 12h10m-7 5h4" /></svg>
            Filtreler{extraFilterCount > 0 ? ` (${extraFilterCount})` : ''}
          </button>
        </div>
        {showFilters && <div id="project-filters" className="filter-panel"><FilterBar filters={filters} onChange={setFilters} /></div>}
        <div className="list-caption">
          <span role="status">{filteredProjects.length} proje{hasFilters ? ' gösteriliyor' : ''}</span>
          {hasFilters ? <button className="text-button" onClick={() => { setSearch(''); setFilters(emptyFilters) }}>Filtreleri temizle</button> : <span>En yeni önce</span>}
        </div>
        <div className="project-list">
          {filteredProjects.map((project) => <ProjectCard key={project.id} project={project}
            onEdit={(item) => { setEditingProject(item); setShowForm(true) }} onDelete={setDeletingProject} />)}
        </div>
        {filteredProjects.length === 0 && <div className="empty-state">
          <span className="empty-symbol" aria-hidden="true">{projects.length ? '⌕' : '＋'}</span>
          <h2>{projects.length ? 'Eşleşen proje yok' : 'İlk projenle başla'}</h2>
          <p>{projects.length ? 'Başka bir kelime ara veya filtreleri temizle.' : 'Aklındaki fikri ekle, ilerlemesini buradan takip et.'}</p>
          <button className="button button-secondary" onClick={() => {
            if (projects.length) { setSearch(''); setFilters(emptyFilters) }
            else setShowForm(true)
          }}>{projects.length ? 'Filtreleri temizle' : 'Yeni proje ekle'}</button>
        </div>}
      </div>
      <p className="workspace-note">Her büyük proje, küçük bir adımla başlar.</p>
      {showForm && <Modal labelledBy="project-form-title" onCancel={closeForm}>
        <ProjectForm key={editingProject?.id ?? 'new'} project={editingProject} onSubmit={handleSubmit} onCancel={closeForm} />
      </Modal>}
      <DeleteModal project={deletingProject} onConfirm={() => { onDeleteProject(deletingProject.id); setDeletingProject(null) }} onCancel={() => setDeletingProject(null)} />
    </section>
  )
}
