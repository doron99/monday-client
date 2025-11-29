import { useState } from 'react'
import { useSelector } from 'react-redux'
import { BoardPreview } from './BoardPreview'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"

export function BoardList() {
  const boards = useSelector(state => state.boardModule.boards)
  const [isOpen, setIsOpen] = useState(true)

  if (!boards || boards.length === 0) {
    return <div className="empty-board-list">No boards found</div>
  }

  // מיון לפי lastVisited ולקיחת 6 הראשונים
  const recentBoards = [...boards]
    .sort((a, b) => (b.lastVisited || 0) - (a.lastVisited || 0))
    .slice(0, 6)

  return (
    <div className="board-list-wrapper">
      <div className="board-list-container">
        <div 
          className="board-list-header" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <MdKeyboardArrowDown className="board-list-icon" />
          ) : (
            <MdKeyboardArrowRight className="board-list-icon" />
          )}
          <h2 className="board-list-title">Recently visited</h2>
        </div>
        
        {isOpen && (
          <div className="board-list">
            {recentBoards.map(boardPreview => (
              <BoardPreview
                key={boardPreview._id}
                boardPreview={boardPreview}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}