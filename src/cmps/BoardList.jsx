import { useDispatch, useSelector } from 'react-redux'

import { useEffect, useState } from 'react';
import { BoardPreview } from './BoardPreview';
import { boardService } from '../services/board.service';

export function BoardList() {
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const [list, setList] = useState([]);
    useEffect(() => {
        boardService.query().then(list => {
            console.log('list',list)
            setList(list);
        })
    },[])
    const toggleStar = (id) => {
    setList(prevList =>
        prevList.map(item =>
            item.id === id ? { ...item, isStarred: !item.isStarred } : item
        )
        );
    };
    return (
        <div className='board-list-container' >
            <div className='board-list'  >
                {list.map(boardPreview => {
                    return (
                    <BoardPreview key={boardPreview._id} boardPreview={boardPreview} toggleStar={toggleStar} />
                )})}
            </div>
        </div>
    )
}
