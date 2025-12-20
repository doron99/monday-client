import { useState } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { devAutoLogin } from "../store/actions/user.actions.js"


export function WelcomePage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleLogin = async () => {
        try {
            setIsLoading(true)
            setError(null)
            await devAutoLogin()
            // Navigate only after the action completes successfully
            navigate('/board')
        } catch (err) {
            console.error('Login failed:', err)
            setError('Login failed. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }
 
    return (
        <main className="welcome-page-container">
            <h1>Welcome Page</h1>
            <button 
                type="button" 
                onClick={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </main>
    )
}