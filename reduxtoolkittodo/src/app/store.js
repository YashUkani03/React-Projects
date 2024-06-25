import { configureStore } from '@reduxjs/toolkit';
import Reducers from '../features/todoSlice'

export const store = configureStore({   
    reducer : Reducers
})