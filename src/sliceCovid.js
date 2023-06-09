import { createSlice } from '@reduxjs/toolkit'


export const covidSlice = createSlice({
    name: 'covid',
    initialState: {
        minDate: 0,
        maxDate: 0,
        selectedStartDate: 0,
        selectedEndDate: 0,
        allData: [],
        currentData: [],
        countryList: [],
    },
    reducers: {
        increment(state) {
            state.minDate++ ;
        },
    },
    extraReducers: (builder) => {
        // builder
        //   .addCase(incrementBy, (state, action) => {
        //     // action is inferred correctly here if using TS
        //   })
        //   // You can chain calls, or have separate `builder.addCase()` lines each time
        //   .addCase(decrement, (state, action) => {})
        //   // You can match a range of action types
        //   .addMatcher(
        //     isRejectedAction,
        //     // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        //     (state, action) => {}
        //   )
        //   // and provide a default case if no other handlers matched
        //   .addDefaultCase((state, action) => {})
    },
})

export default covidSlice.reducer

export const {
    increment
} = covidSlice.actions;