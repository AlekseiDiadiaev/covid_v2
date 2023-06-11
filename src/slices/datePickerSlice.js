import { createSlice } from '@reduxjs/toolkit'
import { minMaxDateFetched } from './asyncThunk';

export const datePikcerSlice = createSlice({
    name: 'datePikcer',
    initialState: {
        minDate: null,
        maxDate: null,
        selectedStartDate: null,
        selectedEndDate: null,
        loading: false,
        error: false
    },
    reducers: {
        minDateSet(state, action) {
            state.minDate = action.payload;
        },
        maxDateSet(state, action) {
            state.maxDate = action.payload;
        },
        startDateChanged(state, action) {
            state.selectedStartDate = action.payload;
        },
        endDateChanged(state, action) {
            state.selectedEndDate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(minMaxDateFetched.fulfilled, (state, action) => {
                const { minDate, maxDate } = action.payload
                state.minDate = minDate
                state.maxDate = maxDate
                state.selectedStartDate = minDate
                state.selectedEndDate = maxDate
                state.loading = false;
                state.error = false;
            })
            .addCase(minMaxDateFetched.pending, state => {
                state.loading = true;
            })
            .addCase(minMaxDateFetched.rejected, state => {
                state.error = true;
            })
            .addDefaultCase(() => { })
    },
})

export default datePikcerSlice.reducer

export const {
    minDateSet,
    maxDateSet,
    startDateChanged,
    endDateChanged
} = datePikcerSlice.actions;