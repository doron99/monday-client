import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../store/actions/board.actions";

export const SearchFilter = () => {
  const filterBy = useSelector(state => state.boardModule.filterBy);
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    setFilter(filterByToEdit)
  }, [filterByToEdit]);

  function handleChange(ev) {
    const { value } = ev.target;
    setFilterByToEdit(prev => ({ ...prev, txt: value }));
  }

  return (
    <div className="filter-container">
      <MagnifyingGlassIcon className="icon" />
      <input
        type="text"
        placeholder="Search this board"
        value={filterByToEdit.txt || ""}
        onChange={handleChange}
      />
    </div>
  );
};
