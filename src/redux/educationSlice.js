import {createSlice} from "@reduxjs/toolkit";
import {getEducations} from "../api/education";

const educationSlice = createSlice({
    name: 'education',
    initialState: {
        educations: [],
        selectedEducation: null,
        status: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEducations.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(getEducations.fulfilled, (state, action) => {
                state.loading = false;
                state.educations = action.payload.data;
            })
            .addCase(getEducations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default educationSlice.reducer;