import { createStore, combineReducers, compose } from 'redux'
import { boardReducer } from './reducers/board.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { devToolReducer } from './reducers/dev-tool.reducer.js'

const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer,
  devToolModule: devToolReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store