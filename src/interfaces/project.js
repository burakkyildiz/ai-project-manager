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
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} description
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
    category: project.category,
    technologies: [...project.technologies],
    status: project.status,
    priority: project.priority,
    createdAt: project.createdAt ?? new Date().toISOString(),
  }
}
