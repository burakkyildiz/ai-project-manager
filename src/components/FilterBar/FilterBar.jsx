import { PROJECT_CATEGORIES, PROJECT_PRIORITIES } from '../../interfaces/project.js'

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-fields">
      <label htmlFor="filter-category">Kategori
        <select id="filter-category" value={filters.category} onChange={(e) => onChange({ ...filters, category: e.target.value })}>
          <option value="">Tüm kategoriler</option>
          {PROJECT_CATEGORIES.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label htmlFor="filter-priority">Öncelik
        <select id="filter-priority" value={filters.priority} onChange={(e) => onChange({ ...filters, priority: e.target.value })}>
          <option value="">Tüm öncelikler</option>
          {PROJECT_PRIORITIES.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
    </div>
  )
}
