import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // User data
    token: null, // Authentication token
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            const { user, token } = action.payload || {};
            state.user = user ?? null; // Default to null if undefined
            state.token = token ?? null; // Default to null if undefined
        },
        clearUser(state) {
            state.user = null;
            state.token = null;
        },
    }
})

// console.log(userSlice.reducer.value);

export const { setUser, clearUser } = userSlice.actions;

export const userReducer = userSlice.reducer;