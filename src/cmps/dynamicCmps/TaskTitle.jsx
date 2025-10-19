import React, { useState, useEffect } from 'react';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useParams, Outlet } from "react-router";
import { useSelector } from 'react-redux';
import { useEffectUpdate } from '../customHooks/useEffectUpdate';
import { LuMessageCircle, LuMessageCirclePlus } from 'react-icons/lu';

export function TaskTitle({ info, onTaskUpdate,taskId,commentsLength }) {
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
    setInputValue(ev.target.value);//textContent); // Update local state
  };

  // Handle when the input loses focus
  const handleBlur = () => {
    console.log('handleBlur',inputValue,'prevValue',prevValue,'info',info ? info : 'no info')
    const trimmedValue = inputValue;//inputValue.trim();
    if (trimmedValue !== prevValue) { // Check if the value has changed
      if (trimmedValue == ''){
        return;
      }
      onTaskUpdate({ key: "taskTitle", value: trimmedValue });
      setPrevValue(trimmedValue); // Update the previous value after the update
      // If this was a newly-added empty prev value (adding new item), clear the input
      if (!prevValue || !info) {
        setInputValue('')
      }
    }
  };
  const handleKeyDown = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      ev.target.blur();
    }
  };
 

  return (
    <>
    <input
      className='task-title'
      type="text"
      value={inputValue} // Controlled input
      onChange={(ev) => handleChange(ev)} // Update state as user types
      onBlur={(ev) => handleBlur(ev)} // Call update function on blur
      onKeyDown={(ev) => handleKeyDown(ev)}

      placeholder="Add new..." // Optional placeholder text
      style={{
        width: '200px', // Adjust width as needed
        border: '1px solid gray', // Optional: add border styling
        padding: '5px', // Optional: add padding
      }}
    />
    {/* <span
        className="task-title "
        suppressContentEditableWarning
        contentEditable
        onBlur={(ev) => handleBlur(ev)} // Call update function on blur
        onInput={(ev) => handleChange(ev)} // Update state as user types
        style={{
            width: '200px', // This may not work as expected on span
            border: '1px solid gray', // Optional: add border styling
            padding: '5px', // Optional: add padding
            display: 'inline-block', // Ensures the width and height are respected
        }}
    >
        {info} 
    </span> */}

    {taskId &&<div className='task-details-link' onClick={() => handleNavigateToTask()} 
    >
      {commentsLength > 0 
      ? <div style={{display:'flex',marginLeft:'15px'}}><LuMessageCircle 
          style={styles.buttonWithComments} />
          <span className=''>{commentsLength}</span>
        </div>
      : <div style={{display:'flex',marginLeft:'15px'}}><LuMessageCirclePlus style={styles.buttonWithoutComments} /></div>
      }
 
      </div>}
    </>
  );
}
const styles = {
  buttonWithComments:{width:'1.6rem',height:'1.6rem',color: '#0073ea'},
  buttonWithoutComments:{width:'1.4rem',height:'1.4rem',color: '#black'},
}
