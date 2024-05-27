import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    bookmarkedTests: [],
};

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        toggleBookmark: (state, action) => {
            const id = action.payload;
            state.bookmarkedTests[id] = !state.bookmarkedTests[id];
        },
    },
});

export const {toggleBookmark} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;