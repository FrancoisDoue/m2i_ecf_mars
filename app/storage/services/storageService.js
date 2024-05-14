import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { pushInFavorites, removeFromFavorites, setFavorites, setNameList } from "../slices/userSlice";
import { api } from "../../utils/pokeapi.backend";
import { axiosFetchCompletePokemon } from "./pokemonService";

const USER_KEY = 'pokemon_favorites'

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
        const {nameList} = getState().user
        AsyncStorage.getItem(USER_KEY)
            .then((result) => {
                result = JSON.parse(result) || []
                if (result.toString() != nameList.toString()) {
                    dispatch(setNameList(result))
                    api.all(
                        result.map((name) => axiosFetchCompletePokemon(name))
                    )
                    .then(result => dispatch(setFavorites(result)))
                    .catch(rejectWithValue)
                }
            })
            .catch(rejectWithValue)
    }
)