
import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { utilService } from "../../services/util.service";
import { updateBoard } from "../../store/actions/board.actions";
import { useSelector } from "react-redux";

export const PopperContentPriority = ({  onSelect,content, onClose }) => {
  const selectedBoard = useSelector(state => state.boardModule.selectedBoard);
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  const priorities = selectedBoard.priorities;

  console.log('PopperContentPriority',content,priorities)

  const onSelectSave = (val) => {
    //updateBoard(content.groupId, content.taskId, { key:val.key, value:val.value });
    updateBoard(content.groupId, content.taskId, { key:'priority', value:val.label });
    onClose();
  }
  return (
    <div className="task-dropdown" style={{
      width:'200px'
    }}>
      {priorities.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelectSave(s)}
          className="task-dropdown-item"
          style={{ backgroundColor: s.color }}
        >
          {s.label}
        </button>
      ))}
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
