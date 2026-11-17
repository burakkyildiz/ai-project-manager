/**
 * @typedef {'Machine Learning' | 'Deep Learning' | 'Computer Vision' | 'Natural Language Processing' | 'Data Science' | 'Generative AI' | 'Other'} ProjectCategory
 */

/**
 * @typedef {'Başlanmadı' | 'Devam Ediyor' | 'Tamamlandı'} ProjectStatus
 */

/**
 * @typedef {'Düşük' | 'Orta' | 'Yüksek'} ProjectPriority
 */

/**
 * @typedef {Object} ProjectTask
 * @property {string} id
 * @property {string} text
 * @property {boolean} done
 */

/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} description Legacy free text; new projects keep it empty and use `tasks`.
 * @property {ProjectTask[]} [tasks]
 * @property {ProjectCategory} category
 * @property {string[]} technologies
 * @property {ProjectStatus} status
 * @property {ProjectPriority} priority
 * @property {string} createdAt
 */

/** @type {ProjectCategory[]} */
export const PROJECT_CATEGORIES = [
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'Natural Language Processing',
  'Data Science',
  'Generative AI',
  'Other',
]

/** @type {ProjectStatus[]} */
export const PROJECT_STATUSES = ['Başlanmadı', 'Devam Ediyor', 'Tamamlandı']

export const PROJECT_STATUS_LABELS = {
  'Başlanmadı': 'Not started',
  'Devam Ediyor': 'In progress',
  'Tamamlandı': 'Completed',
}

/** @type {ProjectPriority[]} */
export const PROJECT_PRIORITIES = ['Düşük', 'Orta', 'Yüksek']

export const PROJECT_PRIORITY_LABELS = {
  'Düşük': 'Low',
  'Orta': 'Medium',
  'Yüksek': 'High',
}

/** @param {unknown} task */
function isValidTask(task) {
  return Boolean(task) && typeof task === 'object' &&
    typeof task.id === 'string' && typeof task.text === 'string' && typeof task.done === 'boolean'
}

/**
 * Tasks of a project. Older projects only have a free-text description, so each
 * non-empty line of it is shown as a task until the project is edited.
 * @param {Pick<Project, 'description' | 'tasks'>} project
 * @returns {ProjectTask[]}
 */
export function getProjectTasks(project) {
  if (project.tasks?.length) return project.tasks
  return project.description
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*•]|\d+[.)])\s*/, '').trim())
    .filter(Boolean)
    .map((text, index) => ({ id: `legacy-${index}`, text, done: false }))
}

/**
 * A project with tasks is completed exactly when all of them are done: finishing the
 * last task completes it, and an open task keeps it (or moves it back) in progress.
 * Projects without tasks keep whatever status was chosen.
 * @param {ProjectStatus} status
 * @param {ProjectTask[]} tasks
 * @returns {ProjectStatus}
 */
export function getStatusForTasks(status, tasks) {
  if (tasks.length === 0) return status
  if (tasks.every((task) => task.done)) return 'Tamamlandı'
  return status === 'Tamamlandı' ? 'Devam Ediyor' : status
}

/**
 * @param {unknown} value
 * @returns {value is Project}
 */
export function isValidProject(value) {
  if (!value || typeof value !== 'object') {
    return false
  }

  const project = /** @type {Record<string, unknown>} */ (value)

  return (
    typeof project.id === 'string' &&
    typeof project.title === 'string' &&
    typeof project.description === 'string' &&
    (project.tasks === undefined || (Array.isArray(project.tasks) && project.tasks.every(isValidTask))) &&
    typeof project.category === 'string' &&
    PROJECT_CATEGORIES.includes(/** @type {ProjectCategory} */ (project.category)) &&
    Array.isArray(project.technologies) &&
    project.technologies.every((item) => typeof item === 'string') &&
    typeof project.status === 'string' &&
    PROJECT_STATUSES.includes(/** @type {ProjectStatus} */ (project.status)) &&
    typeof project.priority === 'string' &&
    PROJECT_PRIORITIES.includes(/** @type {ProjectPriority} */ (project.priority)) &&
    typeof project.createdAt === 'string'
  )
}

/**
 * @param {Omit<Project, 'id' | 'createdAt'> & Partial<Pick<Project, 'id' | 'createdAt'>>} project
 * @returns {Project}
 */
export function createProject(project) {
  return {
    id: project.id ?? crypto.randomUUID(),
    title: project.title,
    description: project.description,
    tasks: (project.tasks ?? []).map(({ id, text, done }) => ({ id, text, done })),
    category: project.category,
    technologies: [...project.technologies],
    status: project.status,
    priority: project.priority,
    createdAt: project.createdAt ?? new Date().toISOString(),
  }
}
