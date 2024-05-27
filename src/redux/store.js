import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import traineeSlice from "./traineeSlice";
import batchSlice from "./batchSlice";
import educationSlice from "./educationSlice";
import testSlice from "./testSlice";
import bookmarkSlice from "./bookmarkSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        trainee: traineeSlice,
        batch: batchSlice,
        education: educationSlice,
        test: testSlice,

        bookmark: bookmarkSlice,
    },
});

export default store;