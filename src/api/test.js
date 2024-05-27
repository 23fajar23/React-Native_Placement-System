import axiosInstance from "./axiosInstance";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getTests = createAsyncThunk(
    'test/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('/placement/all');
            return response.data;
        } catch (error) {
            let errorMessage;
            if (error.message === 'Network Error') {
                errorMessage = 'Network Error!';
            }
            return rejectWithValue({message: errorMessage, status: error.response ? error.response.status : null});
        }
    }
);

export const getTestById = createAsyncThunk(
    `test/getById`,
    async (testId, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`/placement/${testId}`);
            return response.data
        } catch (error) {
            let errorMessage;
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = 'Invalid ID Test!';
                        break;
                    case 404:
                        errorMessage = 'Test Not Found!';
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