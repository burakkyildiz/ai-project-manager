import { useMemo, useState } from 'react'
import DeleteModal from '../../components/DeleteModal/DeleteModal.jsx'
import FilterBar from '../../components/FilterBar/FilterBar.jsx'
import ProjectCard from '../../components/ProjectCard/ProjectCard.jsx'
import ProjectForm from '../../components/ProjectForm/ProjectForm.jsx'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'

export default function Projects({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    priority: '',
  })

  const [editingProject, setEditingProject] = useState(null)
  const [deletingProject, setDeletingProject] = useState(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const searchMatch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase())

      const categoryMatch =
        !filters.category || project.category === filters.category

      const statusMatch =
        !filters.status || project.status === filters.status

      const priorityMatch =
        !filters.priority || project.priority === filters.priority

      return (
        searchMatch &&
        categoryMatch &&
        statusMatch &&
        priorityMatch
      )
    })
  }, [projects, search, filters])

  const handleSubmit = (projectData) => {
    if (editingProject) {
      onUpdateProject(editingProject.id, projectData)
      setEditingProject(null)
    } else {
      onAddProject(projectData)
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
          AI Project Manager
        </p>

        <h1 className="page-title mt-2 text-4xl font-bold">
          Projeler
        </h1>

        <p className="page-subtitle mt-2">
          Yapay zeka projelerini oluştur, takip et ve yönet.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid gap-4 md:grid-cols-2">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <FilterBar
            filters={filters}
            onChange={setFilters}
          />
        </div>
      </div>

      <ProjectForm
        key={editingProject?.id ?? 'new'}
        project={editingProject}
        onSubmit={handleSubmit}
        onCancel={() => setEditingProject(null)}
      />

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="section-title text-xl font-semibold">
            Proje Listesi
          </h2>

          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {filteredProjects.length} proje
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={setEditingProject}
              onDelete={setDeletingProject}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
            <p className="font-medium text-zinc-700 dark:text-zinc-300">
              Proje bulunamadı.
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              Arama veya filtreleri değiştirmeyi deneyin.
            </p>
          </div>
        )}
      </div>

      <DeleteModal
        project={deletingProject}
        onConfirm={() => {
          onDeleteProject(deletingProject.id)
          setDeletingProject(null)
        }}
        onCancel={() => setDeletingProject(null)}
      />
    </section>
  )
}