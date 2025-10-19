import { useEffect, useRef } from "react";
import { createPopper } from "@popperjs/core";

export function FilterPopper({ anchorEl, isOpen, onClose, children }) {
  const popperRef = useRef(null);
  const popperInstance = useRef(null);

  useEffect(() => {
    if (isOpen && anchorEl && popperRef.current) {
      popperInstance.current = createPopper(anchorEl, popperRef.current, {
        placement: "bottom-start",
        modifiers: [
          { name: "offset", options: { offset: [0, 8] } },
          { name: "preventOverflow", options: { boundary: "viewport" } },
          { name: "flip", options: { fallbackPlacements: ["top-start"] } },
        ],
      });
    }
    return () => {
      if (popperInstance.current) popperInstance.current.destroy();
      popperInstance.current = null;
    };
  }, [isOpen, anchorEl]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target) &&
        !anchorEl?.contains(event.target)
      ) {
        onClose?.();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, anchorEl, onClose]);

  if (!isOpen) return null;

  return <div ref={popperRef} className="filter-popper">{children}</div>;
}
