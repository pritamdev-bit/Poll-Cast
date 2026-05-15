import { useSignIn } from '@clerk/react/legacy'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!isLoaded) return
    setLoading(true)
    setError('')

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuth = async (provider: string) => {
    if (!isLoaded) return
    await signIn.authenticateWithRedirect({
      strategy: `oauth_${provider}` as 'oauth_google' | 'oauth_github',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/dashboard',
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center w-full bg-lime-300">

      {/* Left Side */}
      <div className="md:w-1/2 w-full min-h-screen p-4 md:p-8 flex flex-col justify-center bg-white">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-black mb-2">
            Welcome back!
          </h1>

          <p className="text-[#1a1a1a]/60 mb-8">
            Login to your PollCast account and continue creating engaging polls.
          </p>

          {error && (
            <p className="mb-4 border-2 border-red-500 bg-red-500/10 text-red-400 px-4 py-3 rounded-xl font-medium">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-2 py-2 rounded-md border outline-none focus:border-[#74c700] transition"
            />

            <input
              type="password"
              placeholder="Password (min 8 chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-2 py-2 rounded-md border outline-none focus:border-[#74c700] transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#C6EF8C] w-full text-black font-bold py-3 border rounded-full hover:shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Signing in...' : 'SIGN IN'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-[#1a1a1a]/30 flex-1"></div>
            <span className="text-zinc-500 text-sm">OR</span>
            <div className="h-px bg-[#1a1a1a]/30 flex-1"></div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleOAuth('google')}
              className="bg-white w-full flex items-center justify-center gap-2 text-black font-semibold py-2 rounded-md border hover:shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition cursor-pointer"
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
              </span>
              <span>
                Continue with Google
              </span>
            </button>

            <button
              onClick={() => handleOAuth('github')}
              className="bg-white w-full flex items-center justify-center gap-2 text-black font-semibold py-2 rounded-md border hover:shadow-[4px_4px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition cursor-pointer"
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
                  <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
              </span>
              <span>
                Continue with GitHub
              </span>
            </button>
          </div>

          <p className="mt-8 text-sm">
            No account?{" "}
            <Link
              to="/sign-up"
              className="text-lime-500 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden w-1/2 lg:flex min-h-screen bg-lime-300 text-black items-center justify-center relative overflow-hidden">
        <div className="absolute w-72 h-72 bg-black/10 rounded-full top-[-60px] right-[-60px]"></div>
        <div className="absolute w-52 h-52 bg-black/10 rounded-full bottom-[-40px] left-[-40px]"></div>

        <div className="relative z-10 max-w-md">
          <p className="uppercase tracking-[0.3em] font-bold mb-4 text-sm">
            Real-Time Polling
          </p>

          <h2 className="text-5xl font-black leading-tight mb-6">
            Vote.
            <br />
            Discuss.
            <br />
            Decide.
          </h2>

          <p className="text-lg font-medium text-black/70">
            Create live polls, share opinions instantly, and see results update
            in real time.
          </p>
        </div>
      </div>
    </main>
  )
}