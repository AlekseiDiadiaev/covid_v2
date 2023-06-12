import { createSlice } from '@reduxjs/toolkit'
import { dataByCountriesFetched, countriesListFetched, dataByDaysFetched } from './asyncThunk';

export const covidDataSlice = createSlice({
    name: 'covidData',
    initialState: {
        selectedData: [],
        shownData: [],
        countriesList: [],
        dataByDays: [],
        loading: false,
        error: false
    },
    reducers: {
        loadingChanged(state, action) {
            state.loading = action.payload;
        },
        shownDataSet(state, action) {
            state.shownData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(dataByCountriesFetched.fulfilled, (state, action) => {
                state.selectedData = action.payload
                state.shownData = action.payload
                state.loading = false;
                state.error = false;
            })
            .addCase(dataByCountriesFetched.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(dataByCountriesFetched.rejected, state => {
                state.error = true;
                state.loading = false;
            })
            .addCase(dataByDaysFetched.fulfilled, (state, action) => {
                state.dataByDays = action.payload
                state.loading = false;
                state.error = false;
            })
            .addCase(dataByDaysFetched.pending, state => {
                state.loading = true;
                state.error = false;
            })
            .addCase(dataByDaysFetched.rejected, state => {
                state.error = true;
                state.loading = false;
            })
            .addCase(countriesListFetched.fulfilled, (state, action) => {
                state.countriesList = action.payload
            })
            .addDefaultCase(() => { })
    },
})

export default covidDataSlice.reducer

export const {
    shownDataSet,
    loadingChanged
} = covidDataSlice.actions;