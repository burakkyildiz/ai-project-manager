import StatusBadge from '../StatusBadge/StatusBadge.jsx'

const priorityClass = { 'Düşük': 'low', 'Orta': 'medium', 'Yüksek': 'high' }

export default function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="project-row">
      <div className="project-content">
        <div className="project-title-line">
          <h2>{project.title}</h2>
          <span className="project-category">{project.category}</span>
        </div>
        <details className="project-details">
          <summary>
            <span className="details-show">Açıklamayı göster</span>
            <span className="details-hide">Açıklamayı gizle</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="project-details-body">
            <p className="project-description">{project.description.trim() ? project.description : 'Açıklama eklenmedi.'}</p>
            <p className="project-technologies">Teknolojiler: {project.technologies.join(', ') || 'Belirtilmedi'}</p>
          </div>
        </details>
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
