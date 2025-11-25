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
  SET_HIDDEN_COLUMNS,
} from '../reducers/board.reducer.js'


export const boardActions = {
  filterBoard
}
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
  if (!board || !board.groups) return board;

  const txt = filterBy.txt?.toLowerCase() || "";
  const membersFilter = filterBy.members || [];
  const isStarred = filterBy.isStarred || false;
  const sort = filterBy.sort || null;

  const txtExists = !!txt;

  let filteredBoard = {
    ...board,
    groups: board.groups.map(group => {
      let tasks = group.tasks.map(task =>
        enrichTaskMembersSafe(task, board.members)
      );

      if (txtExists) {
        tasks = tasks.filter(task => deepSearch(task, txt));
      }

      if (membersFilter.length) {
        tasks = tasks.filter(task =>
          task.membersDetails?.some(m => membersFilter.includes(m._id))
        );
      }

      if (isStarred) {
        tasks = tasks.filter(task => task.isStarred);
      }

      if (sort) {
        const { by, dir } = sort;
        tasks = [...tasks].sort((a, b) => sortTasks(a, b, by, dir));
      }

      return { ...group, tasks };
    })
  };

  if (txtExists || membersFilter.length || isStarred) {
    filteredBoard.groups = filteredBoard.groups.filter(g => g.tasks.length);
  }

  return filteredBoard;
}


export function setHiddenColumns(hiddenColumns) {
  store.dispatch({ 
    type: SET_HIDDEN_COLUMNS, 
    hiddenColumns 
  });
}

function enrichTaskMembersSafe(task, boardMembers) {
  return {
    ...task,
    membersDetails: (task.members || []).map(memberId => {
      return boardMembers.find(m => m._id === memberId) || null;
    }).filter(Boolean)
  };
}


export async function addTaskToFirstGroup() {
  const board = store.getState().boardModule.selectedBoard
  if (!board) throw new Error("No board selected")

  const firstGroup = board.groups[0]
  if (!firstGroup) throw new Error("Board has no groups")

  const newTask = boardService.getEmptyTask()
  const newTasks = [...firstGroup.tasks, newTask]

  return updateBoard(firstGroup.id, null, {
    key: "tasks",
    value: newTasks
  })
}


export async function addGroupWithTask() {
  const board = store.getState().boardModule.selectedBoard
  if (!board) throw new Error("No board selected")

  const newGroup = boardService.getEmptyGroup()
  const newTask = boardService.getEmptyTask()

  newGroup.tasks = [newTask]

  return updateBoard(null, null, {
    key: "groups",
    value: [...board.groups, newGroup]
  })
}

function sortTasks(a, b, by, dir = "asc") {
  const factor = dir === "desc" ? -1 : 1;

  switch (by) {

    case "status":
      return a.status.localeCompare(b.status) * factor;

    case "priority":
      return a.priority.localeCompare(b.priority) * factor;

    case "taskTitle":
      return a.taskTitle.localeCompare(b.taskTitle) * factor;

    case "date": {
      const aDate = a.date ? new Date(a.date) : 0;
      const bDate = b.date ? new Date(b.date) : 0;
      return (aDate - bDate) * factor;
    }

    case "members":
      return ((a.members?.length || 0) - (b.members?.length || 0)) * factor;

    default:
      return 0;
  }
}
