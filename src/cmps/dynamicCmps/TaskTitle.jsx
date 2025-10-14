// export function TaskTitle({ info, onTaskUpdate }) {
//   function updateTaskTitle(ev) {
//     console.log(ev.target.innerHTML, info);

//     onTaskUpdate({ key: "taskTitle", value: ev.target.innerText });
//   }

//   return (
//     <span
//       suppressContentEditableWarning
//       contentEditable
//       onBlur={(ev) => updateTaskTitle(ev)}
//     >
//       {info}
//     </span>
//   );
// };
import React, { useState, useEffect } from 'react';

export function TaskTitle({ info, onTaskUpdate }) {
  // Local state to manage input value
  const [inputValue, setInputValue] = useState(info);
function updateTaskTitle(ev) {
  onTaskUpdate({ key: 'taskTitle', value: ev.target.value });
  // console.log(ev.target.innerHTML, info);
}
  // Effect to update the inputValue when info changes
  useEffect(() => {
    setInputValue(info);
  }, [info]);

  // Handle input value changes
  const handleChange = (ev) => {
    setInputValue(ev.target.value); // Update local state
  };

  // Handle when the input loses focus
  const handleBlur = () => {
    onTaskUpdate({ key: "taskTitle", value: inputValue.trim() });
  };

  return (
    <input
      type="text"
      value={inputValue} // Controlled input
      onChange={handleChange} // Update state as user types
      onBlur={(ev) => updateTaskTitle(ev)} // Call update function on blur
      placeholder="Add new..." // Optional placeholder text
      style={{
        width: '200px', // Adjust width as needed
        border: '1px solid gray', // Optional: add border styling
        padding: '5px', // Optional: add padding
      }}
    />
  );
}
