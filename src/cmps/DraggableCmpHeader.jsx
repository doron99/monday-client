import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const DraggableCmpHeader = ({ 
  id, 
  children, 
  disabled = false,
  align = "center"   
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, disabled });

const style = {
  transform: CSS.Transform.toString(transform),
  transition,
  cursor: disabled ? "default" : "grab",

  display: 'flex',
  alignItems: 'center',

  justifyContent: align === "left" ? "flex-start" : "center",
  textAlign: align === "left" ? "left" : "center",

  marginLeft: align === "left" ? '10px' : '0px',
};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="label-item"
    >
      {children}
    </div>
  );
};
