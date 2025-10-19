import { BoardFiltersBar } from "./filters/BoardFiltersBar";

export const BoardHeader = ({ boardName = "My Board" }) => {
  return (
    <header className="board-header">
      <h1 className="board-title">{boardName}</h1>
      <BoardFiltersBar />
    </header>
  );
};