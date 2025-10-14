import React, { forwardRef } from 'react';




export const ContextMenuStatus = forwardRef(({ isToggled, positionX, positionY ,onAction,contextMenuRef},ref ) => {
    const contextMenuItems =[
                        {
                            text: 'Done',
                            icon: '👁️',
                            background:'rgba(26, 255, 160, 1)',
                            onClick: () => {
                                //alert('Action 1 executed');
                                onAction({data:{status:'done'}});
                            },
                            isSpacer: false
                        },
                        {
                            text: 'NotStarted',
                            icon: '✏️',
                            background:'rgba(109, 107, 255, 1)',
                            onClick: () => {
                                //alert('Action 2 executed');
                                onAction({data:{status:'notStarted'}});
                            },
                            isSpacer: false
                        },
                        {
                            text: 'Stuck',
                            icon: '✏️',
                            background:'rgba(200, 0, 110, 1)',
                            onClick: () => {
                                //alert('Action 2 executed');
                                onAction({data:{status:'stuck'}});
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
