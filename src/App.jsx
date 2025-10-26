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



export default function App() {   
  console.log("this is from 101");
  console.log("this is confilct");
  
  const [visible, setVisible] = useState(false);
const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

const [content, setContent] = useState('');
const [component, setComponent] = useState('');
const isSubscribed = useRef(false); // Track subscription

   
useEffect(() => {
        const handleOpenPopper = ({ x, y, content, component }) => {
            setCoordinates({ x, y });
            setComponent(component);
            setContent(content);
            setVisible(true);
        };

        // Subscribe to the event only once
        if (!isSubscribed.current) {
            isSubscribed.current = true; // Set subscription state
            const unsubscribe = eventBusService.on('openPopperDynamic', handleOpenPopper);

            // Cleanup function to remove the event listener when unmounting
            return () => {
                unsubscribe();
                isSubscribed.current = false; // Reset subscription status
            };
        }
    }, []); // Runs only on mount and unmount
      
    // const onSelect = ({val,content}) => {
    //     console.log('App.jsx onSelect object received:', val,content)
    //     eventBusService.emit('onPopperSelect', {val,content});
    //     setVisible(false); // Close after selection
    // };
  




  return (
    <>
      <section className="app">
        
        {visible && (
            <PopperDynamic
                component={component}
                content={content}
                style={{width:'fitContent',position: 'absolute',zIndex: '9999',background:'blue'}}
                isOpen={visible}
                x={coordinates.x}
                y={coordinates.y}
                onSelect={(val) => onSelect(val)}
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
