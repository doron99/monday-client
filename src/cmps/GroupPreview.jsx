import { Date } from "./dynamicCmps/Date.jsx";
import { Member } from "./dynamicCmps/Member.jsx";
import { Side } from "./dynamicCmps/Side.jsx";
import { Status } from "./dynamicCmps/Status.jsx";
import { TaskTitle } from "./dynamicCmps/TaskTitle.jsx";
import { Priority } from "./dynamicCmps/Priority.jsx";
import { useState, useEffect, useRef } from "react";
import {eventBusService,openContextMenu} from '../services/event-bus.service.js'
import { ContextMenuStatus } from "./contextMenuCmps/ContextMenuStatus.jsx";
import { boardService } from "../services/board.service.js";
export function GroupPreview({
  labels,
  group,
  cmpOrder,
  progress,
  updateBoard,
  toggleSelectedTask,
  selectedTasks,
}) {


  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const colors = [
    "#008000",
    "#00CC66",
    "#A4D700",
    "#D4BF00",
    "#FFD700",
    "#800080",
    "#BA55D3",
    "#4682B4",
    "#00BFFF",
    "#DC143C",
    "#FF4500",
    "#FF69B4",
    "#FFA500",
    "#F08080",
    "#A52A2A",
    "#C0C0C0",
    "#808080",
    "#FF6347",
  ];
  useEffect(() => {
      const unsubscribe = eventBusService.on('on-context-menu-select', (msg) => {
          console.log('msg',msg)
          
      })
      return unsubscribe
  }, [])
  function onTaskUpdate(taskId, updatedInfo) {
    console.log('onTaskUpdate func -> taskId, updatedInfo',taskId, updatedInfo)
    if (updatedInfo.key === "side") {
      toggleSelectedTask(group.id, taskId);
    }
    if (updatedInfo.key === "priority" || updatedInfo.key === "status") {
      if (!updatedInfo.value) return;
      updateBoard(group.id, taskId, { key:updatedInfo.key, value:updatedInfo.value });
      console.log('',group.id,taskId,updatedInfo)
    }
  }

  function updateGroup(groupId, updatedInfo) {
    console.log(groupId, updatedInfo);
    updateBoard(groupId, null, updatedInfo);

    console.log("board updated");
  }

  const progressComponents = ["date", "priority", "status"];
  return (
    <section>
      <div className="group-header">
        <div
          className="color-indicator"
          style={{ backgroundColor: group.style.color }}
          onClick={() => setIsColorModalOpen(!isColorModalOpen)}
        ></div>
        <span
          suppressContentEditableWarning
          contentEditable
          onBlur={(ev) =>
            updateGroup(group.id, { key: "title", value: ev.target.innerText })
          }
          className="group-title"
        >
          {group.title}
        </span>

        {isColorModalOpen && (
          <div className="color-list">
            {colors.map((color) => (
              <div
                onClick={() => {
                  setIsColorModalOpen(!isColorModalOpen);
                  updateGroup(group.id, {
                    key: "style",
                    value: { color: color },
                  });
                }}
                className="color-indicator"
                style={{ "background-color": color }}
              ></div>
            ))}
          </div>
        )}
      </div>

      <section className="group-preview">
        {/* Render group labels by labels array */}
        <section className="labels-grid">
          {cmpOrder.map((cmp, index) => (
            <div key={`label-${index}`}>{labels[index] || ""}</div>
          ))}
        </section>

        {/* Render tasks by cmp orderonClick={(e) => {contextMenuHandler.handleOnContextMenu(e,'asd');}}*/}
        {group.tasks.map((task) => (
          <section className="group grid" key={`task-${task.id}`}>
            {cmpOrder.map((cmp, idx) => (
              <section
                 
                className={`grid-item ${cmp}`}
                key={`task-${task.id}-cmp-${idx}`}
              >
                {/* <span style={{color:'red',fontSize:'0.8rem'}}>{JSON.stringify(cmp,null,2)},{JSON.stringify(task[cmp],null,2)}</span> */}
                <DynamicCmp
                  cmpType={cmp}
                  info={task[cmp]}
                  selectedTasks={selectedTasks}
                  taskId={task.id}
                  onTaskUpdate={(updateInfo) =>
                    onTaskUpdate(task.id, updateInfo)
                  }
                />
              </section>
            ))}
          </section>
        ))}

        {/* Render progress by progress array */}
        <section className="progress-grid">
          {cmpOrder.map((cmp, index) =>
            progressComponents.includes(cmp) ? (
              <div className={`with-${cmp}`} key={`progress-${index}`}>
                {progress[index]}
              </div>
            ) : (
              <div className={cmp} key={`progress-${index} `}></div>
            )
          )}
        </section>
      </section>
      
    </section>
  );
}

const DynamicCmp = ({ cmpType, info, onTaskUpdate, selectedTasks, taskId }) => {

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
      return <Priority info={info} onTaskUpdate={onTaskUpdate} />;
    case "taskTitle":
      return <TaskTitle info={info} onTaskUpdate={onTaskUpdate} />;
    case "status":
      return <Status info={info} onTaskUpdate={onTaskUpdate} />;
    case "members":
      return <Member info={info} onTaskUpdate={onTaskUpdate} />;
    case "date":
      return <Date info={info} onTaskUpdate={onTaskUpdate} />;
    default:
      console.error(`Unknown component type: ${cmpType}`);
      return <div>Unknown component: {cmpType}</div>;
  }
};
