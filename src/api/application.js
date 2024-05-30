import axiosInstance from "./axiosInstance";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getApplicationsByTraineeId = createAsyncThunk(
    'application/getAllByTraineeId',
    async (traineeId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/customer/${traineeId}`);
            return response.data;
        } catch (error) {
            let errorMessage;
            if (error.message === 'Network Error') {
                errorMessage = 'Network error!';
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
                        errorMessage = 'Invalid ID application!';
                        break;
                    case 404:
                        errorMessage = 'Application not found!';
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

export const createApplication = createAsyncThunk(
    `application/create`,
    async (applicationData, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`/user_placement/join`, applicationData);
            return response.data
        } catch (error) {
            let errorMessage
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Doesnt meet batch or education requirements!';
                        break;
                    case 404:
                        errorMessage = 'Test quota is full!';
                        break;
                    case 409:
                        errorMessage = "Already applied for this test!";
                        break;
                    case 500:
                        errorMessage = "Error 500";
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

