// import {
//   DndContext,
//   useDraggable,
//   useDroppable,
//   DragEndEvent,
// } from '@dnd-kit/core';

// export const DraggableTask = ({ task, cmpOrder, onTaskUpdate, selectedTasks }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
//     id: task.id,
//   });

//   return (
//     <section
//       ref={setNodeRef}
//       style={{
//         transform: CSS.Transform.toString(transform),
//         transition,
//       }}
//       {...listeners}
//       {...attributes}
//       className="group grid"
//     >
//       {cmpOrder.map((cmp, idx) => (
//         <section className={`grid-item ${cmp}`} key={`task-${task.id}-cmp-${idx}`}>
//           <DynamicCmp
//             cmpType={cmp}
//             info={task[cmp]}
//             selectedTasks={selectedTasks}
//             taskId={task.id}
//             onTaskUpdate={(updateInfo) => onTaskUpdate(task.id, updateInfo)}
//           />
//         </section>
//       ))}
//     </section>
//   );
// };