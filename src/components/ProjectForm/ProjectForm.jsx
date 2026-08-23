import { useState } from 'react'
import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  PROJECT_PRIORITIES,
  createProject,
} from '../../interfaces/project.js'

const emptyForm = {
  title: '',
  description: '',
  category: PROJECT_CATEGORIES[0],
  technologies: '',
  status: PROJECT_STATUSES[0],
  priority: PROJECT_PRIORITIES[1],
}

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => {
    if (project) {
      return {
        title: project.title,
        description: project.description,
        category: project.category,
        technologies: project.technologies.join(', '),
        status: project.status,
        priority: project.priority,
      }
    }

    return emptyForm
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const projectData = createProject({
      ...form,
      technologies: form.technologies
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
    })

    onSubmit(projectData)

    if (!project) {
      setForm(emptyForm)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {project ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Proje bilgilerini aşağıdan girin.
          </p>
        </div>

        {project && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            Vazgeç
          </button>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Proje adı
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Örn. Görüntü Sınıflandırma"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Kategori
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {PROJECT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Açıklama
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="3"
            placeholder="Projenizi kısaca açıklayın..."
            className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Teknolojiler
          </label>

          <input
            name="technologies"
            value={form.technologies}
            onChange={handleChange}
            placeholder="Python, PyTorch, CNN"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Durum
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {PROJECT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Öncelik
          </label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {PROJECT_PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
      >
        {project ? 'Değişiklikleri Kaydet' : 'Proje Ekle'}
      </button>
    </form>
  )
}