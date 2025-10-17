import { useEffect, useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  loadBoards,
  loadFavorites,
  removeBoard,
  addBoard,
  updateBoard,
  setActiveBoard,
} from "../store/actions/board.actions.js"
import { BoardFilter } from "../cmps/filters/BoardFilter.jsx"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { PopperBoardMenu } from "../cmps/contextMenuCmps/PopperBoardMenu.jsx"
import {
  FaHome,
  FaCalendarAlt,
  FaStar,
  FaChevronDown,
  FaChevronRight,
  FaPuzzlePiece,
  FaPlus,
  FaClipboardList,
} from "react-icons/fa"

export function AppSideBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const boards = useSelector(state => state.boardModule.boards)
  const favorites = useSelector(state => state.boardModule.favorites)

  const [isOpen, setIsOpen] = useState(true)
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(true)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeBoardId, setActiveBoardId] = useState(null)
  const buttonRefs = useRef({})

  useEffect(() => {
    loadBoards()
    loadFavorites()
  }, [])

  const toggleFavorites = () => setIsFavoritesOpen(!isFavoritesOpen)
  const goToHome = () => navigate("/")
  const goToBoard = () => navigate("/board")
  const isBoardActive = () => location.pathname.startsWith("/board")

  const goToBoardDetails = (boardId) => {
    setIsMenuOpen(false)
    setActiveBoardId(null)
    navigate(`/board/${boardId}`)
  }

async function onAddBoard() {
  const savedBoard = await addBoard()
  if (savedBoard?._id) navigate(`/board/${savedBoard._id}`)
}


  function handleRename(boardId) {
    const board = boards.find(b => b._id === boardId)
    if (!board) return

    const newName = prompt("Enter new board name:", board.title)
    if (!newName || newName.trim() === "") return

    const update = { key: "title", value: newName.trim() }
    updateBoard(null, null, update)
  }

  function handleToggleFavorite(boardId) {
    const board = boards.find(b => b._id === boardId)
    if (!board) return

    const update = { key: "isStarred", value: !board.isStarred }
    updateBoard(null, null, update)
  }

  async function handleDelete(boardId) {
    const confirmDelete = confirm("Are you sure you want to delete this board?")
    if (!confirmDelete) return

    await removeBoard(boardId)
    await loadBoards()
    await loadFavorites()

    if (location.pathname.includes(`/board/${boardId}`)) {
      navigate("/board")
    }
  }

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
                <button className="add-btn" onClick={onAddBoard}>
                  <FaPlus className="icon add-icon" />
                </button>
              </div>

              <ul>
                {boards.map(board => (
                  <li
                    key={board._id}
                    className="board-item flex items-center justify-between p-2 hover:bg-gray-100 rounded-md"
                  >
                    <div
                      onClick={() => goToBoardDetails(board._id)}
                      className="flex items-center gap-2 cursor-pointer flex-grow"
                    >
                      <FaClipboardList className="icon board-icon" />
                      <span className="truncate">{board.title}</span>
                    </div>

                    <div className="relative">
                      <button
                        ref={el => (buttonRefs.current[board._id] = el)}
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveBoard(board)
                          setActiveBoardId(board._id)
                          setIsMenuOpen(prev =>
                            activeBoardId !== board._id || !prev
                          )
                        }}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                      >
                        <EllipsisHorizontalIcon className="w-5 h-5 text-gray-600" />
                      </button>

                      {activeBoardId === board._id && (
                        <PopperBoardMenu
                          isOpen={isMenuOpen}
                          buttonRef={{ current: buttonRefs.current[board._id] }}
                          onOpenBoard={() => goToBoardDetails(board._id)}
                          onRename={() => handleRename(board._id)}
                          onToggleFavorite={() => handleToggleFavorite(board._id)}
                          onDelete={() => handleDelete(board._id)}
                          onClose={() => setIsMenuOpen(false)}
                          isFavorite={board.isStarred}
                        />
                      )}
                    </div>
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