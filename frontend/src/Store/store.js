import { configureStore } from '@reduxjs/toolkit'
import { displayPageReducer } from './DisplayPage/DisplayPageSlice'
import { userReducer } from './User.js/UserSlice'

export const store = configureStore({
    reducer: {
        displayPageReducer,
        userReducer,
    }
})