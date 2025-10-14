
import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const PopperDate = ({ strSelectedDate, isOpen, buttonRef, onSelect, onClose }) => {
  const popperRef = useRef(null);
  const popperInstance = useRef(null);
  const arrowRef = useRef(null);

  //console.log('strSelectedDate', strSelectedDate);
  const [selectedDate, setSelectedDate] = useState(new Date(strSelectedDate));

  useEffect(() => {
    // Update selectedDate whenever strSelectedDate changes
    if (strSelectedDate) {
        setSelectedDate(new Date(strSelectedDate));
    }
  }, [strSelectedDate]);


  useEffect(() => {
  if (isOpen && buttonRef.current && popperRef.current) {
    popperInstance.current = createPopper(buttonRef.current, popperRef.current, {
      placement: 'bottom', // Place the Popper directly below the button
      modifiers: [
        {
          name: 'offset',
          options: { offset: [0, 8] }, // 8 pixels below
        },
        {
          name: 'arrow', // Optional: If you want to add an arrow
          options: {
            element: arrowRef.current,
          },
        },
        {
          name: 'preventOverflow',
          options: {
            boundary: 'viewport', // Prevents the popper from going off-screen
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top', 'right', 'left'], // Allow flipping options
          },
        },
      ],
    });
  }

  return () => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
    }
  };
}, [isOpen, buttonRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
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
  }, [isOpen, buttonRef, popperRef, onClose]);

  if (!isOpen) return null;

  const handleDaySelect = (e) => {
    console.log(e);
    onSelect(formatDate(e));
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div ref={popperRef} className="dropdown-menu">
      <DayPicker
        animate
        mode="single"
        selected={selectedDate}
        onSelect={handleDaySelect}
        footer={
          selectedDate 
            ? `Selected: ${selectedDate.toLocaleDateString()}`
            : "Pick a day."
        }
      />
      <div ref={arrowRef} className="popper-arrow" />

      <button onClick={onClose}>Close</button>
    </div>
  );
};
