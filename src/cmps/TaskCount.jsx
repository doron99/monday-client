export function TaskCount({ taskCount }) {
    return (
    <span className="task-count">
      {taskCount === 0
        ? "No Tasks"
        : `${taskCount} Task${taskCount !== 1 ? "s" : ""}`}
    </span>
  );
}
