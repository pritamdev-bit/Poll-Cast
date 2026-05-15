// import { useUser, useClerk } from '@clerk/clerk-react'
import { useClerk, useUser } from '@clerk/react'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../components/Loaderpage'
import NavbarDashboard from '../components/NavbarDashboard'

export default function Dashboard() {
    const { user, isLoaded, isSignedIn } = useUser()
    const { signOut } = useClerk()
    const navigate = useNavigate()

    if (!isLoaded) {
        return <LoadingPage />
    }

    if (!isSignedIn) {
        navigate('/sign-in')
        return null
    }

    const handleSignOut = () => {
        signOut(() => navigate('/sign-in'))
    }

    return (
        <Suspense fallback={<LoadingPage />}>
            <NavbarDashboard />
            <div>
                <h1>Welcome, {user?.firstName}!</h1>
                <p>Email: {user?.primaryEmailAddress?.emailAddress}</p>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>
        </Suspense>
    )
}