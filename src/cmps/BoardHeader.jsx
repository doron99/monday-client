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
    <header className="board-header flex items-center gap-4 p-3">
      <div
        className={`board-title-wrapper ${isFocused ? "focused" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          border: isFocused ? "1px solid #c3c6d4" : "1px solid transparent",
          borderRadius: "4px",
          padding: "2px 6px",
        }}
      >
        <span
          suppressContentEditableWarning
          contentEditable
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="board-title text-2xl font-bold cursor-text"
          style={{
            outline: "none",
            userSelect: "text",
          }}
        >
          {board.title}
        </span>
      </div>

      <BoardFiltersBar />
    </header>
  );
};
