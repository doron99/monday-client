// const Router = ReactRouterDOM.BrowserRouter
// const Router = ReactRouterDOM.HashRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux

import './assets/style/main.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { WelcomePage } from './pages/WelcomePage.jsx'
import { AppModal } from './cmps/AppModal.jsx'
import { BoardIndex } from './pages/BoardIndex.jsx'
import { ContextMenu } from './cmps/ContextMenu.jsx'
import { useEffect, useRef, useState } from 'react'



export default function App() {
    const contextMenuRef = useRef(null)
    const [contextMenu,setContextMenu] = useState(
        {position: {
            x:0,
            y:0},
            toggled:false})
    const [people,setPeople] = useState([
        {id:1,name:'johnny',selected:false},
        {id:2,name:'johnny1',selected:false},
        {id:3,name:'johnny2',selected:false},
        {id:4,name:'johnny3',selected:false}])
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

    useEffect(() => {
        function handler(e) {
            console.log(contextMenuRef.current)
            console.log('e.target.dataset.id',e.target.dataset.id)
            if (e.target.className == 'some1') {

            } else {
                _resetContextMenu();
            }
          
        }

        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        };
    }, []);
    const contextMenuItems =[
                        {
                            text: 'Do Something',
                            icon: '👁️',
                            onClick: () => {
                                //alert('Action 1 executed');
                                _resetContextMenu();
                            },
                            isSpacer: false
                        },
                        {
                            text: 'Do Something Else',
                            icon: '✏️',
                            onClick: () => {
                                //alert('Action 2 executed');
                                _resetContextMenu();
                            },
                            isSpacer: false
                        }
                    ]

    return (
        <Provider store={store}>
            <Router>
                {JSON.stringify(contextMenu,null,2)}
                <section className="app">
                    <AppHeader />
                    <ContextMenu 
                    contextMenuRef={contextMenuRef}
                    isToggled={contextMenu.toggled}
                    positionX={contextMenu.position.x}
                    positionY={contextMenu.position.y}
                    
                    >
                         <ul>
                    {contextMenuItems.map((item, index) => (
                        <li key={index} onClick={item.onClick} style={{ cursor: 'pointer' }}>
                            {item.text}
                        </li>
                    ))}
                </ul>

 </ContextMenu>

                    {/* //onContextMenu for right click */}
                    <div onClick={(e) => {handleOnContextMenu(e);}} 
                    className='some1' data-id='asd'>
                        something</div>
                    <main className='main-layout'>
                        <Routes>
                            <Route path="/" element={<WelcomePage />}  />
                            <Route path="/board/:boardId?" element={<BoardIndex />}  />

                            {/* <Route element={<HomePage />} path="/" /> */}

                            {/* <Route element={<AboutUs />} path="/about" />
                            <Route element={<UserDetails />} path="/user/:userId" />
                            <Route element={<ToyIndex />} path="/toy" />
                            <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
                            <Route element={<ToyDetails />} path="/toy/:toyId" /> */}

                        </Routes>
                    </main>
                    <AppFooter />
                </section>
            </Router>
            <AppModal />
        </Provider>

    )
}


