import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'

function DeleteConfirmation({ project, onConfirm, onCancel }) {
  const [error, setError] = useState('')
  return (
    <Modal labelledBy="delete-title" onCancel={onCancel}>
      <div className="delete-confirmation">
        <h2 id="delete-title">Projeyi sil?</h2>
        <p><strong>{project.title}</strong> projesi silinecek. Bu işlem geri alınamaz.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="modal-footer"><button className="button button-secondary" onClick={onCancel}>Vazgeç</button>
          <button className="button button-danger" onClick={() => {
            try { onConfirm(project.id) } catch { setError('Proje silinemedi. Lütfen tekrar dene.') }
          }}>Projeyi sil</button></div>
      </div>
    </Modal>
  )
}
export default function DeleteModal(props) {
  return props.project ? <DeleteConfirmation key={props.project.id} {...props} /> : null
}
