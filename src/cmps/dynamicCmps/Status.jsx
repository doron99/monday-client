import { useEffect, useRef, useState } from "react";
import { ContextMenuStatus } from "../contextMenuCmps/ContextMenuStatus";

export function Status({ info,onTaskUpdate }) {
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
  <div className="task-status">
        <span onClick={contextMenuHandler.handleOnContextMenu}>{info}</span>
        <ContextMenuStatus
                            contextMenuRef={contextMenuRef}
                            isToggled={contextMenu.toggled}
                            positionX={contextMenu.position.x}
                            positionY={contextMenu.position.y}
                            onAction={(item) => contextMenuHandler.handleOnAction(item)}
                            >
         </ContextMenuStatus>
      </div>
}
