import { SET_DEV } from "../reducers/dev-tool.reducer.js";
import { store } from "../store.js";

export function setDev(blnValue) {
    //const filterBy = store.getState().carModule.filterBy
    console.log('setDev')
    store.dispatch({ type: SET_DEV, isDev: blnValue })
    // return carService.query(filterBy)
    //     .then(cars => {
    //         store.dispatch({ type: SET_CARS, cars })
    //     })
    //     .catch(err => {
    //         console.log('car action -> Cannot load cars', err)
    //         throw err
    //     })
    //     .finally(() => {
    //         store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    //     })
}

