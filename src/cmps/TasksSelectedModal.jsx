import {
  DocumentDuplicateIcon,
  ArrowUpTrayIcon,
  ArchiveBoxIcon,
  TrashIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function TasksSelectedModal({ selectedCount = 1, onClose, onAction }) {
  const handleAction = (actionType) => {
    if (onAction) {
      onAction(actionType);
    }
  };

  return (
    <div className="task-selected-modal">
      <div className="task-selected-modal-content">
        <div className="task-selected-info">
          <div className="task-count-indicator">{selectedCount}</div>
          <span className="task-selected-text">
            Task{selectedCount > 1 ? "s" : ""} selected
          </span>
        </div>

        <div className="task-actions">
          <button
            className="task-action-btn"
            onClick={() => handleAction("duplicate")}
          >
            <DocumentDuplicateIcon />
            <span>Duplicate</span>
          </button>

          <button
            className="task-action-btn"
            onClick={() => handleAction("export")}
          >
            <ArrowUpTrayIcon />
            <span>Export</span>
          </button>

          <button
            className="task-action-btn"
            onClick={() => handleAction("archive")}
          >
            <ArchiveBoxIcon />
            <span>Archive</span>
          </button>

          <button
            className="task-action-btn"
            onClick={() => handleAction("delete")}
          >
            <TrashIcon />
            <span>Delete</span>
          </button>

          <button
            className="task-action-btn"
            onClick={() => handleAction("move")}
          >
            <ArrowRightIcon />
            <span>Move to</span>
          </button>
        </div>
      </div>

      <button className="modal-close-btn" onClick={onClose}>
        <XMarkIcon />
      </button>
    </div>
  );
}
