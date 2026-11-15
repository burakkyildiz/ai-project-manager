import { useState } from 'react'
import { PROJECT_CATEGORIES, PROJECT_STATUSES, PROJECT_PRIORITIES, PROJECT_STATUS_LABELS, PROJECT_PRIORITY_LABELS } from '../../interfaces/project.js'

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => ({
    title: project?.title ?? '', description: project?.description ?? '',
    category: project?.category ?? PROJECT_CATEGORIES[0], technologies: project?.technologies.join(', ') ?? '',
    status: project?.status ?? PROJECT_STATUSES[0], priority: project?.priority ?? PROJECT_PRIORITIES[1],
  }))
  const [error, setError] = useState('')
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.description.trim()) {
      setError('Add a project name and description.'); return
    }
    try {
      onSubmit({ ...form, title: form.title.trim(), description: form.description.trim(),
        technologies: [...new Set(form.technologies.split(',').map((item) => item.trim()).filter(Boolean))] })
    } catch {
      setError('Could not save the project. Check your browser storage and try again.')
    }
  }
  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="modal-heading"><div>
        <h2 id="project-form-title">{project ? 'Edit project' : 'New project'}</h2></div>
        <button type="button" className="close-button" aria-label="Close form" onClick={onCancel}>×</button>
      </div>
      <div className="form-fields">
        <label htmlFor="project-title">Project name<input id="project-title" name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Image classification" /></label>
        <label htmlFor="project-description">Description<textarea id="project-description" name="description" value={form.description} onChange={handleChange} required rows="3" placeholder="What do you want to build with this project?" /></label>
        <div className="form-grid">
          <label htmlFor="project-status">Status<select id="project-status" name="status" value={form.status} onChange={handleChange}>{PROJECT_STATUSES.map((item) => <option key={item} value={item}>{PROJECT_STATUS_LABELS[item]}</option>)}</select></label>
          <label htmlFor="project-priority">Priority<select id="project-priority" name="priority" value={form.priority} onChange={handleChange}>{PROJECT_PRIORITIES.map((item) => <option key={item} value={item}>{PROJECT_PRIORITY_LABELS[item]}</option>)}</select></label>
        </div>
        <label htmlFor="project-category">Category<select id="project-category" name="category" value={form.category} onChange={handleChange}>{PROJECT_CATEGORIES.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label htmlFor="project-technologies">Technologies <span className="optional">(optional)</span><input id="project-technologies" name="technologies" value={form.technologies} onChange={handleChange} placeholder="Python, PyTorch, OpenCV" aria-describedby="technologies-help" /></label>
        <p id="technologies-help" className="field-help">Separate multiple technologies with commas.</p>
      </div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="modal-footer"><button type="button" className="button button-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="button button-primary">{project ? 'Save changes' : 'Create project'}</button></div>
    </form>
  )
}
