import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        favorites: []
    },
    reducers: {
        setFavorites: (state, action) => {
            
        },
        addToFavorites: (state, action) => {
            console.log('added')
            state.favorites.push(action.payload)
        },
        removeFromFavorites: (state, action) => {
            console.log('removed')
            state.favorites = state.favorites.filter(
                (pokemon) => pokemon.id !== action.payload.id
            )
        }
    }
})

export const {setFavorites, addToFavorites, removeFromFavorites} = userSlice.actions

export default userSlice.reducer