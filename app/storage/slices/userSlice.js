import { createSlice } from "@reduxjs/toolkit";
import { fulfilledCb, pendingCb, rejectedCb } from "../services/pokemonService";


const userSlice = createSlice({
    name: 'user',
    initialState: {
        nameList: [],
        favorites: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setNameList: (state, action) => {
            state.nameList = action.payload
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload
        },
        pushInFavorites: (state, action) => {
            state.favorites.push(action.payload)
        },
        removeFromFavorites: (state, action) => {
            state.favorites = state.favorites.filter(p => p.name != action.payload)
        },
    },
    extraReducers: ({addMatcher}) => {
        addMatcher(({type}) => (type.endsWith('/fulfilled') && type.startsWith('user')), fulfilledCb)
        addMatcher(({type}) => (type.endsWith('/pending') && type.startsWith('user')), pendingCb)
        addMatcher(({type}) => (type.endsWith('/rejected') && type.startsWith('user')), rejectedCb)
    }
})

export const {
    setFavorites,
    setNameList,
    pushInFavorites,
    removeFromFavorites,
} = userSlice.actions

export default userSlice.reducer
