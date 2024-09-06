import axios from 'axios';

const Api = axios.create({
    baseURL: 'https://backend-api-2enapzyoua-et.a.run.app'
    // baseURL: 'http://0.0.0.0:3000'
})

export default Api
