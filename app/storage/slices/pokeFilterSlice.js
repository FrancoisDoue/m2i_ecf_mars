// UNUSED
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/pokeapi.backend";

const urls = {
    types:' https://pokeapi.co/api/v2/type',   
}

const pokeFilterSlice = createSlice({
    name: 'pokeFilter',
    initialState: {
        availlableFilters: {},
        isLoading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: ({addCase}) => {
        addCase(fetchFilters.fulfilled, () => {
            state.isLoading = false
            console.log('On fullfilled')
        })
        addCase(fetchFilters.fulfilled, (state) => {
            state.isLoading = true
            console.log('On pending')
        })
        addCase(fetchFilters.fulfilled, () => {
            state.isLoading = false
            console.log('On reject')
        })

    }
})

export const {  } = pokeFilterSlice.actions

export default pokeFilterSlice.reducer

export const fetchFilters = createAsyncThunk(
    'pokeFilter/fetchFilters',
    async (args, {rejectWithValue}) => api.all(
        // WIP
    )
    .then(rejectWithValue)
)