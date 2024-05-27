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
