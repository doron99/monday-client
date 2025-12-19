import { httpService } from './http.service.js'

export const boardService = {
  query,
  getById,
  remove,
  save,
  updateBoard,
  getFavorites
}

/**
 * GET /api/board
 */
async function query(filterBy = {}) {
  return httpService.get('board', filterBy)
}

/**
 * GET /api/board/:id
 */
async function getById(boardId) {
  return httpService.get(`board/${boardId}`)
}

/**
 * DELETE /api/board/:id
 */
async function remove(boardId) {
  return httpService.delete(`board/${boardId}`)
}

/**
 * POST   /api/board
 * PUT    /api/board/:id
 */
async function save(board) {
  if (board._id) {
    return httpService.put(`board/${board._id}`, board)
  }
  return httpService.post('board', board)
}

/**
 * PUT /api/board/:id/update
 */
async function updateBoard(board, gid = null, tid = null, update) {
  const boardId = typeof board === 'string' ? board : board?._id
  if (!boardId) throw new Error('Missing boardId in updateBoard')

  const { key, value } = update || {}
  if (!key) throw new Error('Missing update.key in updateBoard')

  return httpService.put(`board/${boardId}/update`, {
    gid,
    tid,
    key,
    value
  })
}


async function getFavorites() {
  const boards = await query()
  return boards.filter(board => board.isStarred)
}
