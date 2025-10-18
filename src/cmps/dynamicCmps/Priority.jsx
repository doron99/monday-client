
import { useEffect, useRef, useState } from "react";
import { eventBus, eventBusService } from "../../services/event-bus.service";
import { useSelector } from "react-redux";



export function Priority({ content,onTaskUpdate }) {
    const selectedBoard = useSelector(state => state.boardModule.selectedBoard);
    const isDev = useSelector(storeState => storeState.devToolModule.isDev)
    const getColorByStatus = (statusLabel) => {
      const status = priorities.find(s => s.label === statusLabel);
      return status ? status.color : null; // Return null if status is not found
    };
    const priorities = selectedBoard.priorities;
    const [selected, setSelected] = useState({label: content.priority,color: getColorByStatus(content.priority)});
    const [open, setOpen] = useState(false);
    const buttonRef = useRef(null);

  // Toggle Functions
  const handleClose = () => setOpen(false); // Set to false to close
  const handleOpen = () => setOpen(true); // Set to true to open

  const onSelect = (value) => {
    setSelected(value);
    handleClose(); // Close after selection
    onTaskUpdate({ key: "priority", value: value.label });
  };

   const openDynamicPopper = (btnRef) => {
      const rect = buttonRef.current.getBoundingClientRect(); // Get the rectangle object
      const x = rect.x + rect.width / 2 + window.scrollX; // Centered horizontally
      const y = rect.bottom + window.scrollY; // Positioned below the button
      eventBusService.emit('openPopperDynamic', { x, y, content:content,component:'priority' }); // Emit the event with x, y

    };
  return (
    <div 
    ref={buttonRef}
    onClick={() => openDynamicPopper(buttonRef)}
    className="task-priority" style={{ backgroundColor: selected.color }}>
      <button
        
         // Call handleOpen correctly
        className="status-button"
        style={{ backgroundColor: selected.color }}
      >
        {selected.label}
      </button>
    </div>
    );

}

