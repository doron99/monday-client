import React, { useState, useEffect } from 'react';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useParams, Outlet } from "react-router";

export function TaskTitle({ info, onTaskUpdate,taskId }) {
  // Local state to manage input value
  const [inputValue, setInputValue] = useState(info);
  const [prevValue, setPrevValue] = useState(info); // Track the previous value
  const navigate = useNavigate();
  const {boardId} = useParams();
  const handleNavigateToTask = () => {
      navigate(`/board/${boardId}/task/${taskId}`);
  };
  // Effect to update the inputValue when info changes
  useEffect(() => {
    setInputValue(info);
    setPrevValue(info); // Update previous value when info changes
  }, [info]);

  // Handle input value changes
  const handleChange = (ev) => {
    setInputValue(ev.target.value); // Update local state
  };

  // Handle when the input loses focus
  const handleBlur = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== prevValue) { // Check if the value has changed
      onTaskUpdate({ key: "taskTitle", value: trimmedValue });
      setPrevValue(trimmedValue); // Update the previous value after the update
    }
  };

  return (
    <>
    <input
      className='task-title'
      type="text"
      value={inputValue} // Controlled input
      onChange={handleChange} // Update state as user types
      onBlur={handleBlur} // Call update function on blur
      placeholder="Add new..." // Optional placeholder text
      style={{
        width: '200px', // Adjust width as needed
        border: '1px solid gray', // Optional: add border styling
        padding: '5px', // Optional: add padding
      }}
    />
    <HiOutlineChatBubbleOvalLeftEllipsis onClick={() => handleNavigateToTask()} style={{width:'1.4rem',height:'1.4rem'}}/> 
    </>
  );
}
