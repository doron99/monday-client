import { useState, useEffect, useRef } from "react";
import { TaskCount } from "./TaskCount.jsx";
import { GroupMenu } from "./GroupMenu.jsx";
import { MoveGroupToBoardModal } from "./MoveGroupToBoardModal.jsx";

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
  onDeleteGroup,
  currentBoardId,
  onMoveGroup,
  onDuplicateGroup,
  dragListeners,
  dragAttributes
}) {
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [originalTitle, setOriginalTitle] = useState(group.title);
  const [isGroupMenuOpen, setIsGroupMenuOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const titleRef = useRef(null);

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

    if (trimmedValue !== originalTitle && trimmedValue !== "") {
      onUpdateGroup(group.id, {
        key: "title",
        value: trimmedValue,
      });
      setOriginalTitle(trimmedValue);
    }
  };

  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      ev.target.blur();
    }
  };

  const handleTitleFocus = () => {
    setIsTitleFocused(true);
    setOriginalTitle(group.title);
  };

  const handleTitleBlur = (ev) => {
    setIsTitleFocused(false);
    setIsColorModalOpen(false);
    handleTitleSave(ev.target.innerText);
  };

  const handleColorSelect = (color) => {
    setIsColorModalOpen(false);
    onUpdateGroup(group.id, {
      key: "style",
      value: { color: color },
    });
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsGroupMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  function handleDeleteGroup(groupId) {
    setIsGroupMenuOpen(false);
    onDeleteGroup(groupId);
  }

  const handleRenameGroup = () => {
    setIsGroupMenuOpen(false);
    if (titleRef.current) {
      titleRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(titleRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleDuplicateGroup = () => {
    setIsGroupMenuOpen(false);
    if (onDuplicateGroup) {
      onDuplicateGroup(group.id);
    }
  };

  const handleMoveGroup = () => {
    setIsGroupMenuOpen(false);
    setIsMoveModalOpen(true);
  };

  const handleMoveGroupToBoard = (targetBoardId) => {
    if (onMoveGroup) {
      onMoveGroup(group.id, targetBoardId);
    }
    setIsMoveModalOpen(false);
  };

return (
  <div
    className="group-header-container"
    {...(!isTitleFocused ? dragListeners : {})}
    {...(!isTitleFocused ? dragAttributes : {})}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{
      cursor: isTitleFocused ? "text" : "grab"
    }}
  >
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
      onMouseDown={(e) => e.stopPropagation()}
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
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsColorModalOpen(!isColorModalOpen);
          }}
        ></div>
      )}

      <span
        ref={titleRef}
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

    {isColorModalOpen && (
      <div className="color-list">
        {colors.map((color, index) => (
          <div
            key={index}
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleColorSelect(color);
            }}
            className="color-indicator"
            style={{ backgroundColor: color }}
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
        onDeleteGroup={handleDeleteGroup}
      />
    )}

    {isMoveModalOpen && (
      <MoveGroupToBoardModal
        group={group}
        currentBoardId={currentBoardId}
        onClose={() => setIsMoveModalOpen(false)}
        onMove={handleMoveGroupToBoard}
      />
    )}
  </div>
);

}