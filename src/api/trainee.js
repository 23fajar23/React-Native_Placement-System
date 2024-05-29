import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

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
                        errorMessage = 'Invalid ID trainee!';
                        break;
                    case 404:
                        errorMessage = 'Trainee not found!';
                        break;
                    default:
                        errorMessage = 'Unknown error occurred!';
                }
            } else if (error.message === 'Network Error') {
                errorMessage = 'Network error!';
            }
            return rejectWithValue({
                message: errorMessage,
                status: error.response ? error.response.status : null,
            });
        }
    }
);

export const updateTrainee = createAsyncThunk(
    'trainee/update',
    async (traineeData, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.put('/customer', traineeData);
            return response.data;
        } catch (error) {
            let errorMessage
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Invalid data!';
                        break;
                    case 404:
                        errorMessage = 'Account not found!';
                        break;
                    case 409:
                        errorMessage = 'Account data already exist!';
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
