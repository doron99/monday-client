import { useNavigate } from "react-router"


export function WelcomePage() {
    const navigate = useNavigate()
 
    return (
        <main className="welcome-page-container">
            <h1>Welcome Page</h1>
            <button type="button" onClick={() => navigate('/board')}>Login</button>
        </main>
    )
}