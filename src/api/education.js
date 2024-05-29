import axiosInstance from "./axiosInstance";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const getEducations = createAsyncThunk(
    'education/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get('/education/all');
            return response.data;
        } catch (error) {
            let errorMessage;
            if (error.message === 'Network Error') {
                errorMessage = 'Network error!';
            }
            return rejectWithValue({message: errorMessage, status: error.response ? error.response.status : null});
        }
    });
