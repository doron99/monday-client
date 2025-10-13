export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const SAVE_BOARD = 'SAVE_BOARD'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_LOADING = 'SET_LOADING'
export const SET_FAVORITES = 'SET_FAVORITES'

const initialState = {
  boards: [],
  selectedBoard: null,
  favorites: [],
  filterBy: { txt: '', isStarred: false },
  isLoading: false,
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOARDS:
      return { ...state, boards: action.boards }

    case SET_BOARD:
      return { ...state, selectedBoard: action.board }

    case REMOVE_BOARD:
      return { ...state, boards: state.boards.filter(b => b._id !== action.boardId) }

    case SAVE_BOARD: {
      const exists = state.boards.some(b => b._id === action.board._id)
      const boards = exists
        ? state.boards.map(b => (b._id === action.board._id ? action.board : b))
        : [...state.boards, action.board]
      return { ...state, boards }
    }

    case SET_FAVORITES:
      return { ...state, favorites: action.favorites }

    case SET_FILTER_BY:
      return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

    case SET_LOADING:
      return { ...state, isLoading: action.isLoading }

    default:
      return state
  }
}
