import { useState } from "react";
import { PopperContentTask } from "./PopperContentTask";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export function AddTaskMenu({ onAddTask, onAddGroup }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="add-task-wrapper">
      <button
        className="add-task-button"
        onClick={() => onAddTask()}
      >
        New Task
      </button>

      <div
        className="add-task-arrow"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ChevronDownIcon className="add-task-icon" />
      </div>

      {isOpen && (
        <div className="add-task-popper">
          <PopperContentTask
            onAddTask={() => { onAddTask(); setIsOpen(false); }}
            onAddGroup={() => { onAddGroup(); setIsOpen(false); }}
          />
        </div>
      )}
    </div>
  );
}