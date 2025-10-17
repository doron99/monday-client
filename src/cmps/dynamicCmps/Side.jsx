import { useState, useEffect } from "react";
// import { useEffect } from "react/cjs/react.production.min";

export function Side({ onTaskUpdate, selectedTasks, taskId }) {
  // Memoized value: Checks if the current task is in the selected tasks
  const [isChecked, setIsChecked] = useState(selectedTasks.includes(taskId));

  useEffect(() => {
    //console.log(taskId);
  }, []);

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
