import { createAsyncThunk } from "@reduxjs/toolkit"
import { setNamesList, setTypesList } from "../slices/pokeFilterSlice"
import { api, pokeSpeciesApi, pokemonApi, typesApi } from "../../utils/pokeapi.backend"
import { setMaxPage, setPokeList } from "../slices/pokeSlice"


// generic callbacks for extraReducers
export const fulfilledCb = (state, action) => {
    console.log(action.type)
    state.isLoading = false
    state.error = null
}
export const pendingCb = (state, action) => {
    console.log(action.type)
    state.isLoading = true
}
export const rejectedCb = (state, action) => {
    console.warn( action.type, ' => ',  action.payload)
    state.isLoading = false
    state.error = action.error
}

// used for pokeFilters
export const fetchPokemonList = createAsyncThunk(
    'pokeFilter/fetchPokemonList',
    async ( _args, {rejectWithValue, dispatch}) => {
        return pokeSpeciesApi.get('', {params: {limit: 1500}})
            .then((datas) => {
                // console.log(datas)
                dispatch(setMaxPage(datas.results.length))
                dispatch(setNamesList(datas.results))
            })
            .catch( rejectWithValue )
    }
)
export const fetchTypesList = createAsyncThunk(
    'pokeFilter/fetchTypesList',
    async (_args, {rejectWithValue, dispatch}) => {
        return typesApi.get('')
            .then((types) => {
                dispatch(setTypesList(types.results))
            })
            .catch( rejectWithValue )
    }
)
export const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemon',
    async ({name, id, willDispatch = false}, {rejectWithValue, dispatch}) => {
        return pokemonApi.get(`/${name || id}`)
            .then((datas) => {
                console.log(datas.name)
                if (willDispatch) return dispatch(setSelectedPokemon(datas))
                return datas
            })
            .catch( rejectWithValue )
    }

)
export const fetchDetailledPokemonList = createAsyncThunk(
    'pokemon/fetchDetailledPokemonList',
    async (_args, {rejectWithValue, getState}) => {
        const {pokeFilter, pokemon} = getState()
        if (pokeFilter.namesList.length) {
            const fromPokemon = (pokemon.page - 1) * 50
            const toPokemon = (pokemon.page * 50) - 1
            console.log(fromPokemon, toPokemon)
            const list = pokeFilter.namesList.slice(fromPokemon, toPokemon)
            return api.all(
                list.map(monster => pokemonApi.get(`${monster.name}`))
            )
            .catch(rejectWithValue)
        }
        rejectWithValue()
    }
)