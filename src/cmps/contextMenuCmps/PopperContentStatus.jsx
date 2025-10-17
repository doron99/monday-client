
import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const PopperContentStatus = ({  onSelect, onClose }) => {
  
  const statuses = [
    { label: 'Done', color: 'green' },
    { label: 'Stuck', color: 'red' },
    { label: 'Working on it', color: 'orange' },
  ];

  return (
    <>

    <div r className="">
            
      {statuses.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(s.label)}
          className="dropdown-item"
          style={{ backgroundColor: s.color }}
        >
          {s.label}
        </button>
      ))}
           
      <button onClick={onClose}>Close</button> {/* Optional close button */}
    </div>
    </>
    
  );
};
