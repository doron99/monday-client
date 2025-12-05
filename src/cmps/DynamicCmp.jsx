import { DateEl } from "./dynamicCmps/DateEl";
import { Member } from "./dynamicCmps/Member";
import { Priority } from "./dynamicCmps/Priority";
import { Side } from "./dynamicCmps/Side";
import { Status } from "./dynamicCmps/Status";
import { TaskTitle } from "./dynamicCmps/TaskTitle";


export const DynamicCmp = ({ cmpType, info, onTaskUpdate,content, selectedTasks, taskId,commentsLength }) => {

  switch (cmpType) {
    case "side":
      return (
        <Side
          info={info}
          taskId={taskId}
          selectedTasks={selectedTasks}
          onTaskUpdate={onTaskUpdate}
        />
      );
    case "priority":
      return <Priority info={info} content={{...content,priority:info}} taskId={taskId} onTaskUpdate={onTaskUpdate} />;
    case "taskTitle":
      return <TaskTitle info={info} onTaskUpdate={onTaskUpdate} taskId={taskId} commentsLength={commentsLength}/>;
    case "status":
      return <Status info={info} content={{...content,status:info}} taskId={taskId} onTaskUpdate={onTaskUpdate} />;
    case "members":
      return <Member info={info} content={{...content,members:info}} taskId={taskId} onTaskUpdate={onTaskUpdate} />;
    case "date":
      return <DateEl info={info} content={{...content,strSelectedDate:info}} taskId={taskId} onTaskUpdate={onTaskUpdate} />;
    case "Files":
      return null
    default:
      console.error(`Unknown component type: ${cmpType}`);
      return <div>Unknown component: {cmpType}</div>;
  }
};
