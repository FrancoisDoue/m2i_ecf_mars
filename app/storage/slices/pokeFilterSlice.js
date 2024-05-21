import { createSlice } from "@reduxjs/toolkit";
import { fulfilledCb, pendingCb, rejectedCb } from "../services/pokemonService";

const pokeFilterSlice = createSlice({
    name: 'pokeFilter',
    initialState: {
        namesList: [],
        typesList: [],
        filterList: [],
        // currentTypesList: [],
        // currentSearchName: '',
        isLoading: false,
        error: null
    },
    reducers: {
        setNamesList: (state, action) => {
            state.namesList = action.payload
        },
        setTypesList: (state, action) => { 
            state.typesList = action.payload
        },
        setFilterList: (state, action) => {
            state.filterList = action.payload
        },
        // setCurrentTypesList : (state, action) => {
            
        // },
        // setCurrentSearchName : (state, action) => {

        // },
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
    setFilterList,
} = pokeFilterSlice.actions

export default pokeFilterSlice.reducer

