import { createSlice } from '@reduxjs/toolkit'
import { minMaxDateFetch } from './asyncThunk';

export const covidDataSlice = createSlice({
    name: 'covidData',
    initialState: {
        allData: [],
        currentData: [],
        countryList: [],
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
            // .addCase(minMaxDateFetch.fulfilled, (state, action) => {
            //     const { minDate, maxDate } = action.payload
            //     state.minDate = minDate
            //     state.maxDate = maxDate
            //     state.selectedStartDate = minDate
            //     state.selectedEndDate = maxDate
            // })
            //   // You can chain calls, or have separate `builder.addCase()` lines each time
            //   .addCase(decrement, (state, action) => {})
            //   // You can match a range of action types
            //   .addMatcher(
            //     isRejectedAction,
            //     // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
            //     (state, action) => {}
            //   )
            //   // and provide a default case if no other handlers matched
            .addDefaultCase((state, action) => { })
    },
})

export default covidDataSlice.reducer

export const {

} = covidDataSlice.actions;