import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import boardsData from '../assets/data/data.json'
import { userService } from './user.service.js'

const STORAGE_KEY  = 'boardDB'

export const boardService = {
  query,
  getById,
  remove,
  save,
  updateBoard,
  getFavorites,
  getEmptyBoard,
  getDefaultFilter,
  getEmptyTask,
  getEmptyGroup
}

async function query(filterBy = {}) {
  try {
    let boards = await storageService.query(STORAGE_KEY)

    if (!boards || !boards.length) {
      console.log('Loading boards from data.json...')
      boards = [...boardsData]
      for (const board of boards) {
        await storageService.postEntityWithIdFirstTime(STORAGE_KEY, board)
      }
    }

    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      boards = boards.filter(board => regExp.test(board.title))
    }

    if (filterBy.isStarred) {
      boards = boards.filter(board => board.isStarred)
    }

    return boards
  } catch (err) {
    console.error('Cannot load boards:', err)
    throw err
  }
}




async function getById(boardId) {
  try {
    return await storageService.get(STORAGE_KEY , boardId)
  } catch (err) {
    console.error('Cannot get board:', err)
    throw err
  }
}

async function remove(boardId) {
  try {
    await storageService.remove(STORAGE_KEY , boardId)
  } catch (err) {
    console.error('Cannot remove board:', err)
    throw err
  }
}

async function save(board) {
  try {
    if (board._id) {
      return await storageService.put(STORAGE_KEY, board)
    } else {
      board._id = utilService.makeId()
      board.createdAt = Date.now()
      board.lastVisited = Date.now()
      board.createdBy = { username: 'Guest' }
      board.isStarred = false
      board.cmpOrder = board.cmpOrder || ["side", "taskTitle", "status", "priority", "date", "members"]


      board.activities = []
      board.statuses = getInitialStatuses();
      board.priorities = getInitialPriorities();
      board.members = getInitialMembers();

      return await storageService.post(STORAGE_KEY, board)
    }
  } catch (err) {
    console.error('Cannot save board:', err)
    throw err
  }
}



function getInitialStatuses() {
  return [
      { "id": "l101", "label": "Done", "color": "#00c875" },
      { "id": "l102", "label": "Progress", "color": "#0086c0" },
      { "id": "l103", "label": "Stuck", "color": "#e2445c" },
      { "id": "l104", "label": "Working on it", "color": "#fdab3d" },
      { "id": "l105", "label": "Not started", "color": "#c4c4c4" }
    ];
}
function getInitialPriorities() {
  return [
      { "id": "l201", "label": "Low", "color": "#0086c0" },
      { "id": "l202", "label": "Medium", "color": "#fdab3d" },
      { "id": "l203", "label": "High", "color": "#e2445c" }
    ];
}
function getInitialMembers() {
  return [
      { "_id": "u100", "name": "Doron test" },
      { "_id": "u101", "name": "Gil test" },
      { "_id": "u102", "name": "Mira test" }
    ];
}


function updateBoard(board, gid, tid, { key, value }) {

  if (!board) return

  try {
    // Create a deep copy of the board to avoid mutation
    const updatedBoard = JSON.parse(JSON.stringify(board));
    
    const gIdx = updatedBoard.groups.findIndex(g => g.id === gid)
    const tIdx = updatedBoard.groups[gIdx]?.tasks.findIndex(t => t.id === tid)

    if (gIdx !== -1 && tIdx === -1) {
      //const prevValue = updatedBoard.groups[gIdx][key]
      //createActivity(updatedBoard._id, gid, null, key, value, prevValue)
      updatedBoard.groups[gIdx][key] = value
      console.log('UPDATE GROUP:', JSON.stringify(updatedBoard, null, 2))
    } else if (gIdx !== -1 && tIdx !== -1) {
      //const prevValue = updatedBoard.groups[gIdx].tasks[tIdx][key]
      //createActivity(updatedBoard._id, gid, tid, key, value, prevValue)
      updatedBoard.groups[gIdx].tasks[tIdx][key] = value
      //console.log('UPDATE TASK:', JSON.stringify(updatedBoard, null, 2))
    } else {
      //const prevValue = updatedBoard[key]
      //createActivity(updatedBoard._id, null, null, key, value, prevValue)
      updatedBoard[key] = value
      console.log('UPDATE BOARD:', JSON.stringify(updatedBoard, null, 2))
    }

    save(updatedBoard)
    return updatedBoard
  } catch (err) {
    console.error('updateBoard failed:', err)
  }
}

function getEmptyBoard() {
  let itemCounter = 1; 

  const board = {
    title: 'New Board',
    isStarred: false,
    createdAt: Date.now(),
    lastVisited: Date.now(),
    createdBy: userService.getLoggedinUser() || { fullname: 'Guest' },
    style: {},
    labels: [],
    members: [],
    cmpOrder: ["side", "taskTitle", "status", "priority", "date", "members"],
    groups: [],
    activities: [],
  }

  for (let i = 1; i <= 2; i++) {
    const group = getEmptyGroup()
    group.title = `Group ${i}`

    group.tasks.push(getEmptyTask(`Item ${itemCounter++}`))
    group.tasks.push(getEmptyTask(`Item ${itemCounter++}`))

    board.groups.push(group)
  }

  return board
}





async function getFavorites() {
  const boards = await query()
  return boards.filter(board => board.isStarred)
}

function getDefaultFilter() {
  return { txt: '', isStarred: false }
}

function getEmptyTask(title = "New item") {
  return {
    id: utilService.makeId(),
    side: "right",
    taskTitle: title,   
    status: "Not started",
    priority: "Low",
    members: [],
    date: null,
    comments: [],
    isDeleted: false,
    isArchived: false
  }
}


function getEmptyGroup() {
  return {
    id: utilService.makeId(),
    title: "New group",
    style: { color: utilService.getRandomColor() },
    tasks: []
  }
}

