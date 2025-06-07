import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { getData } from "../../api/services";


export interface CountryTypes {
    name: string;
    region: string;
    flag: string;
}

interface initialStateTypes {
    countries: CountryTypes[];
    loading: boolean;
    error: string;
}


export const getAllCountries = createAsyncThunk<CountryTypes[], string>('countries/getAll', async (payload = "name", { rejectWithValue }) => {
    try {
        const response = await getData(`all?fields=${payload},region,flag`);
        return response.data;
    } catch (err: any) {
        const error: AxiosError = err;
        return rejectWithValue(error.response?.data || "Unknown error");
    }
}
);

export const getAllCountriesByRegion = createAsyncThunk<CountryTypes[], string>('countries/getByRegion', async (payload = "all", { rejectWithValue }) => {
    try {
        const response = await getData(`region/${payload}`);
        return response.data;
    } catch (err: any) {
        const error: AxiosError = err;
        return rejectWithValue(error.response?.data || "Unknown error");
    }
}
);


const initialState: initialStateTypes = {
    countries: [],
    loading: false,
    error: "",
}

export const CountrySlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCountries.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(getAllCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch countries";
            })
            .addCase(getAllCountriesByRegion.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCountriesByRegion.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(getAllCountriesByRegion.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch countries by region";
            });
    }
})


export default CountrySlice.reducer;

