import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './taskSlice';
import authSlice from './authSlice';

 const store = configureStore({
    reducer: {
        task: taskSlice,
        auth: authSlice,
    }
})

export default store;