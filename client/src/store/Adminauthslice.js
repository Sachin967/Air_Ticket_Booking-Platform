import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     Adminisloggedin: false,
     adminDetails: null,
}
const adminDetailsFromLocalStorage = localStorage.getItem('adminDetails')
     ? JSON.parse(localStorage.getItem('adminDetails'))
     : null

if (adminDetailsFromLocalStorage) {
     initialState.Adminisloggedin = true
     initialState.adminDetails = adminDetailsFromLocalStorage
}

const AdminSlice = createSlice({
     name: 'Admin',
     initialState,
     reducers: {
          AdminLogin(state, action) {
               state.Adminisloggedin = true
               state.adminDetails = action.payload
               localStorage.setItem('adminDetails', JSON.stringify(action.payload))
          },
          AdminLogout(state) {
               state.Adminisloggedin = false
               state.adminDetails = []
               localStorage.removeItem('adminDetails')
          },
     },
})

export const AdminActions = AdminSlice.actions

export default AdminSlice.reducer
