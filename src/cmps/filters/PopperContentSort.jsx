import { useState } from "react";
import { useSelector } from "react-redux";
import { setFilter } from "../../store/actions/board.actions";

export function PopperContentSort() {
  const filterBy = useSelector(state => state.boardModule.filterBy);

  const [sortBy, setSortBy] = useState(filterBy.sort?.by || "taskTitle");
  const [sortDir, setSortDir] = useState(filterBy.sort?.dir || "asc");

  function updateSort(by, dir) {
    setFilter({
      ...filterBy,
      sort: { by, dir }
    });
  }

  function resetSort() {
    const defaultBy = "taskTitle";
    const defaultDir = "asc";

    setSortBy(defaultBy);
    setSortDir(defaultDir);

    updateSort(defaultBy, defaultDir);
  }

  return (
    <div className="sort-popper">

      <div className="sort-header">
        <h3>Sort by</h3>
      </div>

      <div className="sort-row-container with-x">

        <div className="sort-row">
          <label className="sort-label">Column</label>
          <select
            className="sort-select"
            value={sortBy}
            onChange={e => {
              setSortBy(e.target.value);
              updateSort(e.target.value, sortDir);
            }}
          >
            <option value="taskTitle">Title</option>
            <option value="members">Member</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="date">Date</option>
          </select>
        </div>

        <div className="sort-row">
          <label className="sort-label">Direction</label>
          <select
            className="sort-select"
            value={sortDir}
            onChange={e => {
              setSortDir(e.target.value);
              updateSort(sortBy, e.target.value);
            }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <button
          className="sort-clear-x"
          onClick={resetSort}
        >
          ×
        </button>

      </div>
    </div>
  );
}
