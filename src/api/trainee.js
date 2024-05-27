import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

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
                        errorMessage = 'Invalid Data!';
                        break;
                    case 409:
                        errorMessage = 'Account Already Exist!';
                        break;
                    default:
                        errorMessage = 'Unknown Error Occurred!';
                }
            } else if (error.message === 'Network Error') {
                errorMessage = 'Network Error!';
            }
            return rejectWithValue({message: errorMessage, status: error.response ? error.response.status : null});
        }
    }
);

export const getTraineeById = createAsyncThunk(
    `trainee/getById`,
    async (traineeId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/customer/${traineeId}`);
            return response.data
        } catch (error) {
            let errorMessage;
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Invalid ID Trainee!';
                        break;
                    case 404:
                        errorMessage = 'Trainee Not Found!';
                        break;
                    default:
                        errorMessage = 'Unknown Error Occurred!';
                }
            } else if (error.message === 'Network Error') {
                errorMessage = 'Network Error!';
            }
            return rejectWithValue({
                message: errorMessage,
                status: error.response ? error.response.status : null,
            });
        }
    }
);