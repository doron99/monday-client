
import { useEffect, useRef, useState } from "react";
import { PopperPriority } from "../contextMenuCmps/PopperPriority";
import { eventBus, eventBusService } from "../../services/event-bus.service";

  const priorites = [
    { label: 'high', color: 'red' },
    { label: 'medium', color: 'orange' },
    { label: 'low', color: 'green' },
  ];

const getColorByStatus = (statusLabel) => {
  const status = priorites.find(s => s.label === statusLabel);
  return status ? status.color : null; // Return null if status is not found
};
export function Priority({ info,onTaskUpdate }) {
    //console.log('info',info,priorites.find(item => item.label == info))
    const [selected, setSelected] = useState({label: info,color: getColorByStatus(info)});
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open

  const onSelect = (value) => {
    console.log('onSelect object received:', value)
    setSelected(value);
    handleClose(); // Close after selection
    onTaskUpdate({ key: "priority", value: value.label });
  };
  function openDynamicPopper1() {
    console.log('buttonRef',buttonRef)
    eventBusService.openPopperDynamic({ btnRef: buttonRef });
  }
   const openDynamicPopper = (btnRef) => {
      const rect = buttonRef.current.getBoundingClientRect(); // Get the rectangle object
      //const x = rect.x + window.scrollX; // Calculate x coordinate
      //const y = rect.y + window.scrollY; // Calculate y coordinate
      const x = rect.x + rect.width / 2 + window.scrollX; // Centered horizontally
      const y = rect.bottom + window.scrollY; // Positioned below the button

      eventBusService.emit('openPopperDynamic', { x, y, content:'test',component:'priority' }); // Emit the event with x, y

    };
  return (
    <div className="task-priority" style={{ backgroundColor: selected.color }}>
      <button
        ref={buttonRef}
        onClick={() => openDynamicPopper(buttonRef)} // Call handleOpen correctly
        className="status-button"
        style={{ backgroundColor: selected.color }}
      >
        {selected.label}
      </button>
      {/* <PopperPriority isOpen={open} buttonRef={buttonRef} onSelect={(value) => onSelect(value)} onClose={() => handleClose()} /> */}
    </div>
    );

}

