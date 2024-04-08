import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pushInFavorites, removeFromFavorites, setFavorites, setNameList } from "../slices/userSlice";
import { api } from "../../utils/pokeapi.backend";
import { axiosFetchCompletePokemon } from "./pokemonService";

const USER_KEY = 'user_favorites2'

export const storeFavorites = createAsyncThunk(
    'user/storeFavorites',
    async (nameList, {rejectWithValue, dispatch}) => {
        await AsyncStorage.clear()
        AsyncStorage.setItem(USER_KEY, JSON.stringify(nameList))
            .then(() => dispatch(setNameList(nameList)))
            .catch(rejectWithValue)
    }
)
export const removeFavorite = createAsyncThunk(
    'user/removeFavorites',
    async (name, {rejectWithValue, dispatch}) => {
        AsyncStorage.getItem(USER_KEY)
            .then((res) => {
                res = JSON.parse(res) || []
                const newList = res.filter(favName => favName !== name)
                dispatch(storeFavorites(newList))
                // here! Removing pokemon cleanly required
                dispatch(removeFromFavorites(name))
            })
            .catch(rejectWithValue)
    }
)
export const addFavorite = createAsyncThunk(
    'user/addFavorites',
    async (pokemon, {rejectWithValue, dispatch}) => {
        AsyncStorage.getItem(USER_KEY)
            .then((res) => {
                res = JSON.parse(res) || []
                res.push(pokemon.name)
                dispatch(storeFavorites(res))
                dispatch(pushInFavorites(pokemon))
            })
            .catch(rejectWithValue)
    }
)

export const getFavorites = createAsyncThunk(
    'user/getFavorites',
    async (_args, {rejectWithValue, dispatch, getState}) => {
        const {favorites} = getState().user
        AsyncStorage.getItem(USER_KEY)
        .then((result) => {
                // console.log(favorites)
                result = JSON.parse(result) || []
                dispatch(setNameList(result))
                console.log(result)
                result = result.filter(e => !favorites.some(({name}) => name === e))
                api.all(
                    result.map(async (name) => await axiosFetchCompletePokemon(name))
                )
                .then(result => dispatch(setFavorites(result)))
                .catch(rejectWithValue)
            })
            .catch(rejectWithValue)
    }
)