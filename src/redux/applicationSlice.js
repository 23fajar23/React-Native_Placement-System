import {createSlice} from "@reduxjs/toolkit";
import {createApplication, getApplicationsByTraineeId} from "../api/application";
import {getApplicationById} from "../api/application";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applications: [],
        traineeApplications: [],
        selectedApplication: null,
        status: null,
        error: null,
        loading: false,
    },
    reducers: {
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getApplicationsByTraineeId.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(getApplicationsByTraineeId.fulfilled, (state, action) => {
                state.loading = false;
                state.traineeApplications = action.payload.data.applications;
            })
            .addCase(getApplicationsByTraineeId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getApplicationById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(getApplicationById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedApplication = action.payload.data;
            })
            .addCase(getApplicationById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(createApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action.payload.status;
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {setStatus, setError} = applicationSlice.actions


export default applicationSlice.reducer;