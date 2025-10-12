import { Outlet } from 'react-router-dom'
import { AppSideBar } from '../cmps/AppSideBar.jsx'

export function MainPageLayout() {
    return (
        <div className="main-page-layout">
            <AppSideBar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}