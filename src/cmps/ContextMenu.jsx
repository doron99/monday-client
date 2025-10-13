import React, { forwardRef } from 'react';

export const ContextMenu = forwardRef(({ isToggled, positionX, positionY, children ,contextMenuRef} ) => {
    return (
        <menu
            style={{top:positionY + 2 + 'px',left: positionX + 2 + 'px'}}
            className={`context-menu ${isToggled ? 'active' : ''}`}
            ref={contextMenuRef}
        >
            {children} {/* Render dynamic children here */}
        </menu>
    );
});


// export const ContextMenu = ({
//   rightClickItem,
//   positionX,
//   positionY,
//   isToggled,
//   buttons,
//   contextMenuRef
// }) => {
  
//   return (
//     <menu
//       style={{top:positionY + 2 + 'px',left: positionX + 2 + 'px'}}
//       className={`context-menu ${isToggled ? 'active' : ''}`}
//       ref={contextMenuRef}
//     >
//       {buttons.map((button,index) => {
//         function handleClick(e) {
//           e.stopPropagation();
//           button.onClick(e,rightClickItem)
//         }
//         if (button.isSpacer)return <hr key={index}></hr>

//         return (
//           <button
//             onClick={handleClick}
//             key={index}
//             className="context-menu-button"
//           >
//             <span>{button.text}</span>
//             <span className="icon">{button.icon}</span>

//           </button>
//         )
//       })}
//     </menu>
//   )
// };

// export const ContextMenu = ({ 
//     rightClickItem, 
//     positionX, 
//     positionY, 
//     buttons, 
//     contextMenuRef 
// }) => {
//     return (
//         <menu 
//             style={{
//                 top: `${positionY + 2}px`, 
//                 left: `${positionX + 2}px`
//             }} 
//             className={`context-menu ${rightClickItem ? 'active' : ''}`} 
//             ref={contextMenuRef}
//         >
//             {buttons.map((button, index) => {
//                 const handleClick = (e) => {
//                     e.stopPropagation();
//                     // Handle click event
//                 };

//                 const isSpacer = button === 'spacer';

//                 if (isSpacer) {
//                     return <hr key={index} />;
//                 }

//                 return (
//                     <span 
//                         key={index} 
//                         onClick={handleClick} 
//                         className="context-menu-button"
//                     >
//                         {/* {button.icon && <button.icon />} */}
//                         <span>{button.label}</span>
//                     </span>
//                 );
//             })}
//         </menu>
//     );
// };