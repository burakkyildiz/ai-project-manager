import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  PROJECT_PRIORITIES,
} from '../../interfaces/project.js'

export default function FilterBar({ filters, onChange }) {
  const handleChange = (event) => {
    const { name, value } = event.target

    onChange({
      ...filters,
      [name]: value,
    })
  }

  const selectClass =
    'w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className={selectClass}
      >
        <option value="">Tüm kategoriler</option>

        {PROJECT_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className={selectClass}
      >
        <option value="">Tüm durumlar</option>

        {PROJECT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className={selectClass}
      >
        <option value="">Tüm öncelikler</option>

        {PROJECT_PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
    </div>
  )
}