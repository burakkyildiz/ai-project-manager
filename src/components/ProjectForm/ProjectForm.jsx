import { useEffect, useRef, useState } from 'react'
import { getProjectTasks, getStatusForTasks, PROJECT_CATEGORIES, PROJECT_STATUSES, PROJECT_PRIORITIES, PROJECT_STATUS_LABELS, PROJECT_PRIORITY_LABELS } from '../../interfaces/project.js'

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => ({
    title: project?.title ?? '',
    category: project?.category ?? PROJECT_CATEGORIES[0], technologies: project?.technologies.join(', ') ?? '',
    status: project?.status ?? PROJECT_STATUSES[0], priority: project?.priority ?? PROJECT_PRIORITIES[1],
  }))
  const [tasks, setTasks] = useState(() => project ? getProjectTasks(project).map((task) => ({ ...task, id: crypto.randomUUID() })) : [])
  const [error, setError] = useState('')
  const focusTaskId = useRef(null)
  const taskList = useRef(null)

  useEffect(() => {
    if (!focusTaskId.current) return
    taskList.current?.querySelector(`[data-task-id="${focusTaskId.current}"]`)?.focus()
    focusTaskId.current = null
  }, [tasks])

  const addTask = (afterIndex = tasks.length - 1) => {
    const task = { id: crypto.randomUUID(), text: '', done: false }
    focusTaskId.current = task.id
    setTasks([...tasks.slice(0, afterIndex + 1), task, ...tasks.slice(afterIndex + 1)])
  }
  const changeTask = (id, text) => setTasks(tasks.map((task) => task.id === id ? { ...task, text } : task))
  const removeTask = (index) => {
    focusTaskId.current = tasks[index - 1]?.id ?? tasks[index + 1]?.id ?? null
    setTasks(tasks.filter((_, i) => i !== index))
  }
  const handleTaskKey = (event, index) => {
    if (event.key === 'Enter') { event.preventDefault(); if (tasks[index].text.trim()) addTask(index) }
    if (event.key === 'Backspace' && !tasks[index].text) { event.preventDefault(); removeTask(index) }
  }
  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setError('Add a project name.'); return
    }
    const cleanTasks = tasks.map((task) => ({ ...task, text: task.text.trim() })).filter((task) => task.text)
    if (form.status === 'Tamamlandı' && project?.status !== 'Tamamlandı' && cleanTasks.some((task) => !task.done)) {
      setError('Finish all tasks before setting the status to Completed.'); return
    }
    try {
      onSubmit({ ...form, title: form.title.trim(), description: '',
        status: getStatusForTasks(form.status, cleanTasks),
        tasks: cleanTasks,
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
        <fieldset className="task-editor">
          <legend>Tasks <span className="optional">(optional)</span></legend>
          <ul className="task-editor-list" ref={taskList}>
            {tasks.map((task, index) => (
              <li key={task.id} className="task-editor-row">
                <input data-task-id={task.id} value={task.text} aria-label={`Task ${index + 1}`} placeholder="Describe a task"
                  onChange={(event) => changeTask(task.id, event.target.value)} onKeyDown={(event) => handleTaskKey(event, index)} />
                <button type="button" className="task-remove" aria-label={`Remove task ${index + 1}`} onClick={() => removeTask(index)}>×</button>
              </li>
            ))}
          </ul>
          <button type="button" className="button button-secondary task-add" onClick={() => addTask()}><span aria-hidden="true">＋</span> Add task</button>
        </fieldset>
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
