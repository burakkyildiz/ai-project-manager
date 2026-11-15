import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'

function DeleteConfirmation({ project, onConfirm, onCancel }) {
  const [error, setError] = useState('')
  return (
    <Modal labelledBy="delete-title" onCancel={onCancel}>
      <div className="delete-confirmation">
        <h2 id="delete-title">Delete project?</h2>
        <p><strong>{project.title}</strong> will be deleted. This can’t be undone.</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="modal-footer"><button className="button button-secondary" type="button" onClick={onCancel}>Cancel</button>
          <button className="button button-danger" type="button" onClick={() => {
            try { onConfirm(project.id) } catch { setError('Could not delete the project. Please try again.') }
          }}>Delete project</button></div>
      </div>
    </Modal>
  )
}
export default function DeleteModal(props) {
  return props.project ? <DeleteConfirmation key={props.project.id} {...props} /> : null
}
