import { useEffect, useRef, useState } from "react";
import { PopperDate } from "../contextMenuCmps/PopperDate";


export function Date({ info,onTaskUpdate }) {
    
    const [selected, setSelected] = useState(info);
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
  
        

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open

  const onSelect = (value) => {
    console.log('onSelect object received:', value)
    setSelected(value);
    handleClose(); // Close after selection
    onTaskUpdate({ key: "date", value: value });
  };
  
  return (
    <div className="task-status">
      {/* <button
        ref={buttonRef}
        onClick={handleOpen} // Call handleOpen correctly
        className="status-button"
        style={{ backgroundColor: '#c1c1c1' }}
      >
        {selected}
      </button> */}

      <span ref={buttonRef} onClick={handleOpen}>{selected ? (selected) : '---'}</span>
        {/* <button  onClick={handleOpen}>{info}</button> */}
      <PopperDate strSelectedDate={selected} isOpen={open} buttonRef={buttonRef} onSelect={onSelect} onClose={handleClose} />
    </div>
    );

}
