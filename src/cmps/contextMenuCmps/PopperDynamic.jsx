import { createPopper } from "@popperjs/core";
import { useEffect, useRef, useState } from "react";
import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { PopperContentDate } from "./PopperContentDate";
import { PopperContentStatus } from "./PopperContentStatus";
import { PopperContentPriority } from "./PopperContentPriority";
import { PopperContentMember } from "./PopperContentMember";
import { eventBusService } from "../../services/event-bus.service";

export const PopperDynamic = ({ component,content,x = 200, y=200,strSelectedDate, isOpen, buttonRef, onSelect, onClose }) => {
  const popperRef = useRef(null);
  const popperInstance = useRef(null);
  const arrowRef = useRef(null);
  console.log('PopperDynamic content',content)
  //console.log('strSelectedDate', strSelectedDate);
  const [_content, set_Content] = useState(content);

  console.log('_content',_content)
  useEffect(() => {
  if (isOpen && popperRef.current) {
    popperInstance.current = createPopper( popperRef.current, {
        placement: 'bottom',
        modifiers: [
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'arrow', options: { element: arrowRef.current } },
          { name: 'preventOverflow', options: { boundary: 'viewport' } },
          { name: 'flip', options: { 
            // fallbackPlacements: ['top', 'right', 'left']
           } },
        ],
      });
       // Set specific styles for the popper
            popperRef.current.style.position = 'absolute'; // Ensure it's absolute
            popperRef.current.style.zIndex = '1000'; // Set your z-index
            popperRef.current.style.width = 'fit-content'; // Auto width to fit content
            popperRef.current.style.background = 'white'; // Auto width to fit content
            popperRef.current.style.left = `${x}px`;
            popperRef.current.style.top = `${y}px`;
            popperRef.current.style.transform = 'translateX(-50%)';

  }

  return () => {
    if (popperInstance.current) {
      popperInstance.current.destroy();
    }
  };
}, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        // buttonRef.current && !buttonRef.current.contains(event.target) &&
        popperRef.current && !popperRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, popperRef, onClose]);

  if (!isOpen) return null;


  const _onSelect = (val) => {
    console.log('PopperDynamic callback', val, 'content',content);
    onSelect({val,content});
  }
  

  return (
    <div ref={popperRef} className="" >
      {component == 'date' && 
      <PopperContentDate  ref={arrowRef}  content={content} onSelect={(val) => _onSelect(val)} onClose={() => onClose()} />}
      {component == 'status' && 
      <PopperContentStatus content={content} ref={arrowRef}   onSelect={(val) => _onSelect(val)} onClose={() => onClose()} />}
      {component == 'priority' && 
      <PopperContentPriority content={content} ref={arrowRef}   onSelect={(val) => _onSelect(val)} onClose={() => onClose()} />}
      {component == 'member' && 
      <PopperContentMember content={content}  ref={arrowRef}   onSelect={(val) => _onSelect(val)} onClose={() => onClose()} />}
      {/* <DayPicker
        animate
        mode="single"
        selected={selectedDate}
        onSelect={handleDaySelect}
        footer={
          selectedDate 
            ? `Selected: ${selectedDate.toLocaleDateString()}`
            : "Pick a day."
        }
      /> */}
      <div ref={arrowRef} className="popper-arrow" />

      <button onClick={onClose}>Close</button>
    </div>
  );
};

export const PopperDynamic8888 = ({ x, y, children, onClose }) => {
    const popperElement = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        // Create the popper element
        popperElement.current = document.createElement('div');
        document.body.appendChild(popperElement.current);

        // Set initial styles for the popper
        popperElement.current.style.position = 'absolute';
        popperElement.current.style.zIndex = '1000';

        // Create the popper instance
        const popperInstance = createPopper(popperElement.current, {
            placement: 'bottom',
            modifiers: [
                { name: 'offset', options: { offset: [0, 8] } },
                { name: 'arrow', options: { element: arrowRef.current } },
                { name: 'preventOverflow', options: { boundary: 'viewport' } },
                { name: 'flip', options: { fallbackPlacements: ['top', 'right', 'left'] } },
            ],
        });

        // Update position based on x and y
        const updatePosition = () => {
            popperElement.current.style.left = `${x}px`;
            popperElement.current.style.top = `${y}px`;
        };
        updatePosition();

        // Click outside handler
        const handleClickOutside = (event) => {
            // Close the popper if the click is outside
            if (popperElement.current && !popperElement.current.contains(event.target)) {
                onClose(); 
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function
        return () => {
            if (popperElement.current) {
                popperInstance.destroy();
                document.body.removeChild(popperElement.current);
            }
            document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener
        };
    }, [x, y, onClose]);

    return (
        <div  ref={popperElement}>
            {children}
   <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
    );
};
export const PopperDynamic444= ({ x, y, children, onClose }) => {
    const popperElement = useRef(null);
    const arrowRef = useRef(null);

    useEffect(() => {
        // Create the popper element
        popperElement.current = document.createElement('div');
        document.body.appendChild(popperElement.current);

        // Set initial styles for popper
        popperElement.current.style.position = 'absolute';
        popperElement.current.style.zIndex = '1000';

        // Create the popper instance
        const popperInstance = createPopper(popperElement.current, {
            placement: 'bottom',
            modifiers: [
                { name: 'offset', options: { offset: [0, 8] } },
                { name: 'arrow', options: { element: arrowRef.current } },
                { name: 'preventOverflow', options: { boundary: 'viewport' } },
                { name: 'flip', options: { fallbackPlacements: ['top', 'right', 'left'] } },
            ],
        });

        // Update position based on x and y
        const updatePosition = () => {
            popperElement.current.style.left = `${x}px`;
            popperElement.current.style.top = `${y}px`;
        };
        updatePosition();

        // Click outside handler
        const handleClickOutside = (event) => {
            if (popperElement.current && !popperElement.current.contains(event.target)) {
                onClose(); // Close the popper if the click is outside
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function
        return () => {
            if (popperElement.current) {
                popperInstance.destroy();
                document.body.removeChild(popperElement.current);
            }
            document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener
        };
    }, [x, y, onClose]);

    return (
        <div ref={popperElement}>
            {children}
                        <PopperContent  strSelectedDate={'2025-10-09'}/>

            <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
    );
};
export const PopperDynamic333 = ({ x, y, children, onClose }) => {
    const popperElement = useRef(null);
    const arrowRef = useRef(null); // Reference for arrow if needed

    useEffect(() => {
        // Create the popper element
        popperElement.current = document.createElement('div');
        document.body.appendChild(popperElement.current);

        // Set initial styles for popper
        popperElement.current.style.position = 'absolute';
        popperElement.current.style.left = `${x}px`;
        popperElement.current.style.top = `${y}px`;
        popperElement.current.style.zIndex = '1000'; // or your preferred z-index

        // Create the popper instance
        const popperInstance = createPopper(popperElement.current, {
            placement: 'bottom', // Adjust this as needed
            modifiers: [
                {
                    name: 'offset',
                    options: { offset: [0, 8] }, // 8 pixels below the specified y coordinate
                },
                {
                    name: 'arrow', // Optional: If you want to add an arrow
                    options: {
                        element: arrowRef.current,
                    },
                },
                {
                    name: 'preventOverflow',
                    options: {
                        boundary: 'viewport', // Prevents the popper from going off-screen
                    },
                },
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['top', 'right', 'left'], // Allow flipping options
                    },
                },
            ],
        });

        // Update position based on x and y
        const updatePosition = () => {
            popperElement.current.style.left = `${x}px`;
            popperElement.current.style.top = `${y}px`;
        };
        updatePosition();

        // Cleanup function
        return () => {
             if (popperElement.current) {
                popperInstance.destroy();
                document.body.removeChild(popperElement.current); // Cleanup
            }
        };
    }, [x, y, children]); // Dependencies: Update popper when x or y changes

    return (
        <div ref={popperElement}>
            {children}
            <PopperContent  strSelectedDate={'2025-10-09'}/>

            <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
    );
};
export const PopperDynamic222 = ({ x, y, children, onClose }) => {
    const popperElement = useRef(null);

    useEffect(() => {
        console.log( x, y, children)
        popperElement.current = document.createElement('div');
        document.body.appendChild(popperElement.current);

        // Append the children (JSX) to the popper element
        popperElement.current.appendChild(
            document.createTextNode('')
        );
        const contentElement = popperElement.current.appendChild(document.createElement('div'));
        contentElement.innerHTML = ''; // Clear the content initially.

        // Set position
        contentElement.style.position = 'absolute';
        contentElement.style.left = `${x}px`;
        contentElement.style.top = `${y}px`;
        contentElement.style.zIndex = 1000;

        createPopper(popperElement.current, contentElement, {
            placement: 'top', // Can be modified as needed
        });

        return () => {
            document.body.removeChild(popperElement.current); // Cleanup
        };
    }, [x, y, children]);

    return (
        <div ref={popperElement}>
            {children} {/* Render children here */}
            <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
    );
};
export const PopperDynamic1 = ({ x, y, children, onClose }) => {
    const popperElement = useRef(null);
    useEffect(() => {
        popperElement.current = document.createElement('div');
        document.body.appendChild(popperElement.current);

        // Append the children (JSX) to the popper element
        popperElement.current.appendChild(
            document.createTextNode('')
        );
        const contentElement = popperElement.current.appendChild(document.createElement('div'));
        contentElement.innerHTML = ''; // Clear the content initially.

        // Set position
        contentElement.style.position = 'absolute';
        contentElement.style.left = `${x}px`;
        contentElement.style.top = `${y}px`;
        contentElement.style.zIndex = 1000;

        createPopper(popperElement.current, contentElement, {
            placement: 'top', // Can be modified as needed
        });

        return () => {
            document.body.removeChild(popperElement.current); // Cleanup
        };
    }, [x, y, children]);
    return (
        <div ref={popperElement}>
            {children} {/* Render children here */}
            <button onClick={onClose} style={{ marginTop: '10px' }}>Close</button>
        </div>
    );
    
    
    //************last example**************
    // useEffect(() => {
    //   console.log(x, y, content)
    //     popperElement.current = document.createElement('div');
    //     document.body.appendChild(popperElement.current);
    //     popperElement.current.innerHTML = content; // Set content

    //     const popperInstance = createPopper(popperElement.current, {
    //         placement: 'top', // You can adjust this placement if needed
    //     });

    //     // Set position
    //     popperElement.current.style.position = 'absolute';
    //     popperElement.current.style.left = `${x}px`;
    //     popperElement.current.style.top = `${y}px`;
    //     popperElement.current.style.zIndex = 1000; // Set z-index to ensure visibility

    //     return () => {
    //         popperInstance.destroy();
    //         document.body.removeChild(popperElement.current);
    //     };
    // }, [x, y, content]);

    
    // useEffect(() => {
    //     console.log(x, y, content)
    //     popperElement.current = document.createElement('div');
    //     document.body.appendChild(popperElement.current);
    //     popperElement.current.innerHTML = content; // Set content

    //     const popperInstance = createPopper(popperElement.current, {
    //         placement: 'top', // You can adjust this placement to your needs
    //         modifiers: [
    //             {
    //                 name: 'offset',
    //                 options: {
    //                     offset: [x, y], // Can adjust offsets if needed
    //                 },
    //             },
    //             {
    //                 name: 'preventOverflow',
    //                 options: {
    //                     boundary: 'viewport',
    //                 },
    //             },
    //         ],
    //     });

    //     Object.assign(popperElement.current.style, {
    //         position: 'absolute',
    //         left: `${x}px`, // Use the passed x coordinate
    //         top: `${y}px`,  // Use the passed y coordinate
    //         zIndex: 1000,   // Example z-index, adjust as needed
    //     });

    //     return () => {
    //         popperInstance.destroy();
    //         document.body.removeChild(popperElement.current);
    //     };
    // }, [x, y, content]);
  const priorites = [
    { label: 'high', color: 'red' },
    { label: 'medium', color: 'orange' },
    { label: 'low', color: 'green' },
  ];
    return (
        <div  className="dropdown-menu popperDynamic">
      {priorites.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(s)}
          className="dropdown-item"
          style={{ backgroundColor: s.color }}
        >
          {s.label}
        </button>
      ))}
      {/* <div ref={arrowRef} className="popper-arrow" /> */}

      <button onClick={onClose}>Close</button> {/* Optional close button */}
    </div>
    );
};