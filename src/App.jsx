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
import { useEffect, useRef, useState } from 'react'
import { eventBusService } from "./services/event-bus.service.js"
import { PopperDynamic } from "./cmps/contextMenuCmps/PopperDynamic.jsx";
import { PopperPriority } from "./cmps/contextMenuCmps/PopperPriority.jsx";



export default function App() {    
    const [popperInstance, setPopperInstance] = useState(null);
 const [buttonRef, setButtonRef] = useState(null);
  const [visible, setVisible] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

    const [content, setContent] = useState('');
    const [component, setComponent] = useState('');

    const [open, setOpen] = useState(false);
    //const buttonRef = useRef(null);
    const handleClose = () => setOpen(false); // Set to false to close
    const handleOpen = () => setOpen(true); // Set to true to open
    const [popperInfo, setPopperInfo] = useState(null);
    const showPopper = (x, y) => {
            setCoordinates({ x, y });
            setVisible(true);
        };

        useEffect(() => {
            const handleOpenPopper = (x, y) => {
                showPopper(x, y);
            };

            const unsubscribe = eventBusService.on('openPopperDynamic', handleOpenPopper);
            return () => {
                unsubscribe();
            };
        }, []);
    const onSelect = (value) => {
        console.log('onSelect object received:', value)
        //setSelected(value);
        handleClose(); // Close after selection
        //onTaskUpdate({ key: "priority", value: value.label });
    };
    //  const [popperInstance, setPopperInstance] = useState(null);
    // const [buttonRef, setButtonRef] = useState(null);
    // const [visible, setVisible] = useState(false);
  
     useEffect(() => {
        const handleOpenPopper = ({ x, y, content, component }) => {
            setCoordinates({ x, y }); // Set the x and y coordinates
            setComponent(component)
            setContent(content); // Set the content of the popper
            setVisible(true);
        };

        const unsubscribe = eventBusService.on('openPopperDynamic', handleOpenPopper);
        return () => {
            unsubscribe();
        };
    }, []);



  return (
    <>
      <section className="app">
        
        {visible && (
            <PopperDynamic
                component={component}
                style={{width:'fitContent',position: 'absolute',zIndex: '9999',background:'blue'}}
                isOpen={visible}
                x={coordinates.x}
                y={coordinates.y}
                onSelect={onSelect}
                onClose={() => setVisible(false)} // Handle popper close
            >
            </PopperDynamic>
        )}
        <AppHeader />
      
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
