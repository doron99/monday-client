import { GroupHeader } from "./GroupHeader";
import { Date } from "./dynamicCmps/Date.jsx";
import { Member } from "./dynamicCmps/Member.jsx";
import { Side } from "./dynamicCmps/Side.jsx";
import { Status } from "./dynamicCmps/Status.jsx";
import { TaskTitle } from "./dynamicCmps/TaskTitle.jsx";
import { Priority } from "./dynamicCmps/Priority.jsx";
import { useState } from "react";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { TaskCount } from './TaskCount.jsx';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { DraggableCmpHeader } from "./DraggableCmpHeader";

export function GroupPreview({
  labels,
  group,
  cmpOrder,
  progress,
  updateBoard,
  toggleSelectedTask,
  selectedTasks,
}) {


  const [isExpanded, setIsExpanded] = useState(true);

  // dnd-kit sensors for handling different input types
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log('handleDragEnd active',active, 'over',over)
    const oldIndex = cmpOrder.indexOf(active.id);
    const newIndex = cmpOrder.indexOf(over.id);
    console.log('oldIndex',oldIndex, 'newIndex',newIndex)
    arrayMove(items, oldIndex, newIndex)
    if (active.id !== over.id) {
      setCmpOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
 
  function onTaskUpdate(taskId, updatedInfo) {
    console.log('onTaskUpdate func -> taskId, updatedInfo',taskId, updatedInfo)
    if (updatedInfo.key === "side") {
      toggleSelectedTask(group.id, taskId);
    }
    if (updatedInfo.key === "priority" 
      || updatedInfo.key === "status" 
      || updatedInfo.key === "date"
      || updatedInfo.key === "title"
      || updatedInfo.key === "members" 
      || updatedInfo.key === "taskTitle") {
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

  function deleteGroup(groupId){
    console.log(groupId);
  }

  const progressComponents = ["date", "priority", "status"];
  return (
    <section>
      {isExpanded ? (
        <GroupHeader 
          group={group}
          isExpanded={isExpanded}
          onToggleExpanded={() => setIsExpanded(!isExpanded)}
          onUpdateGroup={updateGroup}
          onDeleteGroup={deleteGroup}
        />
      ) : (
        <section 
          className="group-preview-collapsed"
          style={{borderLeft: `4px solid ${group.style.color}`}}
          onClick={() => setIsExpanded(true)}>
          <div className="collapsed-content">
            <div className="collapsed-left-section">
              <div 
                className="arrow-toggle" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(true);
                }}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <ChevronRightIcon style={{ width: '16px', height: '16px', color: group.style.color }} />
              </div>
              <div className="collapsed-group-info">
                <span className="collapsed-group-title" style={{color: group.style.color}}>
                  {group.title}
                </span>
                <TaskCount taskCount={group.tasks.length} />
              </div>
            </div>
            <div className="collapsed-headers">
              {cmpOrder.slice(1).map((cmpName, index) => (
                <div key={cmpName} className="collapsed-header-item">
                  {labels[index + 1] || cmpName}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      {isExpanded && (
        <section 
          className="group-preview"
          style={{borderLeft: `4px solid ${group.style.color}`}}>
        {/* Wrap the component and its children with DndContext */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
        {/* Wrap the headers with SortableContext */}
        <SortableContext items={cmpOrder} strategy={horizontalListSortingStrategy}>
          <section className="labels-grid">
            {cmpOrder.map((cmpName, index) => (
              <DraggableCmpHeader key={cmpName} id={cmpName}>
                {labels[index] || cmpName}
              </DraggableCmpHeader>
            ))}
          </section>
        </SortableContext>

        {/* Render tasks based on the current cmpOrder */}
        {group.tasks.map((task) => (
          <section className="group grid" key={`task-${task.id}`}>
            {cmpOrder.map((cmp, idx) => (
              <section
                className={`grid-item ${cmp}`}
                key={`task-${task.id}-cmp-${idx}`}
              >
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
        {/* ####-----------add new task-------------######### */}
        <section className="group grid" key={`task-${999}`}>
            <section
                className={`grid-item ${999}`}
                key={`task-${999}-cmp-${999}`}
              >
                <DynamicCmp
                  cmpType={'taskTitle'}
                  info={''}
                  selectedTasks={null}
                  taskId={null}
                  onTaskUpdate={(updateInfo) =>
                    onTaskUpdate('t999newTask', updateInfo)
                  }
                />
              </section>
            {/* {cmpOrder.map((cmp, idx) => (
              <section
                className={`grid-item ${cmp}`}
                key={`task-${999}-cmp-${999}`}
              >
                <DynamicCmp
                  cmpType={'taskTitle'}
                  info={''}
                  selectedTasks={null}
                  taskId={null}
                  onTaskUpdate={(updateInfo) =>
                    onTaskUpdate(task.id, updateInfo)
                  }
                />
              </section>
            ))} */}
          </section>

        {/* Render progress based on the current cmpOrder */}
        <section className="progress-grid">
          {cmpOrder.map((cmp, index) =>
            // Assuming `progressComponents` is a predefined array
            progressComponents.includes(cmp) ? (
              <div className={`with-${cmp}`} key={`progress-${index}`}>
                {progress[index]}
              </div>
            ) : (
              <div className={cmp} key={`progress-${index}`}></div>
            )
          )}
        </section>
      </DndContext>
    </section>
      )}
      
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
//backup code:
{/* <section className="group-preview">
        {/* Render group labels by labels array *}
        <section className="labels-grid">
          {cmpOrder.map((cmp, index) => (
            <div key={`label-${index}`}>{labels[index] || ""}</div>
          ))}
        </section>
        
        {/* Render tasks by cmp orderonClick={(e) => {contextMenuHandler.handleOnContextMenu(e,'asd');}}*
        {group.tasks.map((task) => (
          <section className="group grid" key={`task-${task.id}`}>
            {cmpOrder.map((cmp, idx) => (
              <section
                 
                className={`grid-item ${cmp}`}
                key={`task-${task.id}-cmp-${idx}`}
              >
                 /*<span style={{color:'red',fontSize:'0.8rem'}}>{JSON.stringify(cmp,null,2)},{JSON.stringify(task[cmp],null,2)}</span> *
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

         Render progress by progress array *
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
      </section> */}