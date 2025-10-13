import { boardService } from '../../services/board.service.js'
import { store } from '../store.js'
import {
  SET_BOARDS,
  SET_BOARD,
  REMOVE_BOARD,
  SAVE_BOARD,
  SET_FILTER_BY,
  SET_LOADING,
  SET_FAVORITES
} from '../reducers/board.reducer.js'

export function loadBoards() {
  store.dispatch({ type: SET_LOADING, isLoading: true })
  return boardService.query()
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

export function saveBoard(board) {
  return boardService.save(board)
    .then(savedBoard => {
      store.dispatch({ type: SAVE_BOARD, board: savedBoard })
      return savedBoard
    })
    .catch(err => {
      console.log('Cannot save board', err)
    })
}

export function setFilter(filterBy) {
  store.dispatch({ type: SET_FILTER_BY, filterBy })
}
