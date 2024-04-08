import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const USER_KEY = 'user_favorites'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        favorites: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setFavorites: (state, action) => {
            state.favorites = action.payload
        },
        removeFromFavorites: (state, action) => {
            console.log('removed')
            state.favorites = state.favorites.filter(
                (pokemon) => pokemon.id !== action.payload.id
            )
        }
    },
    extraReducers: ({addCase}) => {
        addCase(getAllFromStorage.fulfilled, fulfilledCb)
        addCase(getAllFromStorage.pending, pendingCb)
        addCase(getAllFromStorage.rejected, rejectedCb)
        addCase(removeFavoriteFromStore.fulfilled, fulfilledCb)
        addCase(removeFavoriteFromStore.pending, pendingCb)
        addCase(removeFavoriteFromStore.rejected, rejectedCb)
        addCase(storeNewFavorite.fulfilled, fulfilledCb)
        addCase(storeNewFavorite.pending, pendingCb)
        addCase(storeNewFavorite.rejected, rejectedCb)
    }
})

export const {setFavorites, removeFromFavorites} = userSlice.actions

export default userSlice.reducer

//______________________________________________________________________//

const fulfilledCb = (state) => {
    console.log('on fulfill')
    state.isLoading = false
    state.error = null
}
const pendingCb = (state) => {
    console.log('on pending')
    state.isLoading = true
}
const rejectedCb = (state, action) => {
    console.log('on reject ', action.payload)
    state.isLoading = false
    state.error = action.payload
}

const storeFavorites = createAsyncThunk(
    'user/storeFavorites',
    async (args, {rejectWithValue, dispatch}) => {
        return AsyncStorage.setItem(USER_KEY, JSON.stringify(args))
            .then(() => dispatch(setFavorites(args)))
            .catch(rejectWithValue)
    }
)
export const removeFavoriteFromStore = createAsyncThunk(
    'user/removeFavoriteFromStore',
    async (args, {rejectWithValue, dispatch}) => {
        AsyncStorage.getItem(USER_KEY)
            .then(async (res) => {
                const result = (res) ? JSON.parse(res) : []
                await AsyncStorage.clear()
                dispatch(storeFavorites(
                    result.filter(stored => stored.id !== args.id)
                ))
            })
            .catch(rejectWithValue)
    }
)
export const storeNewFavorite = createAsyncThunk(
    'user/storeNewFavorite',
    async (args, {rejectWithValue, dispatch}) => {
        AsyncStorage.getItem(USER_KEY)
            .then(async (res) => {
                const result = (res) ? JSON.parse(res) : []
                result.push(args)
                await AsyncStorage.clear()
                dispatch(storeFavorites(result))
            })
            .catch(rejectWithValue)
    }
)
export const getAllFromStorage = createAsyncThunk(
    'user/getAllFromStorage',
    async (_args, {rejectWithValue, dispatch}) => AsyncStorage.getItem(USER_KEY)
        .then(res => {
            const result = (res) ? JSON.parse(res) : []
            dispatch(setFavorites(result))
        })
        .catch(rejectWithValue)
    
)


