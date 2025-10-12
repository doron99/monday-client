import { useDispatch, useSelector } from 'react-redux'
import { BoardList } from '../cmps/BoardList.jsx'


export function BoardIndex() {
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    
    return (
        <BoardList />
    )
}
