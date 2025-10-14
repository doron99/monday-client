import React, { forwardRef } from 'react';




export const ContextMenuPriority = forwardRef(({ isToggled, positionX, positionY ,onAction,contextMenuRef},ref ) => {
    const contextMenuItems =[
                        {
                            text: 'High',
                            icon: '👁️',
                            background:'red',
                            onClick: () => {
                                //alert('Action 1 executed');
                                onAction({data:{priority:'high'}});
                            },
                            isSpacer: false
                        },
                        {
                            text: 'Medium',
                            icon: '✏️',
                            background:'rgba(241, 189, 91, 1)',
                            onClick: () => {
                                //alert('Action 2 executed');
                                onAction({data:{priority:'medium'}});
                            },
                            isSpacer: false
                        },
                        {
                            text: 'Low',
                            icon: '✏️',
                            background:'rgb(0, 200, 117)',
                            onClick: () => {
                                //alert('Action 2 executed');
                                onAction({data:{priority:'low'}});
                            },
                            isSpacer: false
                        }
                    ];
    
    return (
        <menu
            style={{top:positionY + 2 + 'px',left: positionX + 2 + 'px'}}
            className={`context-menu ${isToggled ? 'active' : ''}`}
            ref={ref}
        >
            
            <div style={styles.container}>
            
            {contextMenuItems.map((item, index) => (
                <button className="" style={{...styles.containerItem,backgroundColor: item.background}} 
                key={index} 
                onClick={item.onClick} 
                >{item.text}</button>
            ))}
            </div>
        </menu>
    );
});
const styles = {
    container : {
        display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    padding: '24px 24px 16px',
    background: '#fff',
    textAlign:'center',
    display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerItem:{
        cursor: 'pointer',
        color:'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
