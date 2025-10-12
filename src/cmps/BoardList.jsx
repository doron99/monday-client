import { useDispatch, useSelector } from 'react-redux'

import { useState } from 'react';
import { BoardPreview } from './BoardPreview';

export function BoardList() {

    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const [list, setList] = useState([{id:'',name:'Board 0',isStarred:false},
        {id:'1',name:'Board 1',isStarred:false},
        {id:'2',name:'Board 2',isStarred:true},
        {id:'3',name:'Board 3',isStarred:true},
        {id:'4',name:'ssss',isStarred:true},
        {id:'5',name:'dddd',isStarred:false},
        {id:'6',name:'asdas',isStarred:false},
        {id:'7',name:'ssss',isStarred:false},
        {id:'8',name:'dddd',isStarred:false}]);

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
                    <BoardPreview key={boardPreview.id} boardPreview={boardPreview} toggleStar={toggleStar} />
                )})}
            </div>
        </div>
    )
}
