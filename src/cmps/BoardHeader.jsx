import { useState } from "react";
import { BoardFiltersBar } from "./filters/BoardFiltersBar";

export const BoardHeader = ({ board, onUpdateBoard }) => {
  if (!board) return null;

  const [isFocused, setIsFocused] = useState(false);
  const [originalTitle, setOriginalTitle] = useState(board.title);

  const handleSaveTitle = async (newValue) => {
    const trimmed = newValue.trim();
    if (trimmed && trimmed !== originalTitle) {
      try {
        const updatedBoard = await onUpdateBoard(null, null, {
          key: "title",
          value: trimmed,
        });

        if (updatedBoard?.title) {
          setOriginalTitle(updatedBoard.title);
        } else {
          setOriginalTitle(trimmed);
        }
      } catch (err) {
        console.error("Error updating board title:", err);
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOriginalTitle(board.title);
  };

  const handleBlur = (ev) => {
    setIsFocused(false);
    handleSaveTitle(ev.target.innerText);
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      ev.target.blur();
    }
  };

return (
    <header className="board-header">
      <div className={`board-title-wrapper ${isFocused ? "focused" : ""}`}>
        <span
          suppressContentEditableWarning
          contentEditable
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="board-title"
        >
          {board.title}
        </span>
      </div>

      <div className="main-table-section">
        <span className="main-table-text">Main table</span>
      </div>

      <BoardFiltersBar />
    </header>
  );
};