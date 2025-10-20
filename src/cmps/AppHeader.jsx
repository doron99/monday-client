import { UserMsg } from './UserMsg.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {setDev} from '../store/actions/dev-tool.actions.js'
import {useState} from 'react'
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const [ismodalOpen, setIsModalOpen] = useState(false);
    function openUpdateModal() {
        setIsModalOpen(true);
    }
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }


    function setDevTool(val) {
        setDev(val);
    }
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the state
        setDev(!isChecked);
    };
    return (
        <header className="app-header full main-layout">
           
            <label style={{
                display: 'block',
                position: 'absolute',
                top: '0',
                left: '0'
            }}>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    title="is dev"
                />
            </label>
            {/* <button type='button' onClick={() => setDevTool(false)}>set false</button> */}
             

            <section className="header-container" >
                <h5>Monday</h5>
                <nav className="app-nav">
                    <CiSearch onClick={() => console.log('test')} style={{width: '100%', height: '2rem'}}/>
                    <IoIosNotifications onClick={() => openUpdateModal()} style={{width: '100%', height: '2rem'}}/>
                {ismodalOpen && (
        <div className="priority-modal">
            asdasdasda <button type='button' onClick={() => setIsModalOpen(false)}>close</button>
        </div>
      )}
                </nav>
                {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    login signup
                </section>
            )}
            </section>
            
            <UserMsg />
        </header>
    )
}
