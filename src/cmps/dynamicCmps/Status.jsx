import { useEffect, useRef, useState } from "react";
import { eventBusService } from "../../services/event-bus.service";
import { useSelector } from "react-redux";

// const statuses = [
//   { label: "Done", color: "#00C875" },
//   { label: "Stuck", color: "#E2445C" },
//   { label: "Working on it", color: "#C4C4C4" },
// ];

export function Status({ content,onTaskUpdate }) {
    const selectedBoard = useSelector(state => state.boardModule.selectedBoard);
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)

    const statuses = selectedBoard.statuses;
    const getColorByStatus = (statusLabel) => {
      const status = statuses.find(s => s.label === statusLabel);
      return status ? status.color : null; // Return null if status is not found
    };
    const [selected, setSelected] = useState({label: content.status,color: getColorByStatus(content.status)});
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    function updateTask(value) {
      onTaskUpdate({ key: "status", value: value });
    }
    
    

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open

  // const onSelect = (value) => {
  //   setSelected(value);
  //   handleClose(); // Close after selection
  //   onTaskUpdate({ key: "status", value: value.label });
  // };
   const openDynamicPopper = (btnRef) => {
        const rect = buttonRef.current.getBoundingClientRect(); // Get the rectangle object
        const x = rect.x + rect.width / 2 + window.scrollX; // Centered horizontally
        const y = rect.bottom + window.scrollY; // Positioned below the button
        eventBusService.emit('openPopperDynamic', { x, y, content:content,component:'status' }); // Emit the event with x, y
  
      };
  return (
    <div className="task-status" style={{ backgroundColor: selected.color }}>
      {/* {JSON.stringify(selected, null, 2)} */}

      <button
        ref={buttonRef}
        onClick={openDynamicPopper} // Call handleOpen correctly
        className="status-button"
        style={{ backgroundColor: selected.color }}
      >
        {selected.label}
      </button>
      {/* <PopperStatus isOpen={open} buttonRef={buttonRef} onSelect={(value) => onSelect(value)} onClose={() => handleClose()}  /> */}
    </div>
    );

}
