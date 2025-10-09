
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'carDB'
const BASE_URL = '/api/car/'

export const carService = {
    query,
    getById,
    save,
    remove,
    getEmptyCar,
    getDefaultFilter,
    getRandomCar
}


function query(filterBy = {}) {
    return axios.get(BASE_URL, { params: filterBy }).then(res => res.data)
}

function getById(carId) {
    return axios.get(BASE_URL + carId).then(res => res.data)

}
function remove(carId) {
    return axios.delete(BASE_URL + carId).then(res => res.data) // api/car/c102/remove
}

function save(car) {
    if (car._id) {
        return axios.put(BASE_URL + car._id, car).then(res => res.data)
    } else {
        return axios.post(BASE_URL, car).then(res => res.data)
    }
}


function getEmptyCar() {
    return {
        vendor: '',
        price: '',
        speed: '',
    }
}

function getRandomCar() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        speed: utilService.getRandomIntInclusive(90, 200),
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', minSpeed: '' }
}



