
import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export const PopperContentDate = ({ strSelectedDate, onSelect, onClose }) => {

  //console.log('strSelectedDate', strSelectedDate);
  const [selectedDate, setSelectedDate] = useState(new Date(strSelectedDate));

  useEffect(() => {
    // Update selectedDate whenever strSelectedDate changes
    if (strSelectedDate) {
        setSelectedDate(new Date(strSelectedDate));
    }
  }, [strSelectedDate]);


  const handleDaySelect = (e) => {
    console.log(e);
    onSelect(formatDate(e));
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
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
