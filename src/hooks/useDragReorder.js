import { useEffect, useRef } from 'react'

const EDGE = 80
const MAX_SCROLL_SPEED = 14

/**
 * Pointer-based drag reordering for the direct children of a list element.
 * Works with mouse and touch; the drag handle needs `touch-action: none`.
 *
 * @param {import('react').RefObject<HTMLElement>} listRef
 * @param {(from: number, to: number) => void} onReorder
 */
export default function useDragReorder(listRef, onReorder) {
  const dragRef = useRef(null)

  useEffect(() => () => dragRef.current?.stop(false), [])

  function startDrag(event, index) {
    const list = listRef.current
    if (!list || event.button !== 0 || dragRef.current) return
    event.preventDefault()

    const rows = Array.from(list.children)
    const rects = rows.map((row) => row.getBoundingClientRect())
    const drag = {
      from: index,
      to: index,
      pointerId: event.pointerId,
      startY: event.clientY,
      pointerY: event.clientY,
      startScroll: window.scrollY,
      frame: 0,
    }

    const layout = () => {
      const offset = drag.pointerY - drag.startY + (window.scrollY - drag.startScroll)
      const height = rects[index].height
      const center = rects[index].top + height / 2 + offset
      let to = index
      rows.forEach((row, i) => {
        if (i === index) return
        const middle = rects[i].top + rects[i].height / 2
        let shift = 0
        if (i > index && center > middle) { shift = -height; to = Math.max(to, i) }
        if (i < index && center < middle) { shift = height; to = Math.min(to, i) }
        row.style.transform = shift ? `translateY(${shift}px)` : ''
      })
      rows[index].style.transform = `translateY(${offset}px)`
      drag.to = to
    }

    const autoScroll = () => {
      let speed = 0
      if (drag.pointerY < EDGE) speed = -MAX_SCROLL_SPEED * (1 - drag.pointerY / EDGE)
      else if (drag.pointerY > window.innerHeight - EDGE) speed = MAX_SCROLL_SPEED * (1 - (window.innerHeight - drag.pointerY) / EDGE)
      if (speed) { window.scrollBy(0, speed); layout() }
      drag.frame = requestAnimationFrame(autoScroll)
    }

    const onMove = (moveEvent) => {
      if (moveEvent.pointerId !== drag.pointerId) return
      drag.pointerY = moveEvent.clientY
      layout()
    }
    const onUp = (upEvent) => { if (upEvent.pointerId === drag.pointerId) drag.stop(upEvent.type === 'pointerup') }

    drag.stop = (commit) => {
      cancelAnimationFrame(drag.frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      rows.forEach((row) => { row.style.transform = ''; row.classList.remove('is-dragging') })
      list.classList.remove('is-sorting')
      document.body.classList.remove('is-sorting')
      dragRef.current = null
      if (commit && drag.to !== drag.from) onReorder(drag.from, drag.to)
    }

    dragRef.current = drag
    rows[index].classList.add('is-dragging')
    list.classList.add('is-sorting')
    document.body.classList.add('is-sorting')
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    drag.frame = requestAnimationFrame(autoScroll)
  }

  return startDrag
}
