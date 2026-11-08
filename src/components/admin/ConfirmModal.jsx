import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, LoaderCircle, X } from 'lucide-react'

export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  loading = false,
  loadingLabel = 'Working...',
  error = '',
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)
  const cancelRef = useRef(null)
  const loadingRef = useRef(loading)
  const cancelHandler = useRef(onCancel)
  const titleId = useId()
  const messageId = useId()
  loadingRef.current = loading
  cancelHandler.current = onCancel

  useEffect(() => {
    if (!open) return
    const previousFocus = document.activeElement
    const originalOverflow = document.body.style.overflow
    const originalPadding = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    if (scrollbarWidth > 0) {
      const currentPadding = parseFloat(window.getComputedStyle(document.body).paddingRight) || 0
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
    }
    document.body.style.overflow = 'hidden'
    cancelRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (!loadingRef.current) cancelHandler.current?.()
      }
      if (event.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const buttons = Array.from(dialog.querySelectorAll('button:not([disabled])'))
      if (!buttons.length) {
        event.preventDefault()
        dialog.focus()
        return
      }
      const first = buttons[0]
      const last = buttons[buttons.length - 1]
      if (!dialog.contains(document.activeElement) || (!event.shiftKey && document.activeElement === last)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPadding
      document.removeEventListener('keydown', onKeyDown)
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [open])

  useEffect(() => {
    if (loading) dialogRef.current?.focus()
  }, [loading])

  if (!open || typeof document === 'undefined') {
    return null
  }

  const confirmStyles =
    tone === 'danger'
      ? 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500'
      : 'bg-pmdcSky hover:bg-pmdcBlue focus:ring-pmdcSky'

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <button
        type="button"
        aria-label="Close confirmation dialog"
        tabIndex={-1}
        disabled={loading}
        className="absolute inset-0 cursor-default bg-black/50"
        onClick={onCancel}
      />

      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={messageId} aria-busy={loading} tabIndex={-1} className="admin-dialog-enter relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl outline-none">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 id={titleId} className="text-lg font-bold text-pmdcInk">{title}</h3>
                <p id={messageId} className="mt-2 text-sm leading-6 text-pmdcInk/70">{message}</p>
              </div>
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="rounded-full p-1 text-pmdcInk/50 hover:bg-slate-100 hover:text-pmdcInk disabled:cursor-wait disabled:opacity-40"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {error ? <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700" role="alert">{error}</p> : null}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            ref={cancelRef}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-pmdcInk hover:bg-slate-50 disabled:cursor-wait disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex min-w-[112px] items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-70 ${confirmStyles}`}
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : null}
            <span>{loading ? loadingLabel : confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
