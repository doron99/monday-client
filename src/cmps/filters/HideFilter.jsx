import React, { useState, useRef } from "react";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { FilterPopper } from "./FilterPopper";
import { PopperContentHide } from "./PopperContentHide";

export function HideFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);

  return (
    <div className="filter-container">
      <button
        ref={btnRef}
        className="board-filter-btn"
        onClick={() => setIsOpen(true)}
      >
        <EyeSlashIcon className="hide-icon" />
        <span className="hide-text">Hide</span>
      </button>

      <FilterPopper
        anchorEl={btnRef.current}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <PopperContentHide />
      </FilterPopper>
    </div>
  );
}
