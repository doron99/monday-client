
import { UserMsg } from './UserMsg.jsx'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    const dispatch = useDispatch()


    return (
        <footer className='app-footer'>
          
            <p>
                Coffeerights to all 
            </p>
          
            <UserMsg />
        </footer>
    )
}
