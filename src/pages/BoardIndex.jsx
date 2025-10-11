import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';

import { BoardList } from '../cmps/BoardList.jsx'
import { BoardDetails } from '../cmps/BoardDetails.jsx'
import { AppSideBar } from '../cmps/AppSideBar.jsx'


export function BoardIndex() {
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const {boardId} = useParams()
    console.log('boardId', boardId)
    const section = !boardId ? <BoardList/> : <BoardDetails />
    return (
        <main >
            <AppSideBar />
            {section}
        </main>

           
          
    )
}
