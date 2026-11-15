import { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Projects from './pages/Projects/Projects.jsx'
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  getProjectOrder,
  saveProjectOrder,
} from './services/localStorage.js'

function App() {
  const [projects, setProjects] = useState(() => getProjects())
  const [projectOrder, setProjectOrder] = useState(() => getProjectOrder())

  const handleReorderProjects = (ids) => {
    setProjectOrder(ids)
    try { saveProjectOrder(ids) } catch { /* order still applies for this session */ }
  }
  const handleAddProject = (projectData) => {
    const newProject = addProject(projectData)

    setProjects((currentProjects) => [
      ...currentProjects,
      newProject,
    ])
  }

  const handleUpdateProject = (id, updates) => {
    const updatedProject = updateProject(id, updates)

    if (!updatedProject) return

    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === id ? updatedProject : project
      )
    )
  }

  const handleDeleteProject = (id) => {
    const deleted = deleteProject(id)

    if (!deleted) return

    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== id)
    )
  }

  return (
    <>
      <Navbar />

      <main>
        <Projects
          projects={projects}
          projectOrder={projectOrder}
          onReorderProjects={handleReorderProjects}
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
          onDeleteProject={handleDeleteProject}
        />
      </main>
    </>
  )
}

export default App
