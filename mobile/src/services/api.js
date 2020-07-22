import axios from 'axios'

const api = axios.create({
    baseURL: 'https://3333-deb914b3-7f81-4317-9e48-0112c52cd28d.ws-us02.gitpod.io'
})

export default api