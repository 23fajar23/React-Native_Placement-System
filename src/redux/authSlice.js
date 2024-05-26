import {createSlice} from "@reduxjs/toolkit";
import {login, logout} from "../api/auth";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        message: null,
        error: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.message = null;
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
                state.message = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.message = null;
                state.error = null;
            });
    },
});

export const {setToken} = authSlice.actions

export default authSlice.reducer;