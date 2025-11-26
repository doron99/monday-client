import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function MoveGroupToBoardModal({ group, currentBoardId, onClose, onMove }) {
  const boards = useSelector(state => state.boardModule.boards);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const availableBoards = boards.filter(board => board._id !== currentBoardId);

  const handleBoardSelect = (boardId) => {
    setSelectedBoardId(boardId);
  };

  const handleMove = () => {
    if (selectedBoardId && onMove) {
      onMove(selectedBoardId);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="move-modal" onClick={(e) => e.stopPropagation()}>
        <div className="move-modal-header">
          <h3>Move group to:</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <XMarkIcon style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        <div className="move-modal-content">
          {availableBoards.length === 0 ? (
            <div className="no-boards-message">
              No other boards available
            </div>
          ) : (
            <div className="boards-list">
              {availableBoards.map((board) => (
                <div
                  key={board._id}
                  className={`modal-board-item ${selectedBoardId === board._id ? 'selected' : ''}`}
                  onClick={() => handleBoardSelect(board._id)}
                >
                  <div 
                    className="board-color-indicator"
                    style={{ backgroundColor: group.style.color }}
                  />
                  <span className="modal-board-title">{board.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="move-modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="move-btn" 
            onClick={handleMove}
            disabled={!selectedBoardId}
          >
            Move
          </button>
        </div>
      </div>
    </div>
  );
}
