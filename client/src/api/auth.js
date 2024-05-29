import axios from 'axios'
const baseURL = 'http://localhost:4000/api/auth'

export const register = async (userData) => {
     try {
         const response = await axios.post(`${baseURL}/register`, userData, {
              withCredentials: true,
         })
          return response.data
     } catch (error) {
          console.error('Error registering user:', error)
          throw error
     }
}

export const login = async (userData) => {
     try {
          const response = await axios.post(`${baseURL}/login`, userData, { withCredentials: true })
          return response.data
     } catch (error) {
          console.error('Error logging in:', error)
          throw error
     }
}

export const adminlogin = async (adminData) => {
     try {
          const response = await axios.post(`${baseURL}/admin-login`, adminData, {
               withCredentials: true,
          })
          return response.data
     } catch (error) {
          console.error('Error logging in as admin:', error)
          throw error
     }
}

export const logout = async () => {
     try {
          const response = await axios.post(`${baseURL}/logout`, null, { withCredentials: true })
          return response.data.status
     } catch (error) {
          console.error('Error logging out:', error)
          throw error
     }
}

export const adminlogout = async () => {
     try {
           const response = await axios.post(`${baseURL}/admin-logout`, null, {
                withCredentials: true,
           })
          return response.data.status
     } catch (error) {
          console.error('Error logging out as admin:', error)
          throw error
     }
}
