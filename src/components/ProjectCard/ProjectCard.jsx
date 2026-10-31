import StatusBadge from '../StatusBadge/StatusBadge.jsx'

const priorityClass = { 'Düşük': 'low', 'Orta': 'medium', 'Yüksek': 'high' }

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="project-row">
      <div className="project-content">
        <div className="project-title-line"><h2>{project.title}</h2></div>
        <p className="project-description">{project.description}</p>
        <div className="project-meta"><span>{project.category}</span>
          <details className="project-details"><summary>Detaylar</summary>
            <div><p>Teknolojiler: {project.technologies.join(', ') || 'Belirtilmedi'}</p></div>
          </details>
        </div>
      </div>
      <div className="project-actions">
        <div className="project-badges">
          <StatusBadge status={project.status} />
          <span className={`priority-badge ${priorityClass[project.priority] ?? ''}`}>{project.priority} öncelik</span>
        </div>
        <div className="row-buttons">
          <button className="text-button" aria-label={`${project.title} projesini düzenle`} onClick={() => onEdit(project)}>Düzenle</button>
          <button className="text-button delete-button" aria-label={`${project.title} projesini sil`} onClick={() => onDelete(project)}>Sil</button>
        </div>
      </div>
    </article>
  )
}
