import React, { forwardRef } from 'react';




export const ContextMenuStatus = forwardRef(({ isToggled, positionX, positionY ,onAction,contextMenuRef} ) => {
    const contextMenuItems =[
                        {
                            text: 'High',
                            icon: '👁️',
                            background:'red',
                            onClick: () => {
                                //alert('Action 1 executed');
                                onAction({data:{status:'a'}});
                            },
                            isSpacer: false
                        },
                        {
                            text: 'Low',
                            icon: '✏️',
                            background:'rgb(0, 200, 117)',
                            onClick: () => {
                                //alert('Action 2 executed');
                                onAction({data:{status:'b'}});
                            },
                            isSpacer: false
                        }
                    ];
    
    return (
        <menu
            style={{top:positionY + 2 + 'px',left: positionX + 2 + 'px'}}
            className={`context-menu ${isToggled ? 'active' : ''}`}
            ref={contextMenuRef}
        >
            
            <div style={styles.container}>
            
            {contextMenuItems.map((item, index) => (
                <button class="" style={{...styles.containerItem,backgroundColor: item.background}} 
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
