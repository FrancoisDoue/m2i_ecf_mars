import { createSlice } from "@reduxjs/toolkit";
import { fetchDetailledPokemonList, fulfilledCb, pendingCb, rejectedCb } from "../services/pokemonService";

const pokeSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokeList: [],
        page: 1,
        maxPage: 1,
        step: 20,
        selectedPokemon: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setPokeList : (state, action) => {
            state.pokeList = action.payload
        },
        addToPokeList : (state, action) => {
            state.pokeList.push(action.payload)
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        goToNextPage: (state) => {
            if (state.page < state.maxPage) state.page += 1
        },
        goToPrevPage: (state) => {
            if (state.page > 1) state.page -= 1
        },
        setMaxPage: (state, action) => {
            const maxPage = Math.floor(action.payload / state.step)
            state.maxPage = maxPage
        },
        setSelectedPokemon: (state, action) => {
            state.selectedPokemon = action.payload
        }

    },
    extraReducers: ({addMatcher, addCase}) => {
        addCase(fetchDetailledPokemonList.fulfilled, (state, action) => {
            state.pokeList = action.payload
        })

        addMatcher(({type}) => (type.endsWith('/fulfilled') && type.startsWith('pokemon')), fulfilledCb)
        addMatcher(({type}) => (type.endsWith('/pending') && type.startsWith('pokemon')), pendingCb)
        addMatcher(({type}) => (type.endsWith('/rejected') && type.startsWith('pokemon')), rejectedCb)
        
    }
})

export const {
    setPokeList,
    goToNextPage,
    goToPrevPage,
    setMaxPage,
    setSelectedPokemon,
    setPage,
} = pokeSlice.actions

export default pokeSlice.reducer
