import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useEffect, useRef, useState } from "react"
import imgUrl from "../assets/img/logo.png"
import { AppSideBar } from "../cmps/AppSideBar.jsx"
import { BoardDetails } from "./BoardDetails.jsx"
import { useNavigate } from "react-router"
import { createPopper } from "@popperjs/core";



const statuses = [
  { label: "Done", color: "#00C875" },
  { label: "Stuck", color: "#E2445C" },
  { label: "Working on it", color: "#C4C4C4" },
  { label: "fhgfhgf", color: "#FFCB00" },
];
export function WelcomePage() {
    const dispatch = useDispatch()
    const [_count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.userModule.count)
    const navigate = useNavigate()

 const [selected, setSelected] = useState(statuses[0]);


// dnd-kit sensors for handling different input types
 

    return (
        <main className="welcome-page-container">
            <h1>Welcome Page</h1>
            <button type="button" onClick={() => navigate('/board')}>Login</button>
           
        </main>
    )
}