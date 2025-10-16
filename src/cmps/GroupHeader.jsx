import { useState, useEffect, useRef } from "react";
import { TaskCount } from "./TaskCount.jsx";
import { GroupMenu } from "./GroupMenu.jsx";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

export function GroupHeader({
  group,
  isExpanded,
  onToggleExpanded,
  onUpdateGroup,
  onDeleteGroup
}) {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [originalTitle, setOriginalTitle] = useState(group.title);
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsGroupMenuOpen(false);
      }
    };

    if (isGroupMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isGroupMenuOpen]);

  const colors = [
    "#008000",
    "#00CC66",
    "#A4D700",
    "#D4BF00",
    "#FFD700",
    "#800080",
    "#BA55D3",
    "#4682B4",
    "#00BFFF",
    "#DC143C",
    "#FF4500",
    "#FF69B4",
    "#FFA500",
    "#F08080",
    "#A52A2A",
    "#C0C0C0",
    "#808080",
    "#FF6347",
  ];

  const taskCount = group.tasks ? group.tasks.length : 0;

  // Handle saving title changes
  const handleTitleSave = (currentValue) => {
    const trimmedValue = currentValue.trim();

    // Only save if content has changed and is not empty
    if (trimmedValue !== originalTitle && trimmedValue !== "") {
      onUpdateGroup(group.id, {
        key: "title",
        value: trimmedValue,
      });
      setOriginalTitle(trimmedValue);
    }
  };

  // Handle Enter key to save
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      ev.target.blur();
    }
  };

  // Handle focus - show color indicator and store original value
  const handleTitleFocus = () => {
    setIsTitleFocused(true);
    setOriginalTitle(group.title);
  };

  // Handle blur - save changes and hide color indicator
  const handleTitleBlur = (ev) => {
    setIsTitleFocused(false);
    setIsColorModalOpen(false); // Close color modal when losing focus
    handleTitleSave(ev.target.innerText);
  };

  // Handle color selection
  const handleColorSelect = (color) => {
    setIsColorModalOpen(false);
    onUpdateGroup(group.id, {
      key: "style",
      value: { color: color },
    });
  };

  // Handle three dots menu
  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsGroupMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleDeleteGroup = () => {
    setIsGroupMenuOpen(false);
    // TODO: Implement delete functionality
    console.log("Delete group");
  };

  // Menu item handlers (placeholders)
  const handleRenameGroup = () => {
    setIsGroupMenuOpen(false);
    // TODO: Implement rename functionality
    console.log("Rename group");
  };

  const handleDuplicateGroup = () => {
    setIsGroupMenuOpen(false);
    // TODO: Implement duplicate functionality
    console.log("Duplicate group");
  };

  const handleMoveGroup = () => {
    setIsGroupMenuOpen(false);
    // TODO: Implement move functionality
    console.log("Move group");
  };

  return (
    <div
      className="group-header-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="group-header-items">
        <div className="three-dots-container">
          <div
            className={`three-dots-button ${isHovered ? "visible" : ""}`}
            onClick={handleMenuClick}
            ref={buttonRef}
          >
            <EllipsisHorizontalIcon
              style={{
                width: "24px",
                height: "16px",
                color: "#323338",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div
          className="arrow-toggle"
          onClick={onToggleExpanded}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          {isExpanded ? (
            <ChevronDownIcon
              style={{
                width: "16px",
                height: "16px",
                color: group.style.color,
              }}
            />
          ) : (
            <ChevronRightIcon
              style={{
                width: "16px",
                height: "16px",
                color: group.style.color,
              }}
            />
          )}
        </div>
        <div className={`group-title-input ${isTitleFocused ? "focused" : ""}`}>
          {isTitleFocused && (
            <div
              className="color-indicator-input"
              style={{ backgroundColor: group.style.color }}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent focus loss
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsColorModalOpen(!isColorModalOpen);
              }}
            ></div>
          )}
          <span
            suppressContentEditableWarning
            contentEditable
            onFocus={handleTitleFocus}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            className="group-title-text"
            style={{ color: group.style.color }}
          >
            {group.title}
          </span>
        </div>

        {isHovered && <TaskCount taskCount={taskCount} />}
      </div>

      {isColorModalOpen && (
        <div className="color-list">
          {colors.map((color, index) => (
            <div
              key={index}
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent focus loss
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleColorSelect(color);
              }}
              className="color-indicator"
              style={{ "background-color": color }}
            ></div>
          ))}
        </div>
      )}

      {isGroupMenuOpen && (
        <GroupMenu
          group={group}
          ref={menuRef}
          onRenameGroup={handleRenameGroup}
          onDuplicateGroup={handleDuplicateGroup}
          onMoveGroup={handleMoveGroup}
          onDeleteGroup={onDeleteGroup}
        />
      )}
    </div>
  );
}
