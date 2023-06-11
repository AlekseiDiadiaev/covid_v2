import { createAsyncThunk } from "@reduxjs/toolkit";

import { getMinMaxDate, getDataByCountries, getCountriesList, getDataByDays } from '../api/dataApi';

export const minMaxDateFetched = createAsyncThunk(
    'MIN_MAX_DATE_FETCHED', () => {
        return getMinMaxDate();
    })

export const dataByCountriesFetched = createAsyncThunk(
    'DATA_BY_COUNTRIES_FETCHED', (payload, { getState }) => {
        let minDate, maxDate;
        if (payload) {
            minDate = payload.minDate;
            maxDate = payload.maxDate;
        } else {
            minDate = getState().datePickerSlice.minDate;
            maxDate = getState().datePickerSlice.maxDate;
        }
        return getDataByCountries(minDate, maxDate);
    })

export const dataByDaysFetched = createAsyncThunk(
    'DATA_BY_DAYS_FETCHED', (payload) => {
        const minDate = payload.minDate,
             maxDate = payload.maxDate;
        return getDataByDays(minDate, maxDate);
    })

export const countriesListFetched = createAsyncThunk(
    'COUNTRIES_LIST_FETCHED', () => {
        return getCountriesList();
    })

