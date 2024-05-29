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
                        errorMessage = 'Invalid Data!';
                        break;
                    case 404:
                        errorMessage = 'Account Not Found!';
                        break;
                    case 409:
                        errorMessage = 'Account Data Already Exist!';
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
