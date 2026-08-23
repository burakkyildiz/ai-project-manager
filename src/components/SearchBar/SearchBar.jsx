export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
        🔍
      </span>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Projelerde ara..."
        className="w-full rounded-xl border border-zinc-300 bg-white px-11 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
      />
    </div>
  )
}