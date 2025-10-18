
import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useSelector } from "react-redux";
import { updateBoard } from "../../store/actions/board.actions";
import { utilService } from "../../services/util.service";
export const PopperContentStatus = ({  onSelect,content, onClose }) => {
  const selectedBoard = useSelector(state => state.boardModule.selectedBoard);
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  const statuses = selectedBoard.statuses;
 
  const onSelectSave = (val) => {
    updateBoard(content.groupId, content.taskId, { key:val.key, value:val.value });
    onClose();
  }
  return (
    <>

    <div  className="task-priority" style={{
      width:'200px',
    }}>
      {/* {JSON.stringify(statuses, null, 2)} */}

      {statuses.map((s, idx) => (

        <button
          key={idx}
          onClick={() => onSelectSave({key:'status',value:s.label})}
          className="dropdown-item"
          style={{ backgroundColor: s.color }}
        >
          {s.label}
        </button>
      ))}
    </div>
    </>
    
  );
};
