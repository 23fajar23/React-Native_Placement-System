import {createSlice} from "@reduxjs/toolkit";
import {getBatches} from "../api/batch";
import {getBatchById} from "../api/batch";

const batchSlice = createSlice({
    name: 'batch',
    initialState: {
        batches: [],
        selectedBatch: null,
        status: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBatches.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(getBatches.fulfilled, (state, action) => {
                state.loading = false;
                state.batches = action.payload.data;
            })
            .addCase(getBatches.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default batchSlice.reducer;