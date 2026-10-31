import { useEffect, useRef } from 'react'

export default function Modal({ children, labelledBy, onCancel }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [])
  return (
    <dialog ref={ref} className="modal" aria-labelledby={labelledBy}
      onCancel={(event) => { event.preventDefault(); onCancel() }}>
      {children}
    </dialog>
  )
}
