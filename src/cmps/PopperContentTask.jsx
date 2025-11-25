import { PlusIcon, RectangleStackIcon } from "@heroicons/react/24/outline";

export function PopperContentTask({ onAddTask, onAddGroup }) {
  return (
    <div className="popper-task-content">
      <div className="popper-item" onClick={onAddTask}>
        <PlusIcon className="popper-item-icon" />
        <span>New Task</span>
      </div>
      <div className="popper-item" onClick={onAddGroup}>
        <RectangleStackIcon className="popper-item-icon" />
        <span>New group of tasks</span>
      </div>
    </div>
  );
}