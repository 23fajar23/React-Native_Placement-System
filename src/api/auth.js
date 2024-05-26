import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

export const login = createAsyncThunk('/auth/login', async ({email, password}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/auth/login', {email, password});
            const token = response.data.data.token;
            await SecureStore.setItemAsync('userToken', token);
            return response.data;
        } catch (error) {
            let errorMessage;
            if (error.response) {
                errorMessage = 'Login Failed!';
            } else if (error.message === 'Network Error') {
                errorMessage = 'Network Error!';
            }
            return rejectWithValue({message: errorMessage, status: error.response ? error.response.status : null});
        }
    })
;

export const logout = createAsyncThunk('/auth/logout', async () => {
    await SecureStore.deleteItemAsync('userToken');
});