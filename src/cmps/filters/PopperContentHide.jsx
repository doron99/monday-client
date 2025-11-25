import { useState } from "react";
import { useSelector } from "react-redux";
import { setHiddenColumns } from "../../store/actions/board.actions";

const HIDEABLE_COLUMNS = [
  { id: "status", label: "Status", color: "#00c875" },
  { id: "members", label: "Member", color: "#00c0ff" },
  { id: "date", label: "Date", color: "#a25ddc" },
  { id: "priority", label: "Priority", color: "#fdab3d" },
];

export function PopperContentHide() {
  const hiddenColumns = useSelector(state => state.boardModule.hiddenColumns);
  const [search, setSearch] = useState("");

  const hideableIds = HIDEABLE_COLUMNS.map(c => c.id);

  const selectedCount = hideableIds.filter(
    id => !hiddenColumns.includes(id)
  ).length;

  const allSelected = selectedCount === hideableIds.length;

  function toggleColumn(id) {
    let newHidden;

    if (hiddenColumns.includes(id)) {
      newHidden = hiddenColumns.filter(cmpId => cmpId !== id);
    } else {
      newHidden = [...hiddenColumns, id];
    }

    setHiddenColumns(newHidden);
  }

  function toggleAll() {
    if (allSelected) {
      setHiddenColumns([...hideableIds]);
    } else {
      setHiddenColumns([]);
    }
  }

  const filteredColumns = HIDEABLE_COLUMNS.filter(col =>
    col.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="hide-popper">
      <div className="hide-header">
        <h3>Display columns</h3>
      </div>

      <div className="hide-search-container">
        <input
          type="text"
          className="hide-search-input"
          placeholder="Find columns to show/hide"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="hide-all-row">
        <label className="hide-row">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
          />
          <span className="hide-all-label">
            All columns{" "}
            <span className="hide-all-count">
              {selectedCount} selected
            </span>
          </span>
        </label>
      </div>

      <div className="hide-columns-list">
        {filteredColumns.map(col => {
          const isChecked = !hiddenColumns.includes(col.id);

          return (
            <label key={col.id} className="hide-row">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleColumn(col.id)}
              />

              <span
                className="hide-column-icon"
                style={{ backgroundColor: col.color }}
              />

              <span className="hide-column-label">{col.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
