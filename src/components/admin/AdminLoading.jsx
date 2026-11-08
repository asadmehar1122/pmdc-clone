import { LoaderCircle } from 'lucide-react'

export default function AdminLoading({ label = 'Loading...', description, fullScreen = false }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen bg-slate-50 px-4' : 'min-h-[180px] px-6 py-10'}`} role="status" aria-live="polite">
      <div className="text-center">
        <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-pmdcSky motion-reduce:animate-none" aria-hidden="true" />
        <p className="mt-4 text-sm font-semibold text-pmdcInk">{label}</p>
        {description ? <p className="mt-2 text-sm text-pmdcInk/60">{description}</p> : null}
      </div>
    </div>
  )
}
