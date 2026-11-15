import StatusBadge from '../StatusBadge/StatusBadge.jsx'
import { PROJECT_PRIORITY_LABELS } from '../../interfaces/project.js'

const priorityClass = { 'Düşük': 'low', 'Orta': 'medium', 'Yüksek': 'high' }

export default function ProjectCard({ project, onEdit, onDelete, onDragStart, onReorderKey }) {
  return (
    <article className="project-row">
      <div className="project-rail">
        <button className="drag-handle" type="button" aria-label={`Reorder ${project.title}`} aria-describedby="reorder-help"
          data-drag-handle={project.id} onPointerDown={onDragStart} onKeyDown={onReorderKey}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <circle cx="5.5" cy="3.5" r="1.3" /><circle cx="10.5" cy="3.5" r="1.3" />
            <circle cx="5.5" cy="8" r="1.3" /><circle cx="10.5" cy="8" r="1.3" />
            <circle cx="5.5" cy="12.5" r="1.3" /><circle cx="10.5" cy="12.5" r="1.3" />
          </svg>
        </button>
        <span className={`priority-badge ${priorityClass[project.priority] ?? ''}`}>
          {PROJECT_PRIORITY_LABELS[project.priority] ?? project.priority}<span className="visually-hidden"> priority</span>
        </span>
      </div>
      <div className="project-content">
        <div className="project-title-line">
          <StatusBadge status={project.status} />
          <h2>{project.title}</h2>
        </div>
        <details className="project-details">
          <summary>
            <span className="details-show">Show details</span>
            <span className="details-hide">Hide details</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="project-details-body">
            <p className="project-description">{project.description.trim() ? project.description : 'No description added.'}</p>
            <div className="project-meta">
              <p className="project-category">Category: {project.category}</p>
              <p className="project-technologies">Technologies: {project.technologies.join(', ') || 'Not specified'}</p>
            </div>
          </div>
        </details>
      </div>
      <div className="project-actions">
        <div className="row-buttons">
          <button className="text-button" type="button" aria-label={`Edit ${project.title}`} onClick={() => onEdit(project)}>Edit</button>
          <button className="text-button delete-button" type="button" aria-label={`Delete ${project.title}`} onClick={() => onDelete(project)}>Delete</button>
        </div>
      </div>
    </article>
  )
}
