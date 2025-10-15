import { useEffect, useRef, useState } from "react";
import { PopperPeople } from "../contextMenuCmps/PopperPeople";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";

 const allPeople = [
        { _id: 'u100',name: 'Doron test' },
        { _id: 'u101',name: 'Gil test' },
        { _id: 'u102',name: 'Mira test' },
        // Add more people as needed
    ];


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
      {/* <button
        ref={buttonRef}
        onClick={() => handleOpen()} // Call handleOpen correctly
        className="status-button"
        style={{ backgroundColor: selected.color }}
      > */}
        {/* {selected && selected.length > 0 ? selected.map(x => x).join(',') : '+'} */}
      {/* </button> */}
      <div style={{cursor:'pointer'}} ref={buttonRef} onClick={() => handleOpen()}>{selected && selected.length > 0 ? allPeople.filter(person => selected.includes(person._id)).map(x =>  {
        return <span title={x.name}><HiOutlineUserCircle style={{fontSize:'2rem'}}/></span>
      }) : <FaPlus style={{fontSize:'2rem'}}  />}</div>
      <PopperPeople members={selected} strSelectedDate={selected}  isOpen={open} buttonRef={buttonRef} onSelect={(value) => onSelect(value)} onClose={() => handleClose()} />
    </div>
    );

}
