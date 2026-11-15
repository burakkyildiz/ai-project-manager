import { PROJECT_CATEGORIES, PROJECT_PRIORITIES, PROJECT_PRIORITY_LABELS } from '../../interfaces/project.js'

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-fields">
      <label htmlFor="filter-category">Category
        <select id="filter-category" value={filters.category} onChange={(e) => onChange({ ...filters, category: e.target.value })}>
          <option value="">All categories</option>
          {PROJECT_CATEGORIES.map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>
      <label htmlFor="filter-priority">Priority
        <select id="filter-priority" value={filters.priority} onChange={(e) => onChange({ ...filters, priority: e.target.value })}>
          <option value="">All priorities</option>
          {PROJECT_PRIORITIES.map((item) => <option key={item} value={item}>{PROJECT_PRIORITY_LABELS[item]}</option>)}
        </select>
      </label>
    </div>
  )
}
