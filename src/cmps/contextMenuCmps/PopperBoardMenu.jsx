import { createPopper } from "@popperjs/core"
import { useEffect, useRef } from "react"
import {
  PencilIcon,
  TrashIcon,
  StarIcon,
  ArrowTopRightOnSquareIcon
} from "@heroicons/react/24/outline"

export const PopperBoardMenu = ({
  isOpen,
  buttonRef,
  onOpenBoard,
  onRename,
  onToggleFavorite,
  onDelete,
  onClose,
  isFavorite
}) => {
  const popperRef = useRef(null)
  const popperInstance = useRef(null)

  useEffect(() => {
    if (isOpen && buttonRef.current && popperRef.current) {
      popperInstance.current = createPopper(buttonRef.current, popperRef.current, {
        placement: "right-start",
        modifiers: [
          { name: "offset", options: { offset: [8, 8] } },
          { name: "preventOverflow", options: { boundary: "viewport" } },
          { name: "flip", options: { fallbackPlacements: ["left-start", "bottom-start"] } },
        ],
      })
    }

    return () => {
      if (popperInstance.current) {
        popperInstance.current.destroy()
        popperInstance.current = null
      }
    }
  }, [isOpen, buttonRef])

  // סגירה בלחיצה מחוץ
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        popperRef.current && !popperRef.current.contains(event.target)
      ) {
        onClose()
      }
    }

    if (isOpen) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, buttonRef, onClose])

  if (!isOpen) return null

  const menuItems = [
    { label: "Open board", icon: <ArrowTopRightOnSquareIcon className="w-4 h-4 icon" />, action: onOpenBoard },
    { label: "Rename", icon: <PencilIcon className="w-4 h-4 icon" />, action: onRename },
    {
      label: isFavorite ? "Remove from favorites" : "Add to favorites",
      icon: <StarIcon className="w-4 h-4 icon" />,
      action: onToggleFavorite
    },
    { label: "Delete", icon: <TrashIcon className="w-4 h-4 icon" />, action: onDelete },
  ]

  return (
    <div ref={popperRef} className={`context-menu ${isOpen ? "active" : ""}`}>
      {menuItems.map((item, idx) => (
        <button
          key={idx}
          onClick={() => {
            item.action()
            onClose()
          }}
        >
          <span>{item.label}</span>
          {item.icon}
        </button>
      ))}
    </div>
  )
}
