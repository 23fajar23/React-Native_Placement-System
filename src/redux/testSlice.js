import {createSlice} from "@reduxjs/toolkit";
import {getTests} from "../api/test";
import {getTestById} from "../api/test";

const testSlice = createSlice({
    name: 'test',
    initialState: {
        tests: [],
        selectedTest: null,
        status: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTests.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(getTests.fulfilled, (state, action) => {
                state.loading = false;
                state.tests = action.payload.data;
            })
            .addCase(getTests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getTestById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(getTestById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTest = action.payload.data;
            })
            .addCase(getTestById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default testSlice.reducer;