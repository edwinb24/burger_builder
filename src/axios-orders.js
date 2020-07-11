import axios from 'axios'

const instance = axios.create({
    baseURL:"https://react-my-burger-57331.firebaseio.com/"
})

export default instance