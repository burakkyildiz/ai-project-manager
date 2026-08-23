export default function StatCard({ title, value, icon }) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </p>

        <span className="text-2xl">{icon}</span>
      </div>

      <p className="mt-3 text-3xl font-bold text-zinc-900 dark:text-white">
        {value}
      </p>
    </article>
  )
}