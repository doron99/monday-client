import "./assets/style/main.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { AppHeader } from "./cmps/AppHeader.jsx";

import { BoardDetails } from "./pages/BoardDetails.jsx";
import { TaskDetails } from "./pages/TaskDetails.jsx";
import { Login } from "./pages/Login.jsx";
import { MainPageLayout } from "./layouts/MainPageLayout.jsx";
import { WelcomePage } from './pages/WelcomePage.jsx'
import { AppModal } from './cmps/AppModal.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { ContextMenu } from './cmps/ContextMenu.jsx'
import { useEffect, useRef, useState } from 'react'
import { Provider } from "react-redux";
import {CtxMenu1} from './cmps/contextMenuCmps/CtxMenu1.jsx'
import { openContextMenu,eventBusService, onContextMenuSelect } from "./services/event-bus.service.js"



export default function App() {    
    const contextMenuRef = useRef(null)
    const [contextMenu,setContextMenu] = useState(
        {position: {
            x:0,
            y:0},
            toggled:false});
    // const contextMenuItems =[
    //                     {
    //                         text: 'Do Something',
    //                         icon: '👁️',
    //                         onClick: () => {
    //                             //alert('Action 1 executed');
    //                             _resetContextMenu();
    //                         },
    //                         isSpacer: false
    //                     },
    //                     {
    //                         text: 'Do Something Else',
    //                         icon: '✏️',
    //                         onClick: () => {
    //                             //alert('Action 2 executed');
    //                             _resetContextMenu();
    //                         },
    //                         isSpacer: false
    //                     }
    //                 ]
    function handleOnContextMenu(e, rightClickPerson) {
        e.preventDefault();
        const contextMenuAttr = contextMenuRef.current.getBoundingClientRect();
        const isLeft = e.clientX < window.innerWidth / 2;
        let x;
        let y = e.clientY;
        if (isLeft) {
            x = e.clientX;
        } else {
            x = e.clientX - contextMenuAttr.width;
        }
        const t = {
            position: {
                x,
                y,
            },
            toggled: true,
        }
        console.log(t);
        setContextMenu(t);
        console.log(rightClickPerson);
    }
    function _resetContextMenu() {
        console.log('_resetContextMenu')
        const t = {
            position: {
                x:0,y:0
            },
            toggled: false,
        }
        console.log(t);
        setContextMenu(t);
    }

    // useEffect(() => {
    //     function handler(e) {
    //         console.log(contextMenuRef.current)
    //         console.log('e.target.dataset.id',e.target.dataset.id)
    //         if (e.target.className == 'some1') {

    //         } else {
    //             _resetContextMenu();
    //         }
          
    //     }

    //     document.addEventListener('click', handler);
    //     return () => {
    //         document.removeEventListener('click', handler);
    //     };
    // }, []);
    function handleOnAction({ data }) {
        console.log('something', data);
        eventBusService.onContextMenuSelect(data);
    }
    useEffect(() => {
            const unsubscribe = eventBusService.on('open-context-menu', (msg) => {
                //setMsg(msg)
                handleOnContextMenu(msg.e,null)
                console.log('msg',msg)
                // window.scrollTo({top: 0, behavior: 'smooth'});
                // if (timeoutIdRef.current) {
                //     timeoutIdRef.current = null
                //     clearTimeout(timeoutIdRef.current)
                // }
                // timeoutIdRef.current = setTimeout(closeMsg, 3000)
            })
            return unsubscribe
        }, [])
  return (
    <>
      <section className="app">
        <AppHeader />
        <div onClick={(e) => {openContextMenu(e,'asd');}} 
className='some1' data-id='asd'>something</div>
    {/* //onContextMenu for right click <div onClick={(e) => {handleOnContextMenu(e);*/}
            
            {contextMenu.toggled && <div className="backdrop" onClick={_resetContextMenu} />}
        <ContextMenu 
                    contextMenuRef={contextMenuRef}
                    isToggled={contextMenu.toggled}
                    positionX={contextMenu.position.x}
                    positionY={contextMenu.position.y}
                    
                    >
                        <CtxMenu1 onAction={handleOnAction}/>
                         {/* <ul>
                    {contextMenuItems.map((item, index) => (
                        <li key={index} onClick={item.onClick} style={{ cursor: 'pointer' }}>
                            {item.text}
                        </li>
                    ))}
                </ul> */}

 </ContextMenu>

        <main className="main-layout">
            <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<Login />} />

                    {/* Board routes with shared layout */}
                    <Route path="/board" element={<MainPageLayout />}>
                    <Route index element={<BoardIndex />} />
                        <Route path=":boardId" element={<BoardDetails />}>
                                <Route path=":groupId/:taskId" element={<TaskDetails />} />
                        </Route>
                    </Route>
            </Routes>
        </main>
      </section>
      <AppModal />
    </>
  );
}
