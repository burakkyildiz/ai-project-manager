import { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Projects from './pages/Projects/Projects.jsx'
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
} from './services/localStorage.js'

function App() {
  const [projects, setProjects] = useState(() => getProjects())
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
          onAddProject={handleAddProject}
          onUpdateProject={handleUpdateProject}
          onDeleteProject={handleDeleteProject}
        />
      </main>
    </>
  )
}

export default App
