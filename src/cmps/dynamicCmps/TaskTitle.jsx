export function TaskTitle({ info, onTaskUpdate }) {
  function updateTaskTitle(ev) {
    onTaskUpdate({ key: "title", value: ev.target.innerText });
    // console.log(ev.target.innerHTML, info);
  }

  return (
    <span
      suppressContentEditableWarning
      contentEditable
      onBlur={(ev) => updateTaskTitle(ev)}
    >
      {info}
    </span>
  );
};

