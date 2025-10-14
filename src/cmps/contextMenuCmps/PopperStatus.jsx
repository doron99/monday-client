import { createPopper } from "@popperjs/core";
import { useEffect, useRef } from "react";

export const PopperStatus = ({ isOpen, buttonRef, onSelect, onClose }) => {
  const popperRef = useRef(null);
  const popperInstance = useRef(null);
  const arrowRef = useRef(null);

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
      // Check if the click is outside the button and the Popper
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        popperRef.current && !popperRef.current.contains(event.target)
      ) {
        onClose(); // Close the Popper
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, buttonRef, popperRef, onClose]);

  if (!isOpen) return null; // Do not render Popper if not open

  const statuses = [
    { label: 'Done', color: 'green' },
    { label: 'Stuck', color: 'red' },
    { label: 'Working on it', color: 'orange' },
  ];

  return (
    <div ref={popperRef} className="dropdown-menu">
      {statuses.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(s)}
          className="dropdown-item"
          style={{ backgroundColor: s.color }}
        >
          {s.label}
        </button>
      ))}
            <div ref={arrowRef} className="popper-arrow" />

      <button onClick={onClose}>Close</button> {/* Optional close button */}
    </div>
  );
};
