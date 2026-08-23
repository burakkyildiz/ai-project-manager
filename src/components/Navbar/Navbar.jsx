export default function Navbar({
  currentPage,
  onNavigate,
  darkMode,
  onToggleTheme,
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          className="text-lg font-bold text-zinc-900 dark:text-white"
        >
          AI<span className="text-violet-600">.</span>Manager
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              currentPage === 'dashboard'
                ? 'bg-violet-600 text-white'
                : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white'
            }`}
          >
            Dashboard
          </button>

          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              currentPage === 'projects'
                ? 'bg-violet-600 text-white'
                : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white'
            }`}
          >
            Projeler
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="ml-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-lg transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            aria-label="Tema değiştir"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
    </header>
  )
}