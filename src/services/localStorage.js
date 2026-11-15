import {
  createProject,
  isValidProject,
} from '../interfaces/project.js'

const STORAGE_KEY = 'ai-project-manager-projects'
const ORDER_KEY = 'ai-project-manager-order'

/**
 * Manual list order as project ids. Projects missing from it are shown first, newest first.
 * @returns {string[]}
 */
export function getProjectOrder() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ORDER_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

/** @param {string[]} ids */
export function saveProjectOrder(ids) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(ids))
}

/** @returns {import('../interfaces/project.js').Project[]} */
function getSeedProjects() {
  return [
    createProject({
      id: 'seed-guitar-brand-detection',
      title: 'Guitar Brand Detection',
      description:
        'A computer vision project that classifies guitar brands from images.',
      category: 'Computer Vision',
      technologies: ['Python', 'TensorFlow', 'OpenCV'],
      status: 'Devam Ediyor',
      priority: 'Yüksek',
      createdAt: '2025-01-10T09:00:00.000Z',
    }),
    createProject({
      id: 'seed-ai-workplace-safety',
      title: 'AI Workplace Safety System',
      description:
        'An AI-powered monitoring system that detects safety violations in the workplace.',
      category: 'Computer Vision',
      technologies: ['Python', 'YOLO', 'FastAPI'],
      status: 'Başlanmadı',
      priority: 'Orta',
      createdAt: '2025-02-05T11:30:00.000Z',
    }),
    createProject({
      id: 'seed-email-classification',
      title: 'Email Classification',
      description:
        'An NLP model that classifies emails by category and priority.',
      category: 'Natural Language Processing',
      technologies: ['Python', 'scikit-learn', 'Transformers'],
      status: 'Tamamlandı',
      priority: 'Düşük',
      createdAt: '2024-12-18T14:15:00.000Z',
    }),
  ]
}

/**
 * @returns {import('../interfaces/project.js').Project[] | null}
 */
function readStoredProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)

    if (raw === null) {
      return null
    }

    const parsed = JSON.parse(raw)

    if (!Array.isArray(parsed)) {
      return null
    }

    return parsed.filter(isValidProject)
  } catch {
    return null
  }
}

/**
 * @param {import('../interfaces/project.js').Project[]} projects
 */
function writeStoredProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

/**
 * @returns {import('../interfaces/project.js').Project[]}
 */
export function getProjects() {
  const storedProjects = readStoredProjects()

  if (storedProjects === null) {
    const seedProjects = getSeedProjects()
    writeStoredProjects(seedProjects)
    return seedProjects
  }

  return storedProjects
}

/**
 * @param {import('../interfaces/project.js').Project[]} projects
 * @returns {import('../interfaces/project.js').Project[]}
 */
export function saveProjects(projects) {
  const validProjects = projects.filter(isValidProject)
  writeStoredProjects(validProjects)
  return validProjects
}

/**
 * @param {Omit<import('../interfaces/project.js').Project, 'id' | 'createdAt'>} projectData
 * @returns {import('../interfaces/project.js').Project}
 */
export function addProject(projectData) {
  const newProject = createProject(projectData)
  const projects = getProjects()
  const updatedProjects = [...projects, newProject]

  writeStoredProjects(updatedProjects)

  return newProject
}

/**
 * @param {string} id
 * @param {Partial<Omit<import('../interfaces/project.js').Project, 'id' | 'createdAt'>>} updates
 * @returns {import('../interfaces/project.js').Project | null}
 */
export function updateProject(id, updates) {
  const projects = getProjects()
  const projectIndex = projects.findIndex((project) => project.id === id)

  if (projectIndex === -1) {
    return null
  }

  const updatedProject = createProject({
    ...projects[projectIndex],
    ...updates,
    id: projects[projectIndex].id,
    createdAt: projects[projectIndex].createdAt,
  })

  const updatedProjects = [...projects]
  updatedProjects[projectIndex] = updatedProject
  writeStoredProjects(updatedProjects)

  return updatedProject
}

/**
 * @param {string} id
 * @returns {boolean}
 */
export function deleteProject(id) {
  const projects = getProjects()
  const updatedProjects = projects.filter((project) => project.id !== id)

  if (updatedProjects.length === projects.length) {
    return false
  }

  writeStoredProjects(updatedProjects)
  return true
}
