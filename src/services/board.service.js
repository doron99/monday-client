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
  getDefaultFilter
}

async function query() {
  try {
    let boards = await storageService.query(STORAGE_KEY)

    if (!boards || !boards.length) {
      console.log('Loading boards from data.json...')
      boards = [...boardsData]

      for (const board of boards) {
        await storageService.post(STORAGE_KEY , board)
      }
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
      board.createdBy = { username: 'Guest' }
      board.isStarred = false
      board.groups = []
      board.activities = []
      return await storageService.post(STORAGE_KEY, board)
    }
  } catch (err) {
    console.error('Cannot save board:', err)
    throw err
  }
}


function updateBoard(board, gid, tid, { key, value }) {
  console.log('updateBoard() =>', key, value)

  if (!board) return

  try {
    const gIdx = board.groups.findIndex(g => g.id === gid)
    const tIdx = board.groups[gIdx]?.tasks.findIndex(t => t.id === tid)

    if (gIdx !== -1 && tIdx === -1) {
      const prevValue = board.groups[gIdx][key]
      createActivity(board._id, gid, null, key, value, prevValue)
      board.groups[gIdx][key] = value
      console.log('UPDATE GROUP:', JSON.stringify(board, null, 2))
    } else if (gIdx !== -1 && tIdx !== -1) {
      const prevValue = board.groups[gIdx].tasks[tIdx][key]
      createActivity(board._id, gid, tid, key, value, prevValue)
      board.groups[gIdx].tasks[tIdx][key] = value
      console.log('UPDATE TASK:', JSON.stringify(board, null, 2))
    } else {
      const prevValue = board[key]
      createActivity(board._id, null, null, key, value, prevValue)
      board[key] = value
      console.log('UPDATE BOARD:', JSON.stringify(board, null, 2))
    }

    save(board)
    return board
  } catch (err) {
    console.error('updateBoard failed:', err)
  }
}

function getEmptyBoard() {
  return {
    title: '',
    isStarred: false,
    createdAt: Date.now(),
    createdBy: userService.getLoggedinUser() || { fullname: 'Guest' },
    style: {},
    labels: [],
    members: [],
    groups: [],
    activities: [],
  }
}

async function getFavorites() {
  const boards = await query()
  return boards.filter(board => board.isStarred)
}

function getEmptyBoard() {
  return {
    title: 'New Board',
    createdAt: Date.now(),
    isStarred: false,
    groups: [],
    members: [],
    activities: [],
  }
}

function getDefaultFilter() {
  return { txt: '', isStarred: false }
}
