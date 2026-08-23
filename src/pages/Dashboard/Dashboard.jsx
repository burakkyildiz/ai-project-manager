import StatCard from '../../components/StatCard/StatCard.jsx'

export default function Dashboard({ projects }) {
  const totalProjects = projects.length

  const notStarted = projects.filter(
    (project) => project.status === 'Başlanmadı'
  ).length

  const inProgress = projects.filter(
    (project) => project.status === 'Devam Ediyor'
  ).length

  const completed = projects.filter(
    (project) => project.status === 'Tamamlandı'
  ).length

  const statusStyles = {
    Başlanmadı:
      'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
    'Devam Ediyor':
      'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
    Tamamlandı:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10">
        <p className="mb-2 text-sm font-medium text-violet-600 dark:text-violet-400">
          AI Project Manager
        </p>

        <h1 className="page-title text-4xl font-bold tracking-tight">
          Proje Dashboard
        </h1>

        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          Yapay zeka projelerini tek bir yerden takip et.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Toplam Proje"
          value={totalProjects}
          icon="📁"
        />

        <StatCard
          title="Başlanmadı"
          value={notStarted}
          icon="⏳"
        />

        <StatCard
          title="Devam Ediyor"
          value={inProgress}
          icon="🚀"
        />

        <StatCard
          title="Tamamlandı"
          value={completed}
          icon="✅"
        />
      </div>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          Son Projeler
        </h2>

        <div className="mt-5 space-y-3">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800/60"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">
                  {project.title}
                </p>

                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {project.category}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[project.status]
                }`}
              >
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}