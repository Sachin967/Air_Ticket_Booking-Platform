import axios from 'axios'

function createAxiosInstance(baseURL, withCredentials = false) {
     return axios.create({
          baseURL,
          withCredentials,
     })
}

const users = createAxiosInstance('http://localhost:4000/api/auth', true)
