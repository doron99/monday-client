
import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { updateBoard } from "../../store/actions/board.actions";

export const PopperContentDate = ({ content, onSelect, onClose }) => {

  console.log('PopperContentDate content', content);
  const [selectedDate, setSelectedDate] = useState(new Date(content.strSelectedDate));

  // useEffect(() => {
  //   // Update selectedDate whenever strSelectedDate changes
  //   if (strSelectedDate) {
  //       setSelectedDate(new Date(content.strSelectedDate));
  //   }
  // }, [strSelectedDate]);


  const handleDaySelect = (e) => {
    //console.log('handleDaySelect',e,content.groupId, content.taskId, { key:'date', value:formatDate(e) });
    updateBoard(content.groupId, content.taskId, { key:'date', value:formatDate(e) });
    onClose();
    //onSelect(formatDate(e));
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, '0');// + 1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="">
      <DayPicker
        animate
        mode="single"
        selected={selectedDate}
        onSelect={handleDaySelect}
        footer={
          selectedDate 
            ? `Selected: ${selectedDate.toLocaleDateString()}`
            : "Pick a day."
        }
      />
      <button onClick={onClose}>Close</button>
    </div>
  );
};
