// import { combineReducers, compose, createStore } from "redux"
import { combineReducers, compose, legacy_createStore as createStore } from "redux"
import { userReducer } from "./reducers/user.reducer.js"
import { toyReducer } from "./reducers/toy.reducer.js"
import { devToolReducer } from "./reducers/dev-tool.reducer.js"

// const { createStore, compose, combineReducers } = Redux

const rootReducer = combineReducers({
    userModule: userReducer,
    toyModule: toyReducer,
    devToolModule: devToolReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
