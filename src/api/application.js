import axiosInstance from "./axiosInstance";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getApplicationsByTraineeId = createAsyncThunk(
    'application/getAll',
    async (traineeId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/customer/${traineeId}`);
            return response.data;
        } catch (error) {
            let errorMessage;
            if (error.message === 'Network Error') {
                errorMessage = 'Network Error!';
            }
            return rejectWithValue({message: errorMessage, status: error.response ? error.response.status : null});
        }
    });

export const getApplicationById = createAsyncThunk(
    `application/getById`,
    async (applicationId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/user_placement/${applicationId}`);
            return response.data
        } catch (error) {
            let errorMessage;
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Invalid ID Application!';
                        break;
                    case 404:
                        errorMessage = 'Application Not Found!';
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