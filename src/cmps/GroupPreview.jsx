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
import { updateBoard, moveGroupToBoard, duplicateGroup } from '../store/actions/board.actions.js';
import { useSelector } from "react-redux";
import { MoveGroupToBoardModal } from "./MoveGroupToBoardModal";
import { boardService } from "../services/board.service.js";
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
  horizontalListSortingStrategy,verticalListSortingStrategy,
  arrayMove,useSortable 
} from "@dnd-kit/sortable";
import { DraggableCmpHeader } from "./DraggableCmpHeader";
import { utilService } from "../services/util.service.js";
import { eventBusService } from "../services/event-bus.service.js";
import { SummaryBar } from "./SummaryBar.jsx";
import { DraggableTask } from "./DraggableTask.jsx";
import { DynamicCmp } from "./DynamicCmp.jsx";

export function GroupPreview({
  labels,
  group,
  cmpOrder,
  progress,
  toggleSelectedTask,
  selectedTasks,
  board,
  dragListeners,
  dragAttributes
}) {


  const [isExpanded, setIsExpanded] = useState(true);
  const hiddenColumns = useSelector(state => state.boardModule.hiddenColumns);
  const [openGroupsBeforeDrag, setOpenGroupsBeforeDrag] = useState([]);
  const visibleCmpOrder = cmpOrder.filter(
  cmp => cmp === "side" || cmp === "taskTitle" || !hiddenColumns.includes(cmp)
);




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
  function handleDragEndRows(event) {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const oldIndex = group.tasks.findIndex(t => t.id === active.id);
  const newIndex = group.tasks.findIndex(t => t.id === over.id);

  const reordered = arrayMove(group.tasks, oldIndex, newIndex);
    console.log('reordered',reordered)
    console.log('group.id',group.id)

    updateBoard(group.id, null, {key: 'tasks', value: reordered});

  //onReorderTasks(reordered); // ×¤×•× ×§×¦×™×” ×©×œ×š ×©×ž×¢×“×›× ×ª state
}
 
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
          "comments":[],
          "isDeleted":false,
          "isArchived":false
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
  const progressComponents = ["priority", "status"];//"date", 

  function handleMoveGroup(groupId, targetBoardId) {
  moveGroupToBoard(groupId, targetBoardId)
    .then(() => {
      console.log('Group moved successfully to board:', targetBoardId);
    })
    .catch(err => {
      console.error('Failed to move group:', err);
    });
}

return (
  <section>
    {isExpanded ? (
      <DraggableCmpHeader id={group.id} disabled={isExpanded} align="left" >
        <GroupHeader 
          group={group}
          isExpanded={isExpanded}
          onToggleExpanded={() => setIsExpanded(!isExpanded)}
          onUpdateGroup={updateGroup}
          onDeleteGroup={deleteGroup}
          currentBoardId={board._id}
          onMoveGroup={handleMoveGroup}
          onDuplicateGroup={duplicateGroup}
          dragListeners={dragListeners}
          dragAttributes={dragAttributes}  
        />
      </DraggableCmpHeader>
    ) : (
      <section 
        className="group-preview-collapsed"
        style={{ borderLeft: `4px solid ${group.style.color}` }}
        onClick={() => setIsExpanded(true)}
      >
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
              <span className="collapsed-group-title" style={{ color: group.style.color }}>
                {group.title}
              </span>
              <TaskCount taskCount={group.tasks.length} />
            </div>
          </div>

          <div className="collapsed-headers">
            {visibleCmpOrder.slice(1).map((cmpName) => (
              <div key={cmpName} className="collapsed-header-item">
                {labels[cmpOrder.indexOf(cmpName)] || cmpName}
              </div>
            ))}
          </div>
        </div>
      </section>
    )}

    {isExpanded && (
      <section 
        className="group-preview"
        style={{ borderLeft: `4px solid ${group.style.color}` }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={visibleCmpOrder} strategy={horizontalListSortingStrategy}>
            <section className="labels-grid">
              {visibleCmpOrder.map((cmpName, index) => {
                if (index < 2) {
                  return (
                    <div key={cmpName} className="static-header">
                      {cmpName !== 'side' ? 'Task' : ''}
                    </div>
                  );
                }

                return (
                  <DraggableCmpHeader key={cmpName} id={cmpName}>
                    {labels[cmpOrder.indexOf(cmpName)] || cmpName}
                  </DraggableCmpHeader>
                );
              })}
            </section>
          </SortableContext>
        </DndContext>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEndRows}>
          <SortableContext
            items={group.tasks.filter(t => !t.isDeleted && !t.isArchived).map(t => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {group.tasks.filter(t => !t.isDeleted && !t.isArchived).map(task => (
              <DraggableTask
                key={task.id}
                task={task}
                cmpOrder={visibleCmpOrder}
                group={group}
                selectedTasks={selectedTasks}
                onTaskUpdate={onTaskUpdate}
              />
            ))}
          </SortableContext>
        </DndContext>

        <section
          className="group grid new-task"
          key={`task-${999}`}
          style={{ '--group-color': group.style.color }}
        >
          <section></section>
          <section className="grid-item taskTitle">
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
        </section>

        <section className="progress-grid">
          {visibleCmpOrder.map((cmp) =>
            progressComponents.includes(cmp) ? (
              <div className={`with-${cmp}`} key={`progress-${cmp}`}>
                <SummaryBar
                  tasks={group.tasks.filter(t => !t.isDeleted && !t.isArchived)}
                  cmp={cmp}
                />
              </div>
            ) : (
              <div className={cmp} key={`progress-${cmp}`}></div>
            )
          )}
        </section>
      </section>
    )}
  </section>
);

}

// const DynamicCmp = ({ cmpType, info, onTaskUpdate,content, selectedTasks, taskId,commentsLength }) => {

//   switch (cmpType) {
//     case "side":
//       return (
//         <Side
//           info={info}
//           taskId={taskId}
//           selectedTasks={selectedTasks}
//           onTaskUpdate={onTaskUpdate}
//         />
//       );
//     case "priority":
//       return <Priority info={info} content={{...content,priority:info}} taskId={taskId} onTaskUpdate={onTaskUpdate} />;
//     case "taskTitle":
//       return <TaskTitle info={info} onTaskUpdate={onTaskUpdate} taskId={taskId} commentsLength={commentsLength}/>;
//     case "status":
//       return <Status info={info} content={{...content,status:info}} taskId={taskId} onTaskUpdate={onTaskUpdate} />;
//     case "members":
//       return <Member info={info} content={{...content,members:info}} taskId={taskId} onTaskUpdate={onTaskUpdate} />;
//     case "date":
//       return <DateEl info={info} content={{...content,strSelectedDate:info}} taskId={taskId} onTaskUpdate={onTaskUpdate} />;
//     default:
//       console.error(`Unknown component type: ${cmpType}`);
//       return <div>Unknown component: {cmpType}</div>;
//   }
// };
export function SummaryBar1({ tasks, cmp }) {
  const counts = getSummaryCounts(tasks, cmp);
  const items = toPercents(counts);
  console.log('#### counts',counts,'items',items)
  return (
    <div className="summary-bar">
      
      {items.map(item => (
        <div
          key={item.key}
          className="summary-segment"
          style={{
            width: `${item.percent}%`,
            backgroundColor: priorityStatusColors[normalizeKey(item.key)] || "#ccc"
          }}
        ></div>
      ))}
    </div>
  );
}
export  function getSummaryCounts(tasks, cmp) {
    const counts = {};

    tasks.forEach(task => {
      const val = task[cmp];
      if (!val) return;

      if (!counts[val]) counts[val] = 0;
      counts[val]++;
    });

    return counts;
  }
export  function toPercents(counts) {
    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    return Object.entries(counts).map(([key, count]) => ({
      key,
      value: count,
      percent: (count / total) * 100
    }));
  }
export function normalizeKey(str) {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
}
 export const priorityColors = {
  high: "#472085",
  low: "#60a5fa",
  medium: "#eab308",
  stuck: "#d84141ff",
  workingonit: "#263a97ff",
  //Medium: "#eab308"
};
export const priorityStatusColors = {
  done: "#00c875",          // ×™×¨×•×§
  progress: "#0091ea",      // ×›×—×•×œ
  stuck: "#e2445c",         // ××“×•×
  workingonit: "#fdab3d",   // ×›×ª×•×
  notstarted: "#c4c4c4",     // ××¤×•×¨
    high: "#e2445c",
    low: "#0091ea",
    medium: "#fdab3d",
};