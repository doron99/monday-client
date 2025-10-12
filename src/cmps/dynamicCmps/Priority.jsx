import { useState } from "react";

export function Priority({ info, onTaskUpdate }) {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const boardPriority = ["LOW", "MEDIUM", "HIGH"];

  function openUpdateModal() {
    // console.log("update modal");
    setIsModalOpen(true);
  }

  function updateTask(value) {
    onTaskUpdate({ key: "status", value });
  }
  return (
    <div className="task-priority">
      <span onClick={openUpdateModal}>{info}</span>
      {ismodalOpen && (
        <div className="priority-modal">
          {boardPriority.map((p) => (
            <div onClick={() => updateTask(p)}>{p}</div>
          ))}
        </div>
      )}
    </div>
  );
};

