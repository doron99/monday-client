import React, { useState, useRef } from "react";
import { FilterPopper } from "./FilterPopper";
import { PopperContentSort } from "./PopperContentSort";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline"; 

export function SortFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  return (
    <div className="filter-container">
      <button
        ref={btnRef}
        className="board-filter-btn"
        onClick={() => setIsOpen(true)}
      >
        <ArrowsUpDownIcon className="sort-icon" />
        <span className="sort-text">Sort</span>
      </button>

      <FilterPopper
        anchorEl={btnRef.current}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <PopperContentSort onClose={() => setIsOpen(false)} />
      </FilterPopper>
    </div>
  );
}
