import {createSlice} from "@reduxjs/toolkit";
import {login, logout, registerTrainee} from "../api/auth";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        status: null,
        error: null,
        loading: false,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        deleteToken: (state) => {
            state.token = null
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.status = null;
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.status = action.payload.status;
                state.token = action.payload.data.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.status = null;
                state.error = null;
            })

            .addCase(registerTrainee.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = null
            })
            .addCase(registerTrainee.fulfilled, (state, action) => {
                state.loading = false;
                state.status = action.payload.status;
            })
            .addCase(registerTrainee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {setToken, deleteToken, setStatus} = authSlice.actions

export default authSlice.reducer;