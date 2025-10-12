import React, { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom" 
import { boardService } from "../services/board.service"

export function AppSideBar() {
  const navigate = useNavigate()
  const location = useLocation() 

  const [boards, setBoards] = useState([])
  const [favorites, setFavorites] = useState([])
  const [isOpen, setIsOpen] = useState(true)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(true)

  useEffect(() => {
    loadBoards()
  }, [])

  async function loadBoards() {
    try {
      const allBoards = await boardService.query()
      const favs = await boardService.getFavorites()

      setBoards(allBoards)
      setFavorites(favs)
    } catch (err) {
      console.error("Failed to load boards:", err)
    }
  }

  const toggleFavorites = () => {
    setIsFavoritesOpen(!isFavoritesOpen)
  }

  const goToHome = () => {
    navigate('/')
  }

  const goToBoard = () => {
    navigate('/board') 
  }

  const isBoardActive = () => {
    return location.pathname.startsWith('/board')
  }

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {isOpen && (
          <div className="sidebar-content">
            <div className="sidebar-header"></div>

            <nav className="sidebar-nav">
              <div 
                className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} 
                onClick={goToHome}
              >
                <span>🏠</span> <span>Home</span>
              </div>

              <div 
                className={`nav-item ${isBoardActive() ? 'active' : ''}`} 
                onClick={goToBoard}
              >
                <span>🗓️</span> <span>My work</span>
              </div>
            </nav>

            <section className="favorites">
              <div className="favorites-header" onClick={toggleFavorites}>
                <span style={{ marginRight: '5px', cursor: 'pointer' }}>
                  {isFavoritesOpen ? '▼' : '▶'}
                </span>
                <span>⭐</span> <span>Favorites</span>
              </div>
              
              {isFavoritesOpen && (
                <ul>
                  {favorites.length > 0 ? (
                    favorites.map(board => (
                      <li key={board._id}>📋 {board.title}</li>
                    ))
                  ) : (
                    <li style={{ color: "#999" }}>No favorites yet</li>
                  )}
                </ul>
              )}
            </section>

            <section className="workspaces">
              <div className="workspace-header">
                <span>🧩 Workspaces</span>
              </div>

              <div className="workspace-item">
                <span>👤 Guest's main workspace</span>
                <button className="add-btn">➕</button>
              </div>

              <ul>
                {boards.map(board => (
                  <li key={board._id}>📋 {board.title}</li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </aside>

      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Close" : "Open"}
      >
        {isOpen ? "‹" : "›"}
      </button>
    </div>
  )
}
