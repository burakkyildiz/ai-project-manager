import { PROJECT_STATUS_LABELS } from '../../interfaces/project.js'

const statusClass = { 'Başlanmadı': 'waiting', 'Devam Ediyor': 'ongoing', 'Tamamlandı': 'complete' }

export default function StatusBadge({ status }) {
  return <span className={`status-badge ${statusClass[status] ?? ''}`} role="img" aria-label={`Status: ${PROJECT_STATUS_LABELS[status] ?? status}`} />
}
