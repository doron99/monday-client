import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useState } from "react"
import imgUrl from "../assets/img/logo.png"
import { AppSideBar } from "../cmps/AppSidebar.jsx"
import { BoardDetails } from "../cmps/BoardDetails.jsx"
// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux


export function HomePage() {
    const dispatch = useDispatch()
    const [_count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.userModule.count)

 

    return (
        <main style={{display:'flex'}}>
           <AppSideBar />
           <BoardDetails />
        </main>
    )
}