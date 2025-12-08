import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cloneElement } from "react";

export function DraggableGroup({ id, children }) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Pass drag props to the child (GroupPreview)
  return (
    <div
      ref={setNodeRef}
      style={style}
    >
      {cloneElement(children, {
        dragListeners: listeners,
        dragAttributes: attributes
      })}
    </div>
  );
}