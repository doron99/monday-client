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
  const wrapperRef = useRef(null);

  const onSetFilterByDebounce = useRef(
    utilService.debounce(setFilter, 500)
  ).current;

  useEffect(() => {
    onSetFilterByDebounce(filterByToEdit);
  }, [filterByToEdit, onSetFilterByDebounce]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleChange(ev) {
    const { value } = ev.target;
    setFilterByToEdit(prev => ({ ...prev, txt: value }));
  }

  function toggleSearch() {
    setIsOpen(prev => !prev);
    if (isOpen) {
      setFilterByToEdit(prev => ({ ...prev, txt: "" }));
    }
  }

  return (
    <div className="search-filter-wrapper" ref={wrapperRef}>
      {!isOpen && (
        <button
          className="board-filter-btn"
          onClick={toggleSearch}
        >
          <MagnifyingGlassIcon style={{ width: "18px", height: "18px" }} />
          <span>Search</span>
        </button>
      )}

      {isOpen && (
        <div className="search-open">
          <div className="filter-input-container">
            <input
              ref={inputRef}
              className="filter-input"
              type="text"
              placeholder="Search this board"
              value={filterByToEdit.txt || ""}
              onChange={handleChange}
            />
            <MagnifyingGlassIcon 
              className="search-icon inside"
              style={{ width: "16px", height: "16px" }}
              onClick={toggleSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
};