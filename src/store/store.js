import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import postReducer from "./PostSlice";
import loadingReducer from "./LoadingSlice"

const store = configureStore({
    reducer:{
        auth:authReducer,
        posts:postReducer,
        loadinit:loadingReducer
    }
});

export default store;