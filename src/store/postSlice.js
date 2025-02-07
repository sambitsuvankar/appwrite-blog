import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts : null
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts : (state, action) => {
            state.posts = action.payload
        }
    }

})

export const {setPosts} = postSlice.actions;

export const postReducer = postSlice.reducer;