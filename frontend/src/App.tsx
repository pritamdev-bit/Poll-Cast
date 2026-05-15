import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Homepage from './pages/Homepage'
import { ClerkProvider } from '@clerk/react'
import SignInPage from './pages/sign-in';
import SignUpPage from './pages/sign-up';
import SSOCallback from './pages/SSOCallback';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import PollsPage from './pages/Pollspage';
import CreatePollPage from './pages/CreatePollPage';
import VotePollPage from './pages/VotePollPage';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ClerkProvider
        routerPush={(to) => navigate(to)}
        routerReplace={(to) => navigate(to, { replace: true })}
        signInUrl="/sign-in"
        signUpUrl="/sign-up"
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/sso-callback" element={<SSOCallback />} />

          {/* Catch all unknown routes */}
        <Route path="*" element={<NotFound />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/polls" element={<PollsPage />} />
          <Route path="/create-poll" element={<CreatePollPage />} />
          <Route path="/poll/:id" element={<VotePollPage />} />
        </Routes>
      </ClerkProvider>
    </>
  )
}

export default App
