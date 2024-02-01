import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import pageReducer from '../features/pageControl/pageSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        page: pageReducer,
    }
})

export default store;
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;