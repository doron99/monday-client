import { SearchFilter } from "./SearchFilter";
import { PersonFilter } from "./PersonFilter";
import { SortFilter } from "./SortFilter";
import { HideFilter } from "./HideFilter";
import { addTaskToFirstGroup, addGroupWithTask } from "../../store/actions/board.actions";
import { useSelector } from "react-redux";
import { AddTaskMenu } from "../AddTaskMenu";


export function BoardFiltersBar() {
  const board = useSelector(state => state.boardModule.selectedBoard)
  return (
    <div className="board-filters-bar">
      <AddTaskMenu
        onAddTask={() => addTaskToFirstGroup()}
        onAddGroup={() => addGroupWithTask()}
      />
      <SearchFilter />
      <PersonFilter />
      <SortFilter />
      <HideFilter />
    </div>
  );
}
