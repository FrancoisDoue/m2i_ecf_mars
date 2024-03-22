import { createSlice } from "@reduxjs/toolkit";
import { fulfilledCb, pendingCb, rejectedCb } from "../services/pokemonService";

const pokeFilterSlice = createSlice({
    name: 'pokeFilter',
    initialState: {
        namesList: [],
        typesList: [],
        isLoading: false,
        error: null
    },
    reducers: {
        setNamesList: (state, action) => {
            state.namesList = action.payload
        },
        setTypesList: (state, action) => { 
            state.typesList = action.payload
        }

    },
    extraReducers: ({addMatcher}) => {
        addMatcher(({type}) => (type.endsWith('/fulfilled') && type.startsWith('pokeFilter')), fulfilledCb)
        addMatcher(({type}) => (type.endsWith('/pending') && type.startsWith('pokeFilter')), pendingCb)
        addMatcher(({type}) => (type.endsWith('/rejected') && type.startsWith('pokeFilter')), rejectedCb)

    }
})

export const { 
    setNamesList,
    setTypesList,
} = pokeFilterSlice.actions

export default pokeFilterSlice.reducer

