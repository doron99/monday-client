import { useEffect, useRef, useState } from "react";
import { PopperDate } from "../contextMenuCmps/PopperDate";


export function DateEl({ info,onTaskUpdate }) {
    
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
function parseISO(dateString) {
  const parts = dateString.split('-');
    // debugger;
  // Ensure the date string is correctly formatted
  if (parts.length !== 3) {
    console.error('Invalid date format:', dateString);
    return null;
  }

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) //- 1; // Months are 0-indexed
  const day = parseInt(parts[2], 10);

  const date1 = new Date(year, month, day);
  
  if (isNaN(date1.getTime())) {
    console.error('Invalid date constructed:', dateString);
    return null; // Handle invalid date
  }

  return date1;
}
  function formatDateString(dateString) {
  const date1 = parseISO(dateString);
  
  if (!date1) {
    return 'Invalid Date';
  }

  const options = { month: 'short', day: 'numeric', year: '2-digit' };
  return date1.toLocaleDateString('en-US', options); // Format to 'MMM D, YY'
}

  
  return (
    <div className="task-date">

      <span ref={buttonRef} onClick={handleOpen}>{selected ? formatDateString(selected) : '---'}</span>
        {/* <button  onClick={handleOpen}>{info}</button> */}
      <PopperDate strSelectedDate={selected} isOpen={open} buttonRef={buttonRef} onSelect={(s) => onSelect(s)} onClose={handleClose} />
    </div>
    );

}
