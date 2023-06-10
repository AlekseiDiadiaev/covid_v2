import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { getMinMaxDate } from '../api/dataApi';

export const minMaxDateFetched = createAsyncThunk(
    'MIN_MAX_DATE_FETCH', () => {
        return getMinMaxDate();
    })