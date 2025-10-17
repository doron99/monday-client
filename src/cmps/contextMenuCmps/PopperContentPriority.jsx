
import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const PopperContentPriority = ({  onSelect, onClose }) => {

  const priorites = [
    { label: 'high', color: 'red' },
    { label: 'medium', color: 'orange' },
    { label: 'low', color: 'green' },
  ];

  return (
    <div className="dropdown-men">
      {priorites.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(s)}
          className="dropdown-item"
          style={{ backgroundColor: s.color }}
        >
          {s.label}
        </button>
      ))}

      <button onClick={onClose}>Close</button> {/* Optional close button */}
    </div>
  );
};


//   const statuses = [
//     { label: 'Done', color: 'green' },
//     { label: 'Stuck', color: 'red' },
//     { label: 'Working on it', color: 'orange' },
//   ];

//   return (
//     <>

//     <div r className="">
            
//       {statuses.map((s, idx) => (
//         <button
//           key={idx}
//           onClick={() => onSelect(s)}
//           className="dropdown-item"
//           style={{ backgroundColor: s.color }}
//         >
//           {s.label}
//         </button>
//       ))}
           
//       <button onClick={onClose}>Close</button> {/* Optional close button */}
//     </div>
//     </>
    
//   );
// };
