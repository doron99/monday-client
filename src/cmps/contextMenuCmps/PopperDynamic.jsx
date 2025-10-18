import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import { PopperContentDate } from "./PopperContentDate";
import { PopperContentStatus } from "./PopperContentStatus";
import { PopperContentPriority } from "./PopperContentPriority";
import { PopperContentMember } from "./PopperContentMember";
import { eventBusService } from "../../services/event-bus.service";

export const PopperDynamic = ({ component,content,x = 200, y=200, isOpen, onSelect, onClose }) => {
  const popperRef = useRef(null);
  const popperInstance = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
  if (isOpen && popperRef.current) {
    popperInstance.current = createPopper( popperRef.current, {
        placement: 'bottom',
        modifiers: [
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'arrow', options: { element: arrowRef.current } },
          { name: 'preventOverflow', options: { boundary: 'viewport' } },
          { name: 'flip', options: { 
            // fallbackPlacements: ['top', 'right', 'left']
           } },
        ],
      });
       // Set specific styles for the popper
            popperRef.current.style.position = 'absolute';
            popperRef.current.style.zIndex = '1000'; 
            popperRef.current.style.width = 'fit-content'; 
            popperRef.current.style.background = 'white';
            popperRef.current.style.left = `${x}px`;
            popperRef.current.style.top = `${y}px`;
            popperRef.current.style.transform = 'translateX(-50%)';
            popperRef.current.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Shadow
            popperRef.current.style.borderRadius = '8px'; // Border radius
            popperRef.current.style.border = 'rgba(0, 0, 0, 0.2) 2px 1px 11px 6px;'
            popperRef.current.style.padding = '10px'

  }

  return () => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
    }
  };
}, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popperRef.current && !popperRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, popperRef, onClose]);

  if (!isOpen) return null;


  const _onSelect = (val) => {
    console.log('PopperDynamic callback', val, 'content',content);
    onSelect({val,content});
  }
  

  return (
    <div ref={popperRef} className="" >
      {component == 'date' && 
      <PopperContentDate   
        content={content} 
        onSelect={(val) => _onSelect(val)} 
        onClose={() => onClose()} />}
      {component == 'status' && 
      <PopperContentStatus 
        content={content}   
        onSelect={(val) => _onSelect(val)} 
        onClose={() => onClose()} />}
      {component == 'priority' && 
      <PopperContentPriority 
        content={content}   
        onSelect={(val) => _onSelect(val)} 
        onClose={() => onClose()} />}
      {component == 'member' && 
      <PopperContentMember 
        content={content}   
        onSelect={(val) => _onSelect(val)} 
        onClose={() => onClose()} />
      }
 
      <div ref={arrowRef} className="popper-arrow" />

      {/* <button onClick={onClose}>Close</button> */}
    </div>
  );
};
