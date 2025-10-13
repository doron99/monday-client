
export function Status({ onTaskUpdate }) {
  return <span onClick={() => onTaskUpdate("status update")}>status</span>;
}
