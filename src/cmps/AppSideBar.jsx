import { useEffect, useState, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  loadBoards,
  loadFavorites,
  removeBoard,
  addBoard,
  updateBoard,
} from "../store/actions/board.actions.js"
import { toggleBoardStar } from "../store/actions/user.actions.js"
import { BoardFilter } from "../cmps/filters/BoardFilter.jsx"
import { PopperBoardMenu } from "../cmps/contextMenuCmps/PopperBoardMenu.jsx"
import {
  EllipsisHorizontalIcon,
  PlusIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { SvgIcon } from "../cmps/SvgIcon.jsx"


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
  const [activeBoard, setActiveBoard] = useState(null)

  const buttonRefs = useRef({})

  const { pathname } = location
  const currentBoardId = pathname.startsWith("/board/")
    ? pathname.split("/")[2]
    : null

  useEffect(() => {
    loadBoards()
    loadFavorites()
  }, [])

  const toggleFavorites = () => setIsFavoritesOpen(!isFavoritesOpen)
  const goToHome = () => navigate("/")
  const goToBoard = () => navigate("/board")

  const isBoardActive = () =>
    pathname === "/board" || pathname === "/board/"

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
    if (!newName?.trim()) return

    const update = { key: "title", value: newName.trim() }
    updateBoard(null, null, update)
  }

  function handleToggleFavorite(boardId) {
    const board = boards.find(b => b._id === boardId)
    if (!board) return

    // Optimistic UI update: toggle the star immediately
    const boardsCopy = boards.map(b =>
      b._id === boardId ? { ...b, isStarred: !b.isStarred } : b
    )
    // Note: In a real app, you might want to update Redux state here for immediate UI feedback
    // For now, we rely on the backend response and Redux dispatch in the action

    // Call the user action to toggle board star
    toggleBoardStar(boardId)
      .then(() => {
        // Reload boards and favorites to sync with backend state
        loadBoards()
        loadFavorites()
      })
      .catch((err) => {
        console.error('Failed to toggle favorite:', err)
        // Optionally show error message to user
      })
  }

  async function handleDelete(boardId) {
    const confirmDelete = confirm("Are you sure you want to delete this board?")
    if (!confirmDelete) return

    await removeBoard(boardId)
    await loadFavorites()

    if (pathname.includes(`/board/${boardId}`)) navigate("/board")
  }

  return (
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {isOpen && (
          <div className="sidebar-content">

            <nav className="sidebar-nav">
              <div
                className={`nav-item ${pathname === "/" ? "active" : ""}`}
                onClick={goToHome}
              >
                <SvgIcon icon="home" color="#6b6c72" />
                <span>Home</span>
              </div>

              <div
                className={`nav-item ${isBoardActive() ? "active" : ""}`}
                onClick={goToBoard}
              >
                <SvgIcon icon="calendarCheck" />
                <span>My work</span>
              </div>
            </nav>

            <section className="favorites">
              <div className="favorites-header" onClick={toggleFavorites}>
                <span>Favorites</span>
                {isFavoritesOpen ? (
                  <ChevronDownIcon style={{ width: "16px", height: "16px" }} />
                ) : (
                  <ChevronRightIcon style={{ width: "16px", height: "16px" }} />
                )}
              </div>

              {isFavoritesOpen && (
                <ul>
                  {favorites.length > 0 ? (
                    favorites.map(board => (
                      <li key={board._id} onClick={() => goToBoardDetails(board._id)}
                      className={currentBoardId === board._id ? "active-board" : ""}>
                        <SvgIcon icon="layout" size={18} color="#1e1f21" />
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
                {!isFilterOpen && <span>Workspaces</span>}
                <BoardFilter onToggleFilter={setIsFilterOpen} />
              </div>

              <div className="workspace-item">
                <span>
                  Guest's main workspace
                </span>

                <button className="add-btn" onClick={onAddBoard}>
                  <PlusIcon className="add-icon" />
                </button>
              </div>

              <ul>
                {boards.map(board => (
                  <li
  key={board._id}
  className={`
    board-item 
    ${currentBoardId === board._id ? "active-board" : ""}
  `}
>
  <div
    onClick={() => goToBoardDetails(board._id)}
    className="board-title-section"
  >
    <SvgIcon icon="layout" size={18} color="#1e1f21" />
    <span className="truncate">{board.title}</span>
  </div>

  <div className="board-actions">
    <button
  className="ellipsis-btn"
  ref={el => (buttonRefs.current[board._id] = el)}
  onClick={(e) => {
    e.stopPropagation()
    setActiveBoard(board)
    setActiveBoardId(board._id)
    setIsMenuOpen(prev =>
      board._id !== activeBoardId || !prev
    )
  }}
>
  <EllipsisHorizontalIcon />
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
