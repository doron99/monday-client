import { carService } from "../../services/car.service.js"

export const SET_DEV = 'SET_DEV'


const initialState = {
    isDev: false,
}

export function devToolReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Cars
        case SET_DEV:
            return { ...state, isDev: action.isDev }
        default:
            return state
    }
}