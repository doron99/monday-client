import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useState } from "react"
import imgUrl from "../assets/img/logo.png"
import { AppSideBar } from "../cmps/AppSideBar.jsx"
import { BoardDetails } from "./BoardDetails.jsx"
import { useNavigate } from "react-router"


export function WelcomePage() {
    const dispatch = useDispatch()
    const [_count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.userModule.count)
    const navigate = useNavigate()

 

    return (
        <main className="welcome-page-container">
            <h1>Welcome Page</h1>
            <button type="button" onClick={() => navigate('/board')}>Login</button>
        </main>
    )
}