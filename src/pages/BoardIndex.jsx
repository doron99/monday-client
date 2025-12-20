import { useSelector } from 'react-redux'
import { BoardList } from '../cmps/BoardList.jsx'
import { BoardIndexHeader } from '../cmps/BoardIndexHeader.jsx'

export function BoardIndex() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const userName = loggedInUser?.fullname || 'User'

    return (
        <div className="board-index">
            <BoardIndexHeader userName={userName} />
            <BoardList />
        </div>
    )
}