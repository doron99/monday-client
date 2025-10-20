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
import { BellIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon, UserCircleIcon, UserPlusIcon } from '@heroicons/react/24/outline'

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
                <div className="monday-brand">
                    <span className="monday-logo">
                        <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#6161ff"/>
                            <circle cx="16" cy="4" r="4" fill="#6161ff"/>  
                            <circle cx="10" cy="16" r="4" fill="#6161ff"/>
                        </svg>
                    </span>
                    <span className="brand-text">monday</span>
                    <span className="work-management">work management</span>
                </div>
                <nav className="app-nav">
                    <MagnifyingGlassIcon className='navbarIcon' style={styles.navbarIconStyle}/>
                    <BellIcon className='navbarIcon' style={styles.navbarIconStyle}/>
                    <UserPlusIcon className='navbarIcon' style={styles.navbarIconStyle}/>
                    <QuestionMarkCircleIcon className='navbarIcon' style={styles.navbarIconStyle}/>
                    {/* <CiSearch className='navbarIcon' onClick={() => console.log('test')} style={styles.navbarIconStyle}/> */}
                    {/* <IoIosNotifications className='navbarIcon' onClick={() => openUpdateModal()} style={styles.navbarIconStyle}/> */}
                {ismodalOpen && (
        <div className="priority-modal">
            asdasdasda <button type='button' onClick={() => setIsModalOpen(false)}>close</button>
        </div>
      )}
                </nav>
                {/* {user ? (
                // < section >
                //     <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                //     <button onClick={onLogout}>Logout</button>
                // </ section >
            ) : (
                // <section>
                //     loginsignup
                // </section>
            )} */}
            </section>
            
            <UserMsg />
        </header>
    )
}
const styles = {
    navbarIconStyle: {width: '100%', height: '1.4rem',marginLeft:'1rem'}
}