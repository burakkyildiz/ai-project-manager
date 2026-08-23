export default function DeleteModal({
  project,
  onConfirm,
  onCancel,
}) {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl dark:bg-red-500/10">
          🗑️
        </div>

        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          Projeyi Sil
        </h2>

        <p className="mt-2 leading-6 text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-white">
            "{project.title}"
          </span>{' '}
          projesini silmek istediğinize emin misiniz?
        </p>

        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
          Bu işlem geri alınamaz.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            İptal
          </button>

          <button
            type="button"
            onClick={() => onConfirm(project.id)}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}