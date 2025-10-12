
// import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// const STORAGE_KEY = 'baordDB'

// export const boardService = {
//     query,
//     getById,
//     save,
//     remove,
//     getEmptyToy,
//     getRandomToy,
//     getDefaultFilter,
//     getLabels,
//     getFilterFromSrcParams
// }

// //,'b','c','d','e','f','g','h']
// // const cats = ['a']
// // const arrToFilter = [{id:1,cats:['a','b','c']}]
// function query(filterBy = {}) {
//     return storageService.query(STORAGE_KEY)
//         .then(toys => {
//             //if (!toys) return [];
//             if (!filterBy.name) filterBy.name = ''

//             // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
//             // if (!filterBy.minSpeed) filterBy.minSpeed = -Infinity
//             const regExp = new RegExp(filterBy.name, 'i');

//             if (filterBy.labels.length > 0) {
//                 toys = toys.filter(item => 
//                     item.labels.some(lbl => filterBy.labels.includes(lbl))
//                 );
//             }
//             if (filterBy.inStock == 'inStock') {
//                 toys = toys.filter(toy => toy.inStock == true);
//             }
//             if (filterBy.inStock == 'outOfStock') {
//                 toys = toys.filter(toy => toy.inStock == false);
//             }
//             if (filterBy.name.length > 0) {
//                 toys = toys.filter(toy => regExp.test(toy.name));
//             }
//             const isDescending = filterBy.isDesc ? -1 : 1;
//             if (filterBy.orderBy == 'createdAt') {
//                 toys = toys.sort((a, b) => {
//                     return (a.createdAt - b.createdAt) * isDescending; // Ascending order
//                 });
//             }
//             if (filterBy.orderBy == 'name') {
//                 toys = toys.sort((a, b) => {
//                     return  (a.name.localeCompare(b.name)) * isDescending;
//                 });
//             }
//             if (filterBy.orderBy == 'price') {
//                 toys = toys.sort((a, b) => {
//                     return  (a.price > b.price) * isDescending;
//                 });
//             }
            
            
//             return toys;
//         })
// }
// function getLabels() {
//     const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
// 'Outdoor', 'Battery Powered']
//     return new Promise((resolve, reject) => {
//         resolve(labels)
//     })
// }
// function getById(toyId) {
//     return storageService.get(STORAGE_KEY, toyId)
// }

// function remove(toyId) {
//     // return Promise.reject('Not now!')
//     return storageService.remove(STORAGE_KEY, toyId)
// }


// function save(toy) {
//     if (toy._id) {
//         return storageService.put(STORAGE_KEY, toy)
//     } else {
//         // when switching to backend - remove the next line
//         toy.owner = userService.getLoggedinUser()
//         return storageService.post(STORAGE_KEY, toy)
//     }
// }

// function getEmptyToy() {
//     return {
//         name: '', 
//         price: 0, 
//         labels: [], 
//         createdAt: new Date().getTime(), 
//         inStock: true,
//     }
// }

// function getRandomLabels(arr) {
//     const count = Math.floor(Math.random() * 3) + 1; // Randomly choose 1, 2, or 3
//     const shuffled = arr.sort(() => 0.5 - Math.random()); // Shuffle the array
//     return shuffled.slice(0, count); // Return the first 'count' elements
// }
// function getRandomLabel(arr) {
//     const randomIndex = Math.floor(Math.random() * arr.length);
//     return arr[randomIndex];
// }
// function getRandomToy() {
//     const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
// 'Outdoor', 'Battery Powered']
//     const randomLabels = getRandomLabels(labels);


//     return {
//         name: `${utilService.makeId(7)} Doll`, 
//         price: utilService.getRandomIntInclusive(1000, 9000), 
//         labels: randomLabels, 
//         createdAt: new Date().getTime(), 
//         inStock: true,
//         //vendor: 'Susita-' + (Date.now() % 1000),
//         //price: utilService.getRandomIntInclusive(1000, 9000),
//         //speed: utilService.getRandomIntInclusive(90, 200),
//     }
// }

// // function getDefaultFilter() {
// //     return { txt: '', maxPrice: '', minSpeed: '' }
// // }
// function getDefaultFilter() {
//     return { name: '', labels: [], inStock: 'all',orderBy: 'createdAt', isDesc: false }
// }
// function getFilterFromSrcParams(srcParams) {
//     const name = srcParams.get('name') || ''
//     const inStock = srcParams.get('inStock') || 'all'
//     const orderBy = srcParams.get('orderBy') || 'createdAt'
//     const isDesc = srcParams.get('isDesc') || false
//     const urlLabels = srcParams.get('labels'); // Get the labels from the URL

//     //const labels = srcParams.get('labels') 
//     const allLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
// 'Outdoor', 'Battery Powered']
//     const selectedLabels = urlLabels ? urlLabels.split(',').filter(label => allLabels.includes(label.trim())) : [];
//     return {
//         name,
//         inStock,
//         orderBy,
//         isDesc,
//         labels:selectedLabels
//     }

// }

// // TEST DATA
// // storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 6', price: 980}).then(x => console.log(x))


import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import boardsData from '../../data/board.json'

const STORAGE_KEY = 'boardDB'

export const boardService = {
  query,
  getById,
  remove,
  save,
  getEmptyBoard,
  getFavorites,
  getDefaultFilter,
}


async function query() {
  let boards = await storageService.query(STORAGE_KEY)

  if (!boards || !boards.length) {
    boards = [...boardsData]
    
    for (const board of boards) {
      await storageService.post(STORAGE_KEY, board)
    }
  }

  return boards
}


async function getFavorites() {
  const boards = await query()
  return boards.filter(board => board.isStarred)
}


function getById(boardId) {
  return storageService.get(STORAGE_KEY, boardId)
}

function remove(boardId) {
  return storageService.remove(STORAGE_KEY, boardId)
}

function save(board) {
  if (board._id) {
    return storageService.put(STORAGE_KEY, board)
  } else {
    board._id = utilService.makeId()
    board.createdBy = userService.getLoggedinUser() || { fullname: 'Guest' }
    board.createdAt = Date.now()
    return storageService.post(STORAGE_KEY, board)
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

function getDefaultFilter() {
  return { txt: '', isStarred: false }
}
