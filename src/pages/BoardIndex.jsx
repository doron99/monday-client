import { useDispatch, useSelector } from 'react-redux'
import { BoardList } from '../cmps/BoardList.jsx'
import { BoardDetails } from '../cmps/BoardDetails.jsx'
import { AppSideBar } from '../cmps/AppSideBar.jsx'
import { useState } from 'react';


export function BoardIndex() {
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const {boardId} = useParams()
    console.log('boardId', boardId)
    const section = !boardId ? <BoardList/> : <BoardDetails />
    return (
        <BoardList />
    )
}
