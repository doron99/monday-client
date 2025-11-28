import { useEffect, useRef, useState } from "react";
import { eventBusService } from "../../services/event-bus.service";


export function DateEl({ info,content,onTaskUpdate }) {
    const [selected, setSelected] = useState(info);
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);
  
        

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open
 const openDynamicPopper = (btnRef) => {
      const rect = buttonRef.current.getBoundingClientRect(); // Get the rectangle object
      //const x = rect.x + window.scrollX; // Calculate x coordinate
      //const y = rect.y + window.scrollY; // Calculate y coordinate
      const x = rect.x + rect.width / 2 + window.scrollX; // Centered horizontally
      const y = rect.bottom + window.scrollY; // Positioned below the button

      eventBusService.emit('openPopperDynamic', { x, y, content:content,component:'date' }); // Emit the event with x, y

    };
  // const onSelect = (value) => {
  //   setSelected(value);
  //   handleClose(); // Close after selection
  //   onTaskUpdate({ key: "date", value: value });
  // };
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
    <div ref={buttonRef} onClick={openDynamicPopper} className="task-date" style={{
    ...styles.styleTaskDate,
    background: selected ? "#579bfc" : "gray"
  }}>

      <span style={styles.styleTaskDateSpan} >
        {selected ? formatDateString(selected) : '+'}</span>
        {/* <button  onClick={handleOpen}>{info}</button> */}
      {/* <PopperDate strSelectedDate={selected} isOpen={open} buttonRef={buttonRef} onSelect={(s) => onSelect(s)} onClose={handleClose} /> */}
    </div>
    );

}
const styles={
  styleTaskDate:{
    color: 'white',
    borderRadius: '20px',
    padding: '0.2rem 3rem',
    width:'85%',
    cursor:'pointer',
    textAlign:'center'
  },
  styleTaskDateSpan:{
    fontSize:'1rem'
  
  }
}
