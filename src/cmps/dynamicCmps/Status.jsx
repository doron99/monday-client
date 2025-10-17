import { useEffect, useRef, useState } from "react";
import {  PopperStatus } from "../contextMenuCmps/PopperStatus";
import { eventBusService } from "../../services/event-bus.service";

const statuses = [
  { label: "Done", color: "#00C875" },
  { label: "Stuck", color: "#E2445C" },
  { label: "Working on it", color: "#C4C4C4" },
];
const getColorByStatus = (statusLabel) => {
  const status = statuses.find(s => s.label === statusLabel);
  return status ? status.color : null; // Return null if status is not found
};
export function Status({ info,onTaskUpdate }) {
    //console.log('info',info,statuses.find(item => item.label == info))
    const [selected, setSelected] = useState({label: info,color: getColorByStatus(info)});
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
    function updateTask(value) {
      onTaskUpdate({ key: "status", value: value });
    }
        

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open

  const onSelect = (value) => {
    console.log('onSelect object received:', value)
    setSelected(value);
    handleClose(); // Close after selection
    onTaskUpdate({ key: "status", value: value.label });
  };
   const openDynamicPopper = (btnRef) => {
        const rect = buttonRef.current.getBoundingClientRect(); // Get the rectangle object
        //const x = rect.x + window.scrollX; // Calculate x coordinate
        //const y = rect.y + window.scrollY; // Calculate y coordinate
        const x = rect.x + rect.width / 2 + window.scrollX; // Centered horizontally
        const y = rect.bottom + window.scrollY; // Positioned below the button
  
        eventBusService.emit('openPopperDynamic', { x, y, content:'test',component:'status' }); // Emit the event with x, y
  
      };
  return (
    <div className="task-status" style={{ backgroundColor: selected.color }}>
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
