import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'

const AdminFeedbackContext = createContext(null)

export function useAdminFeedback() {
  const context = useContext(AdminFeedbackContext)
  if (!context) throw new Error('Admin feedback must be used inside its provider')
  return context
}

export function AdminFeedbackProvider({ children }) {
  const [notices, setNotices] = useState([])
  const timers = useRef(new Map())
  const nextId = useRef(0)

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current.get(id))
    timers.current.delete(id)
    setNotices((current) => current.filter((notice) => notice.id !== id))
  }, [])

  const notify = useCallback((message, tone = 'success') => {
    const id = ++nextId.current
    setNotices((current) => [...current.slice(-2), { id, message, tone }])
    timers.current.set(id, setTimeout(() => dismiss(id), tone === 'error' ? 8000 : 5000))
  }, [dismiss])

  useEffect(() => {
    const activeTimers = timers.current
    return () => { activeTimers.forEach(clearTimeout); activeTimers.clear() }
  }, [])

  const value = useMemo(() => ({ notify }), [notify])

  return (
    <AdminFeedbackContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100%_-_2rem)] max-w-sm flex-col gap-3" aria-label="Notifications">
        {notices.map((notice) => {
          const isError = notice.tone === 'error'
          const Icon = isError ? AlertCircle : CheckCircle2
          return (
            <div key={notice.id} role={isError ? 'alert' : 'status'} aria-atomic="true" className={`admin-notice-enter pointer-events-auto flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xl ${isError ? 'border-rose-200' : 'border-emerald-200'}`}>
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${isError ? 'text-rose-600' : 'text-emerald-600'}`} aria-hidden="true" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-pmdcInk">{isError ? 'Something went wrong' : 'Success'}</p>
                <p className="mt-1 break-words text-sm leading-6 text-pmdcInk/75">{notice.message}</p>
              </div>
              <button type="button" onClick={() => dismiss(notice.id)} className="shrink-0 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-pmdcInk focus:outline-none focus:ring-2 focus:ring-pmdcSky" aria-label="Dismiss notification">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )
        })}
      </div>
    </AdminFeedbackContext.Provider>
  )
}
