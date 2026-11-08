import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { adminLogin } from '@/lib/adminApi'
import { useAdminSession } from '@/components/admin/AdminLayout'
import { useAdminFeedback } from '@/components/admin/AdminFeedback'

export default function AdminLoginPage() {
  const router = useRouter()
  const { authToken, isLoading, signIn } = useAdminSession()
  const { notify } = useAdminFeedback()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if already logged in
  useEffect(() => {
    if (!isLoading && authToken && !loading) {
      router.replace('/admin').catch(() => setError('Unable to open the dashboard. Please try again.'))
    }
  }, [authToken, isLoading, loading, router])

  useEffect(() => {
    router.prefetch('/admin')
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading || isLoading) return
    setError('')
    setLoading(true)

    try {
      const response = await adminLogin(email, password)
      
      signIn(response.token, response.user)
      notify('Signed in successfully. Welcome back!')
      await router.replace('/admin')
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Admin Login - PMDC Portal</title>
        <meta name="description" content="Admin portal login" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-pmdcSky to-blue-600 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-block rounded-full border border-white/10 bg-black/30 p-3 mb-4 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white">🔐</div>
            </div>
            <h1 className="text-3xl font-bold text-white">PMDC Admin</h1>
            <p className="text-blue-100 mt-2">Control Panel Login</p>
          </div>

          {/* Login Card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/80 shadow-2xl backdrop-blur-md">
            <div className="px-6 py-8 sm:px-8">
              <h2 className="mb-6 text-2xl font-bold text-white">Sign In</h2>

              {error && (
                <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                  <p className="text-sm font-medium text-red-200">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" aria-busy={loading || isLoading}>
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white/90">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@pmdc.local"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-pmdcSky focus:ring-2 focus:ring-pmdcSky/30"
                    disabled={loading || isLoading}
                    autoComplete="username"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-white/90">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 outline-none transition focus:border-pmdcSky focus:ring-2 focus:ring-pmdcSky/30"
                    disabled={loading || isLoading}
                    autoComplete="current-password"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || isLoading || Boolean(authToken)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pmdcSky to-blue-600 py-3 font-semibold text-white transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading || isLoading || authToken ? (
                    <>
                      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                      {isLoading ? 'Checking session...' : authToken ? 'Opening dashboard...' : 'Signing in...'}
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </form>

            </div>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-blue-100">
            PMDC Portal &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </>
  )
}
