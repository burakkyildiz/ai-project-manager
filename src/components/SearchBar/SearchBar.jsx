export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-field">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
      <input type="search" value={value} onChange={(event) => onChange(event.target.value)} aria-label="Search projects" placeholder="Search projects…" />
    </div>
  )
}
