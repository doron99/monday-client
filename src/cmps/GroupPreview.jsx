import { GroupHeader } from "./GroupHeader";
import { DateEl } from "./dynamicCmps/DateEl.jsx";
import { Member } from "./dynamicCmps/Member.jsx";
import { Side } from "./dynamicCmps/Side.jsx";
import { Status } from "./dynamicCmps/Status.jsx";
import { TaskTitle } from "./dynamicCmps/TaskTitle.jsx";
import { Priority } from "./dynamicCmps/Priority.jsx";
import { useEffect, useState } from "react";
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { TaskCount } from './TaskCount.jsx';
import { updateBoard } from '../store/actions/board.actions.js';
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
import { utilService } from "../services/util.service.js";
import { eventBusService } from "../services/event-bus.service.js";
// import { DraggableTask } from "./DraggableTask.jsx";

export function GroupPreview({
  labels,
  group,
  cmpOrder,
  progress,
  toggleSelectedTask,
  selectedTasks,
  board //needed it to access the tasks list
}) {


  const [isExpanded, setIsExpanded] = useState(true);

  // dnd-kit sensors for handling different input types
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );
  useEffect(() => {
      const unsubscribe = eventBusService.on('onPopperSelect', ({content,val}) => {
        onTaskUpdate(content.taskId,val)
      })
      return unsubscribe
  }, [])

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log('handleDragEnd active',active, 'over',over)
    const oldIndex = cmpOrder.indexOf(active.id);
    const newIndex = cmpOrder.indexOf(over.id);
    console.log('oldIndex',oldIndex, 'newIndex',newIndex)


    if (oldIndex !== -1 && newIndex !== -1 && active.id !== over.id) {
        // Create a new array to avoid mutating the state directly
        const newOrder = [...cmpOrder]; // Copy the current order

        // Remove the item from the old index
        const [movedItem] = newOrder.splice(oldIndex, 1); 

        // Insert the item at the new index
        newOrder.splice(newIndex, 0, movedItem);
        console.log('newOrder',newOrder)
        updateBoard(null, null , { key:'cmpOrder', value:newOrder });

        // Update your state (assuming you're using a state updater function)
        //setCmpOrder(newOrder);

        // Log the new array
        console.log('Updated Order:', newOrder);

    }


    // arrayMove(items, oldIndex, newIndex)
    // if (active.id !== over.id) {
    //   //cmpOrder
    //   // setCmpOrder((items) => {
    //   //   const oldIndex = items.indexOf(active.id);
    //   //   const newIndex = items.indexOf(over.id);
    //   //   return arrayMove(items, oldIndex, newIndex);
    //   // });
    // }
  };
 
  function onTaskUpdate(taskId, updatedInfo) {
    console.log('onTaskUpdate func -> taskId, updatedInfo',taskId, updatedInfo)
    if (updatedInfo.key === "side") {
      toggleSelectedTask(group.id, taskId);
    }
    if (taskId == 'newTask') {

      const newTask = {
          "id": utilService.makeId(),
          "side": "right",
          "taskTitle": updatedInfo.value,
          "status": "Not started",
          "priority": "Low",
          "members": [],
          "date": null,
          "comments":[]
        };
      const taskArr = [...board.groups.find(g => g.id === group.id).tasks, newTask];
      updateBoard(group.id, null, {key: 'tasks', value: taskArr});
      //updateBoard(group.id, taskId, { key:updatedInfo.key, value:updatedInfo.value });

      return;
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
    let updatedGroups = board.groups.filter(group => group.id !== groupId);
    updateBoard(null, null, {key: 'groups', value: updatedGroups});
    console.log('deleteGroup in GroupPreview' + groupId);
  }

const gridItemStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(0, 200, 117)',  // Background color
        cursor: 'pointer',  // Change cursor to pointer
        padding: '10px',
        borderRadius: '4px', // Optional: rounded corners
        color: 'white',  // Text color
        height: '100px', // Set a fixed height for the grid item
        width: '100%', // Full width
    };
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
                        {/* {JSON.stringify(cmpOrder,null,2)} */}

            {cmpOrder.map((cmpName, index) => (
              <DraggableCmpHeader key={cmpName} id={cmpName}>
                {index > 0 ? labels[index] || cmpName : ''}
              </DraggableCmpHeader>
            ))}
          </section>
        </SortableContext>
    {/* <DndContext onDragEnd={handleDragEnd1}>
      {group.tasks.map(task => (
        <DraggableTask key={task.id} task={task} cmpOrder={cmpOrder} onTaskUpdate={onTaskUpdate} selectedTasks={selectedTasks} />
      ))}
    </DndContext> */}
        {/* Render tasks based on the current cmpOrder */}
        {group.tasks.map((task) => (
          <section className="group grid" key={`task-${task.id}`}>
            {/* //group.tasks[task.id].comments.length */}
                {/* <pre>{JSON.stringify(group.tasks.find(t => t.id == task.id).comments.length,null,2)}</pre> */}
            {cmpOrder.map((cmp, idx) => (
              <section 
                className={`grid-item ${cmp}`}
                key={`task-${task.id}-cmp-${idx}`}
              >
                
                <DynamicCmp
                  commentsLength={group.tasks.find(t => t.id == task.id).comments.length}
                  cmpType={cmp}
                  info={task[cmp]}
                  selectedTasks={selectedTasks}
                  content={{groupId:group.id,taskId:task.id}}
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
            <section></section>
            <section
                className={`grid-item taskTitle`}
                key={`task-${999}-cmp-${999}`}
              >
                <DynamicCmp
                  cmpType={'taskTitle'}
                  info={''}
                  selectedTasks={null}
                  taskId={null}
                  onTaskUpdate={(updateInfo) =>
                    onTaskUpdate('newTask', updateInfo)
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

const DynamicCmp = ({ cmpType, info, onTaskUpdate,content, selectedTasks, taskId,commentsLength }) => {

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
    default:
      console.error(`Unknown component type: ${cmpType}`);
      return <div>Unknown component: {cmpType}</div>;
  }
};
