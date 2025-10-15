import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { loadBoards, loadFavorites } from "../store/actions/board.actions.js"
import { BoardFilter } from "../cmps/filters/BoardFilter.jsx"
import {
  FaHome,
  FaCalendarAlt,
  FaStar,
  FaChevronDown,
  FaChevronRight,
  FaPuzzlePiece,
  FaPlus,
  FaClipboardList
} from "react-icons/fa"

export function AppSideBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const boards = useSelector(state => state.boardModule.boards)
  const favorites = useSelector(state => state.boardModule.favorites)

  const [isOpen, setIsOpen] = useState(true)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    loadBoards()
    loadFavorites()
  }, [])

  const toggleFavorites = () => setIsFavoritesOpen(!isFavoritesOpen)
  const goToHome = () => navigate("/")
  const goToBoard = () => navigate("/board")
  const isBoardActive = () => location.pathname.startsWith("/board")
  const goToBoardDetails = (boardId) => navigate(`/board/${boardId}`)

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {isOpen && (
          <div className="sidebar-content">
            <div className="sidebar-header"></div>

            <nav className="sidebar-nav">
              <div
                className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
                onClick={goToHome}
              >
                <FaHome className="icon home-icon" />
                <span>Home</span>
              </div>

              <div
                className={`nav-item ${isBoardActive() ? "active" : ""}`}
                onClick={goToBoard}
              >
                <FaCalendarAlt className="icon work-icon" />
                <span>My work</span>
              </div>
            </nav>

            <section className="favorites">
              <div className="favorites-header" onClick={toggleFavorites}>
                {isFavoritesOpen ? (
                  <FaChevronDown className="icon chevron-icon" />
                ) : (
                  <FaChevronRight className="icon chevron-icon" />
                )}
                <FaStar className="icon star-icon" />
                <span>Favorites</span>
              </div>

              {isFavoritesOpen && (
                <ul>
                  {favorites.length > 0 ? (
                    favorites.map(board => (
                      <li key={board._id}>
                        <FaClipboardList className="icon board-icon" />
                        {board.title}
                      </li>
                    ))
                  ) : (
                    <li className="empty">No favorites yet</li>
                  )}
                </ul>
              )}
            </section>

            <section className="workspaces">
              <div className="workspace-header">
                {!isFilterOpen && (
                  <>
                    <FaPuzzlePiece className="icon workspace-icon" />
                    <span>Workspaces</span>
                  </>
                )}

                <BoardFilter onToggleFilter={setIsFilterOpen} />
              </div>

              <div className="workspace-item">
                <span>
                  <FaClipboardList className="icon workspace-item-icon" /> Guest's main workspace
                </span>
                <button className="add-btn">
                  <FaPlus className="icon add-icon" />
                </button>
              </div>

              <ul>
                {boards.map(board => (
                  <li key={board._id}
                  onClick={() => goToBoardDetails(board._id)}
                  className="clickable"
                  >
                    <FaClipboardList className="icon board-icon" />
                    {board.title}
                  </li>
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
