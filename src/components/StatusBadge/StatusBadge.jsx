const statusClass = { 'Başlanmadı': 'waiting', 'Devam Ediyor': 'ongoing', 'Tamamlandı': 'complete' }

export default function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass[status] ?? ''}`}>{status}</span>
}
