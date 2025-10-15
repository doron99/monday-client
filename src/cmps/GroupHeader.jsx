import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export function GroupHeader({ 
  group, 
  isExpanded, 
  onToggleExpanded, 
  onUpdateGroup 
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

  return (
    <div className="group-header">
      <div 
        className="arrow-toggle" 
        onClick={onToggleExpanded}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        {isExpanded ? (
          <ChevronDownIcon style={{ width: '16px', height: '16px', color: group.style.color }} />
        ) : (
          <ChevronRightIcon style={{ width: '16px', height: '16px', color: group.style.color }} />
        )}
      </div>
      <div
        className="color-indicator"
        style={{ backgroundColor: group.style.color }}
        onClick={() => setIsColorModalOpen(!isColorModalOpen)}
      ></div>
      <span
        suppressContentEditableWarning
        contentEditable
        onBlur={(ev) =>
          onUpdateGroup(group.id, { key: "title", value: ev.target.innerText })
        }
        className="group-title"
        style={{color: group.style.color}}
      >
        {group.title}
      </span>

      {isColorModalOpen && (
        <div className="color-list">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => {
                setIsColorModalOpen(!isColorModalOpen);
                onUpdateGroup(group.id, {
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
  );
}
