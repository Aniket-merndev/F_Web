import { createSlice } from "@reduxjs/toolkit";

const displayPageSlice = createSlice({
    name: 'displayPage',
    initialState: {
        value: false
    },
    reducers: {
        setDisplayPage: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setDisplayPage } = displayPageSlice.actions

export const displayPageReducer = displayPageSlice.reducer