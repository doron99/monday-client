// DraggableTask.jsx

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DynamicCmp } from "./DynamicCmp";

export function DraggableTask({
  task,
  cmpOrder,
  group,
  selectedTasks,
  onTaskUpdate
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: transform ? CSS.Transform.toString(transform) : undefined,
    transition: transition || undefined,
    position:'relative'
  };

  return (
    <section
      className="group grid"
      ref={setNodeRef}
      {...attributes}
    //   {...listeners}
      style={style}
    >
        <div 
    {...listeners}
    style={{
      cursor: "grab",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: 'absolute',
      left: '-25px',
      top:'5px'
    }}
  >
    ⋮⋮
  </div>
      {cmpOrder.map((cmp, idx) => (
        <section
          className={`grid-item ${cmp}`}
          key={`${task.id}-${cmp}-${task[cmp]}`}
        >
            
          <DynamicCmp
            commentsLength={task.comments.length}
            cmpType={cmp}
            info={task[cmp]}
            selectedTasks={selectedTasks}
            content={{ groupId: group.id, taskId: task.id }}
            taskId={task.id}
            onTaskUpdate={(updateInfo) =>
              onTaskUpdate(task.id, updateInfo)
            }
          />
        </section>
      ))}
    </section>
  );
}
