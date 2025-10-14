import { useEffect, useRef, useState } from "react";
import { PopperPeople } from "../contextMenuCmps/PopperPeople";
import { useSelector } from "react-redux";



export function Member({ info,onTaskUpdate }) {
    //console.log('info',info,priorites.find(item => item.label == info))
  const [selected, setSelected] = useState(info);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const isDev = useSelector(storeState => storeState.devToolModule.isDev)

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open

  const onSelect = (value) => {
    console.log('onSelect object received:', value)//['u100', 'u102']
    setSelected(value);
    handleClose(); // Close after selection
    onTaskUpdate({ key: "members", value: value });
  };
const devSection = isDev 
    ? <pre>
        {JSON.stringify(selected, null, 2)}
        </pre> 
    : "";

  return (
    <div className="task-status">
    {devSection}
      <button
        ref={buttonRef}
        onClick={() => handleOpen()} // Call handleOpen correctly
        className="status-button"
        style={{ backgroundColor: selected.color }}
      >
        {/* {selected.label} */}
        {selected && selected.length > 0 ? selected.map(x => x).join(',') : '+'}
      </button>
      
      <PopperPeople members={selected} strSelectedDate={selected}  isOpen={open} buttonRef={buttonRef} onSelect={(value) => onSelect(value)} onClose={() => handleClose()} />
    </div>
    );

}
