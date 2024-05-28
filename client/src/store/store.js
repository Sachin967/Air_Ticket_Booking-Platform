import { configureStore, combineReducers } from '@reduxjs/toolkit'
import Authslice from './Authslice'

const rootReducer = combineReducers({
     auth: Authslice.reducer,
})

const Store = configureStore({
     reducer: rootReducer,
     devTools: true,
})

export default Store
