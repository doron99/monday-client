import { UserMsg } from './UserMsg.jsx'
//import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {setDev} from '../store/actions/dev-tool.actions.js'
import {useState} from 'react'
// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";

export function AppSideBar() {
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)

    return (
       <aside className='app-sidebar' >
        sidebar
       </aside>
    )
}
