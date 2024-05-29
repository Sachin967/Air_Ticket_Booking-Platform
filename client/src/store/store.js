import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Authslice'
import adminReducer from './Adminauthslice'

const Store = configureStore({
     reducer: {
          auth: authReducer,
          admin: adminReducer,
     },
     devTools: true,
})

export default Store
