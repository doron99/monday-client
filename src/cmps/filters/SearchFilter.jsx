import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { setFilter } from "../../store/actions/board.actions";
import { utilService } from "../../services/util.service";

export const SearchFilter = () => {
  const filterBy = useSelector(state => state.boardModule.filterBy);
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const onSetFilterByDebounce = useRef(
    utilService.debounce(setFilter, 500)
  ).current;

  useEffect(() => {
    onSetFilterByDebounce(filterByToEdit);
  }, [filterByToEdit]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  function handleChange(ev) {
    const { value } = ev.target;
    setFilterByToEdit(prev => ({ ...prev, txt: value }));
  }

  function closeSearch() {
    setIsOpen(false);
  }

  return (
    <div className="search-filter-wrapper">

      {!isOpen && (
        <button
          className="board-filter-btn"
          onClick={() => setIsOpen(true)}
        >
          <MagnifyingGlassIcon className="icon" />
          <span>Search</span>
        </button>
      )}

      {isOpen && (
        <div className="search-open">
          <MagnifyingGlassIcon className="icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search this board"
            value={filterByToEdit.txt || ""}
            onChange={handleChange}
            onBlur={closeSearch}
          />
        </div>
      )}
    </div>
  );
};
