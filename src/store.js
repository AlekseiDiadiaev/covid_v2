import { configureStore } from '@reduxjs/toolkit';
import datePickerSlice from './slices/datePickerSlice';
import covidDataSlice from './slices/covidDataSlice';


const store = configureStore({
    reducer: {
        datePickerSlice,
        covidDataSlice
    },
    middleware: defaultMiddleware => defaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;