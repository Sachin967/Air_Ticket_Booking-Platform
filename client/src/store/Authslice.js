import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     Userisloggedin: false,
     userdetails: null,
}

const userDetailsFromLocalStorage = localStorage.getItem('userdetails')
     ? JSON.parse(localStorage.getItem('userdetails'))
     : null

if (userDetailsFromLocalStorage) {
     initialState.Userisloggedin = true
     initialState.userdetails = userDetailsFromLocalStorage
}

const Authslice = createSlice({
     name: 'Auth',
     initialState,
     reducers: {
          Userlogin(state, action) {
               state.Userisloggedin = true
               state.userdetails = action.payload
               localStorage.setItem('userdetails', JSON.stringify(action.payload))
          },
          UserLogout(state) {
               state.Userisloggedin = false
               state.userdetails = null
               localStorage.removeItem('userdetails')
          },
     },
})

export const AuthActions = Authslice.actions

export default Authslice.reducer
