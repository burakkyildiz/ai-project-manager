export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  const statusStyles = {
    Başlanmadı:
      'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    'Devam Ediyor':
      'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Tamamlandı:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  }

  const priorityStyles = {
    Düşük:
      'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
    Orta:
      'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400',
    Yüksek:
      'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  }

  return (
    <article className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
            {project.title}
          </h3>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {project.category}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[project.status]
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="mb-5 line-clamp-3 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-400"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Öncelik
        </span>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
            priorityStyles[project.priority]
          }`}
        >
          {project.priority}
        </span>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-violet-600 transition hover:bg-violet-50 dark:hover:bg-violet-500/10"
        >
          Düzenle
        </button>

        <button
          type="button"
          onClick={() => onDelete(project)}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          Sil
        </button>
      </div>
    </article>
  )
}