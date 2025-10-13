
export function CtxMenu1({ onAction }) {
        const contextMenuItems =[
                        {
                            text: 'Do Something',
                            icon: '👁️',
                            onClick: () => {
                                //alert('Action 1 executed');
                                onAction({data:{priority:'a'}});
                            },
                            isSpacer: false
                        },
                        {
                            text: 'Do Something Else',
                            icon: '✏️',
                            onClick: () => {
                                //alert('Action 2 executed');
                                onAction({data:{priority:'b'}});
                            },
                            isSpacer: false
                        }
                    ]
    return (
        <>
            {contextMenuItems.map((item, index) => (
                <li key={index} onClick={item.onClick} style={{ cursor: 'pointer' }}>
                    {item.text}
                </li>
            ))}
        </>
        

    );
};