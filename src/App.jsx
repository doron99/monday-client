import "./assets/style/main.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";

import { AppHeader } from "./cmps/AppHeader.jsx";
import { AppFooter } from "./cmps/AppFooter.jsx";
import { AppModal } from "./cmps/AppModal.jsx";

import { WelcomePage } from "./pages/WelcomePage.jsx";
import { BoardDetails } from "./pages/BoardDetails.jsx";
import { TaskDetails } from "./pages/TaskDetails.jsx";
import { Login } from "./pages/Login.jsx";
import { BoardIndex } from "./pages/BoardIndex.jsx";
import { MainPageLayout } from "./layouts/MainPageLayout.jsx";


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
