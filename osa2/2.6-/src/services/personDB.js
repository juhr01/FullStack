import axios from 'axios'

const getAll = () => {
    const promise = axios.get('http://localhost:3001/persons')
    return promise.then(response => response.data)
}

export default {
    getAll: getAll
}