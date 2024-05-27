import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import traineeSlice from "./traineeSlice";
import batchSlice from "./batchSlice";
import educationSlice from "./educationSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        trainee: traineeSlice,
        batch: batchSlice,
        education: educationSlice,
    },
});

export default store;