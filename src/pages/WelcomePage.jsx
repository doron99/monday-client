import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useState } from "react"
import imgUrl from "../assets/img/logo.png"
import { AppSideBar } from "../cmps/AppSidebar.jsx"
import { BoardDetails } from "../cmps/BoardDetails.jsx"
import { useNavigate } from "react-router"
// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux


export function WelcomePage() {
    const dispatch = useDispatch()
    const [_count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.userModule.count)
    const navigate = useNavigate()

 

    return (
        <main >
            <button type="button" onClick={() => navigate('/board')}>go</button>
           {/* <AppSideBar />
           <BoardDetails /> */}
        </main>
    )
}