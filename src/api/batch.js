import axiosInstance from "./axiosInstance";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getBatches = createAsyncThunk(
    'batch/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('/batch/all');
            return response.data;
        } catch (error) {
            let errorMessage;
            if (error.message === 'Network Error') {
                errorMessage = 'Network Error!';
            }
            return rejectWithValue({message: errorMessage, status: error.response ? error.response.status : null});
        }
    });

export const getBatchById = createAsyncThunk(
    `batch/getById`,
    async (batchId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/batch/${batchId}`);
            return response.data
        } catch (error) {
            let errorMessage;
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Invalid ID Batch!';
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