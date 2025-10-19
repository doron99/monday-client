import { SearchFilter } from "./SearchFilter";
import { PersonFilter } from "./PersonFilter";

export function BoardFiltersBar() {
  return (
    <div className="board-filters-bar">
      <SearchFilter />
      <PersonFilter />
    </div>
  );
}
