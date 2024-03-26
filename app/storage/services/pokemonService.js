import { createAsyncThunk } from "@reduxjs/toolkit"
import { setFilterList, setNamesList, setTypesList } from "../slices/pokeFilterSlice"
import { api, pokeSpeciesApi, pokemonApi, typesApi } from "../../utils/pokeapi.backend"
import { setMaxPage, setSelectedPokemon } from "../slices/pokeSlice"


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
            .then(({results}) => {
                dispatch(setMaxPage(results.length))
                // api.all(datas.results.map(result => 
                //     api.get(result.url)
                // )).then(datas => {
                    dispatch(setNamesList(results))
                    dispatch(setFilterList(results))
                // })
            })
            .catch( rejectWithValue )
    }
)
export const fetchTypesList = createAsyncThunk(
    'pokeFilter/fetchTypesList',
    async (_args, {rejectWithValue, dispatch}) => {
        return typesApi.get('')
            .then((types) => {
                api.all(
                    types.results.map(async(type) => ({ 
                        name: type.name, 
                        // atchoum.
                        pokemon: (await api.get(type.url)).pokemon.map(e => e.pokemon)
                    }))
                ).then(res => 
                    dispatch(setTypesList(res))
                )
            })
            .catch( rejectWithValue )
    }
)
export const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemon',
    async ({name, id, /*willDispatch = true*/}, {rejectWithValue, dispatch}) => {
        return pokemonApi.get(`/${name || id}`)
            .then((datas) => {
                console.log(datas.name)
                // if (!!willDispatch) return dispatch(setSelectedPokemon(datas))
                dispatch(setSelectedPokemon(datas))
                
                // return datas
            })
            .catch( rejectWithValue )
    }

)
export const fetchDetailledPokemonList = createAsyncThunk(
    'pokemon/fetchDetailledPokemonList',
    async (_args, {rejectWithValue, getState}) => {
        const {pokeFilter, pokemon} = getState()
        if (pokeFilter.filterList.length) {
            const fromPokemon = (pokemon.page - 1) * pokemon.step
            const toPokemon = (pokemon.page * pokemon.step)
            console.log(fromPokemon, toPokemon)
            const list = pokeFilter.filterList.slice(fromPokemon, toPokemon)
            return api.all(
                list.map(monster => pokemonApi.get(`${ monster?.pokemon?.name || monster.name}`))
            )
            .catch(rejectWithValue)
        }
        rejectWithValue()
    }
)