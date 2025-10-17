import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { eventBusService } from "../../services/event-bus.service";

 const allPeople = [
        { _id: 'u100',name: 'Doron test' },
        { _id: 'u101',name: 'Gil test' },
        { _id: 'u102',name: 'Mira test' },
        // Add more people as needed
    ];


export function Member({ info,taskId,content,onTaskUpdate }) {
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
 const openDynamicPopper = (btnRef) => {
      const rect = buttonRef.current.getBoundingClientRect(); // Get the rectangle object
      //const x = rect.x + window.scrollX; // Calculate x coordinate
      //const y = rect.y + window.scrollY; // Calculate y coordinate
      const x = rect.x + rect.width / 2 + window.scrollX; // Centered horizontally
      const y = rect.bottom + window.scrollY; // Positioned below the button

      eventBusService.emit('openPopperDynamic', { x, y, content:content,component:'member' }); // Emit the event with x, y

    };
  return (
    <div className="task-member">
    {devSection}
      {/* <button
        ref={buttonRef}
        onClick={() => handleOpen()} // Call handleOpen correctly
        className="status-button"
        style={{ backgroundColor: selected.color }}
      > */}
        {/* {selected && selected.length > 0 ? selected.map(x => x).join(',') : '+'} */}
      {/* </button> */}
      <div style={{ 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', // Vertically center
        justifyContent: 'center' // Horizontally center
    }}  ref={buttonRef} onClick={() => openDynamicPopper()}>
        {selected && selected.length > 0 
            ? selected.length == 1 
                ? allPeople.filter(person => selected.includes(person._id)).map(x =>  {
                    return <span key={x.name} title={x.name}><HiOutlineUserCircle style={{fontSize:'2rem'}}/></span>})
                : (
                <>
                    <HiOutlineUserCircle style={{ fontSize: '1.4rem' }} />
                    +{allPeople.filter(person => selected.includes(person._id)).length - 1}
                </>
            )
            : <FaPlus style={{fontSize:'2rem'}}  />}</div>
      {/* <PopperPeople members={selected} strSelectedDate={selected}  isOpen={open} buttonRef={buttonRef} onSelect={(value) => onSelect(value)} onClose={() => handleClose()} /> */}
    </div>
    );

}
