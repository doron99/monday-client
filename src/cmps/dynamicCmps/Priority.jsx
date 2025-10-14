import { useEffect, useRef, useState } from "react";
import { ContextMenuStatus } from "../contextMenuCmps/ContextMenuStatus";
import {eventBusService, setBackdrop} from '../../services/event-bus.service'
import { ContextMenuPriority } from "../contextMenuCmps/ContextMenuPriority";
import { createPopper } from "@popperjs/core";

export function Priority({ info, onTaskUpdate }) {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const boardPriority = ["LOW", "MEDIUM", "HIGH"];
  const contextMenuRef = useRef(null)
    const [contextMenu,setContextMenu] = useState(
        {position: {
          x:0,
          y:0},
          toggled:false});
  const contextMenuHandler = {
     handleOnContextMenu: (e, rightClickPerson) => {
              e.preventDefault();
              e.stopPropagation();
              const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
              const isLeft = e.clientX < window.innerWidth / 2;
              let x;
              let y = e.clientY;
              if (isLeft) {
                  x = e.clientX;
              } else {
                  x = e.clientX - contextMenuAttr.width;
              }
              const t = {
                  position: { x, y },
                  toggled: true,
              };
              console.log(t);
              setContextMenu(t);
              //setBackdrop(true);
          },
  
          _resetContextMenu: () => {
              setContextMenu({
                  position: { x: 0, y: 0 },
                  toggled: false,
              });
          },
  
          handleOnAction: ({ data }) => {
              console.log('something', data);
              contextMenuHandler._resetContextMenu(); // Note how you're referring to the method
              updateTask(data.priority)
              //onContextMenuSelect(data);

          },
      };
 
  function updateTask(value) {

    onTaskUpdate({ key: "priority", value: value });
  }
      const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            contextMenuHandler._resetContextMenu();
        }
    };

    useEffect(() => {
        if (contextMenu.toggled) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [contextMenu.toggled]);

  return (
    <div className="task-priority">
      <span onClick={contextMenuHandler.handleOnContextMenu}>{info}</span>
      <ContextMenuPriority 
                          ref={contextMenuRef}
                          isToggled={contextMenu.toggled}
                          positionX={contextMenu.position.x}
                          positionY={contextMenu.position.y}
                          onAction={(item) => contextMenuHandler.handleOnAction(item)}
                          >
       </ContextMenuPriority>
    </div>
  );
};

