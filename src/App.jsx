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
import { Provider } from "react-redux";
import { eventBusService } from "./services/event-bus.service.js"



export default function App() {    
    

  return (
    <>
      <section className="app">
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
