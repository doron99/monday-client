import { useState, useEffect } from "react";

export function Side({ onTaskUpdate, selectedTasks, taskId }) {
  // Check if the current task is in the selected tasks array (which contains objects)
  const isTaskSelected = selectedTasks ? selectedTasks.some(selectedTask => selectedTask.taskId === taskId) : false;
  const [isChecked, setIsChecked] = useState(isTaskSelected);

  // Update checkbox state when selectedTasks changes
  useEffect(() => {
    const newIsSelected = selectedTasks ? selectedTasks.some(selectedTask => selectedTask.taskId === taskId) : false;
    setIsChecked(newIsSelected);
  }, [selectedTasks, taskId]);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
    onTaskUpdate({ key: "side", value: !isChecked }); // Delegate state update to parent
  }

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};
