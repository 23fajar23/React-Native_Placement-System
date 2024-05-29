import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
import * as SecureStore from "expo-secure-store";

export const login = createAsyncThunk('auth/login/mobile', async ({email, password}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/auth/login/mobile', {email, password});
            const token = response.data.data.token;
            const userId = response.data.data.user.id
            await SecureStore.setItemAsync('userId', userId)
            await SecureStore.setItemAsync('userToken', token);
            return response.data;
        } catch (error) {
            let errorMessage
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Invalid email or password!';
                        break;
                    case 404:
                        errorMessage = 'User not found!';
                        break;
                    default:
                        errorMessage = 'Unknown error occurred!';
                }
            } else if (error.message === 'Network Error') {
                errorMessage = 'Network error!';
            }
            return rejectWithValue({message: errorMessage, status: error.response ? error.response.status : null});
        }
    })
;

export const logout = createAsyncThunk('auth/logout', async () => {
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userId')
});

export const registerTrainee = createAsyncThunk(
    'auth/register/trainee',
    async (traineeData, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post('/auth/register/customer', traineeData);
            return response.data;
        } catch (error) {
            let errorMessage
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Invalid data!';
                        break;
                    case 409:
                        errorMessage = 'Account already exist!';
                        break;
                    default:
                        errorMessage = 'Unknown error occurred!';
                }
            } else if (error.message === 'Network Error') {
                errorMessage = 'Network error!';
            }
            return rejectWithValue({message: errorMessage, status: error.response ? error.response.status : null});
        }
    }
);