import { useSelector } from 'react-redux'
import { BoardList } from '../cmps/BoardList.jsx'
import { BoardIndexHeader } from '../cmps/BoardIndexHeader.jsx'

export function BoardIndex() {
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)

    return (
        <div className="board-index">
            <BoardIndexHeader/>
            <BoardList />
        </div>
    )
}