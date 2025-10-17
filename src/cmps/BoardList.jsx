import { useSelector } from 'react-redux'
import { BoardPreview } from './BoardPreview'

export function BoardList() {
  const boards = useSelector(state => state.boardModule.boards)

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
