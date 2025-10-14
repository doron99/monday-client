import { useEffect, useRef, useState } from "react";
import { ContextMenuStatus } from "../contextMenuCmps/ContextMenuStatus";
import { createPopper } from "@popperjs/core";
import { Popper1 } from "../contextMenuCmps/Popper1";

const statuses = [
  { label: "Done", color: "#00C875" },
  { label: "Stuck", color: "#E2445C" },
  { label: "Working on it", color: "#C4C4C4" },

];
export function Status({ info,onTaskUpdate }) {
  
     const [selected, setSelected] = useState(statuses[0]);
      const [open, setOpen] = useState(false);
      const buttonRef = useRef(null);
      function updateTask(value) {
        onTaskUpdate({ key: "status", value: value });
      }
        
  
  //const [open, setOpen] = useState(false);
  //const buttonRef = useRef(null);

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open

  const onSelect = (value) => {
    console.log('onSelect object received:', value)
    setSelected(value);
    handleClose(); // Close after selection
    onTaskUpdate({ key: "status", value: value.label });
  };
  return (
    <div className="task-status">
      <button
        ref={buttonRef}
        onClick={handleOpen} // Call handleOpen correctly
        className="status-button"
        style={{ backgroundColor: selected.color }}
      >
        {info}
      </button>
      <Popper1 isOpen={open} buttonRef={buttonRef} onSelect={onSelect} onClose={handleClose} />
    </div>
    );

}
