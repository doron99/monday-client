import { boardService } from '../../services/board.service.js'
import { store } from '../store.js'
import {
  SET_BOARDS,
  SET_BOARD,
  REMOVE_BOARD,
  SAVE_BOARD,
  SET_FILTER_BY,
  SET_LOADING,
  SET_FAVORITES,
  SET_ACTIVE_BOARD,
} from '../reducers/board.reducer.js'


export function loadBoards(filterBy) {
  store.dispatch({ type: SET_LOADING, isLoading: true })
  return boardService.query(filterBy)
    .then(boards => {
      store.dispatch({ type: SET_BOARDS, boards })
      return boards
    })
    .catch(err => {
      console.log('Cannot load boards', err)
    })
    .finally(() => {
      store.dispatch({ type: SET_LOADING, isLoading: false })
    })
}

export function loadFavorites() {
  store.dispatch({ type: SET_LOADING, isLoading: true })
  return boardService.getFavorites()
    .then(favorites => {
      store.dispatch({ type: SET_FAVORITES, favorites })
      return favorites
    })
    .catch(err => {
      console.log('Cannot load favorites', err)
    })
    .finally(() => {
      store.dispatch({ type: SET_LOADING, isLoading: false })
    })
}

export function loadBoardById(boardId) {
  store.dispatch({ type: SET_LOADING, isLoading: true })
  return boardService.getById(boardId)
    .then(board => {
      store.dispatch({ type: SET_BOARD, board })
      return board
    })
    .catch(err => {
      console.log('Cannot load board', err)
    })
    .finally(() => {
      store.dispatch({ type: SET_LOADING, isLoading: false })
    })
}

export function removeBoard(boardId) {
  return boardService.remove(boardId)
    .then(() => {
      store.dispatch({ type: REMOVE_BOARD, boardId })
    })
    .catch(err => {
      console.log('Cannot remove board', err)
    })
}

export async function updateBoard(gid = null, tid = null, update) {
  store.dispatch({ type: SET_LOADING, isLoading: true })
  try {
    const board = store.getState().boardModule.selectedBoard
    if (!board) throw new Error('No board selected in state')

    const updatedBoard = await boardService.updateBoard(board, gid, tid, update)

    store.dispatch({ type: SET_BOARD , board: updatedBoard })

    return updatedBoard
  } 
  catch (err) {
    console.error('Cannot update board', err)
    throw err
  }
  finally {
    store.dispatch({ type: SET_LOADING, isLoading: false })
  }
}



export function setFilter(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function saveBoard(board) {
  return boardService.save(board)
    .then(savedBoard => {
      store.dispatch({ type: SAVE_BOARD, board: savedBoard })
      return savedBoard
    })
    .catch(err => {
      console.log('Cannot save board', err)
      throw err
    })
}

export async function addBoard() {
  store.dispatch({ type: SET_LOADING, isLoading: true })
  try {
    const newBoard = boardService.getEmptyBoard()
    const savedBoard = await boardService.save(newBoard)
    store.dispatch({ type: SAVE_BOARD, board: savedBoard })

    await loadBoards()
    await loadFavorites()

    return savedBoard
  } catch (err) {
    console.error('Cannot add board', err)
  } finally {
    store.dispatch({ type: SET_LOADING, isLoading: false })
  }
}

export function setActiveBoard(board) {
  store.dispatch({ type: SET_ACTIVE_BOARD, board })
}


function filterBoard(board, filterBy) {
  console.log(
    'board, filterBy',board, filterBy
  )
  if (!board) return null
  let filteredGroups = board.groups

  if (filterBy.txt) {
    const txt = filterBy.txt.toLowerCase()
    filteredGroups = filteredGroups.map(group => ({
      ...group,
      tasks: group.tasks.filter(task =>
        Object.values(task).some(
          value => typeof value === "string" && value.toLowerCase().includes(txt)
        )
      ),
    }))
  }

  if (filterBy.members && filterBy.members.length > 0) {
    filteredGroups = filteredGroups.map(group => ({
      ...group,
      tasks: group.tasks.filter(task =>
        task.members?.some(member =>
          typeof member === "string"
            ? filterBy.members.includes(member)
            : filterBy.members.includes(member._id)
        )
      ),
    }))
  }

  // If no filters are applied (no text and no members), keep all groups
  const hasActiveFilter = Boolean(filterBy.txt) || (filterBy.members && filterBy.members.length > 0)

  if (hasActiveFilter) {
    filteredGroups = filteredGroups.filter(g => g.tasks.length > 0)
  }

  return { ...board, groups: filteredGroups }
}
