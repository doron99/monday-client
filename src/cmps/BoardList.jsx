// import { useDispatch, useSelector } from 'react-redux'

// import { useEffect, useState } from 'react';
// import { BoardPreview } from './BoardPreview';
// import { boardService } from '../services/board.service';

// export function BoardList() {
//     const isDev = useSelector(storeState => storeState.devToolModule.isDev)
//     const [list, setList] = useState([]);
//     useEffect(() => {
//         boardService.query().then(list => {
//             console.log('list',list)
//             setList(list);
//         })
//     },[])
//     const toggleStar = (id) => {
//     setList(prevList =>
//         prevList.map(item =>
//             item.id === id ? { ...item, isStarred: !item.isStarred } : item
//         )
//         );
//     };
//     return (
//         <div className='board-list-container' >
//             <div className='board-list'  >
//                 {list.map(boardPreview => {
//                     return (
//                     <BoardPreview key={boardPreview._id} boardPreview={boardPreview} toggleStar={toggleStar} />
//                 )})}
//             </div>
//         </div>
//     )
// }


import { useSelector } from 'react-redux'
import { BoardPreview } from './BoardPreview'

export function BoardList() {
  const boards = useSelector(state => state.boardModule.boards)
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  if (!boards || boards.length === 0) {
    return <div className="empty-board-list">No boards found</div>
  }

  return (
    <div className="board-list-container">
      <div className="board-list">
        {boards.map(boardPreview => (
          <BoardPreview
            key={boardPreview._id}
            boardPreview={boardPreview}
          />
        ))}
      </div>
    </div>
  )
}
