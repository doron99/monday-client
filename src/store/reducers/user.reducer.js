import { userService } from "../../services/user.service.js"

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'


//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const UPDATE_USER_STARRED_BOARDS = 'UPDATE_USER_STARRED_BOARDS'


const initialState = {
    count: 105,
    loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Count
        case INCREMENT:
            return { ...state, count: state.count + 1 }
        case DECREMENT:
            return { ...state, count: state.count - 1 }
        case CHANGE_BY:
            return { ...state, count: state.count + action.diff }


        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        case SET_USER_SCORE:
            const loggedInUser = { ...state.loggedInUser, score: action.score }
            return { ...state, loggedInUser }
        case UPDATE_USER_STARRED_BOARDS:
            const updatedUser = { ...state.loggedInUser, starredBoardIds: action.starredBoardIds }
            return { ...state, loggedInUser: updatedUser }
        default:
            return state;
    }
}