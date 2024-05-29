import {getTraineeById, updateTrainee} from "../api/trainee";
import {createSlice} from "@reduxjs/toolkit";

const traineeSlice = createSlice({
    name: 'trainee',
    initialState: {
        selectedTrainee: null,
        status: null,
        error: null,
        loading: false,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTraineeById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(getTraineeById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedTrainee = action.payload.data;
            })
            .addCase(getTraineeById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateTrainee.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(updateTrainee.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action.payload.status;
                state.selectedTrainee = action.payload.data;
            })
            .addCase(updateTrainee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {setStatus} = traineeSlice.actions

export default traineeSlice.reducer;