import { createAsyncThunk } from "@reduxjs/toolkit"
import { setFilterList, setNamesList, setTypesList } from "../slices/pokeFilterSlice"
import { api, pokeSpeciesApi, pokemonApi, typesApi } from "../../utils/pokeapi.backend"
import { setEvolutions, setMaxPage, setSelectedPokemon } from "../slices/pokeSlice"
import Pokemon from "../../utils/Pokemon"
import { evolveMap } from "../../utils/mappers"

// generic callbacks for extraReducers
export const fulfilledCb = (state, action) => {
    console.log(action.type)
    state.isLoading = false
    state.error = null
}
export const pendingCb = (state, action) => {
    // console.log(action.type)
    state.isLoading = true
}
export const rejectedCb = (state, action) => {
    console.warn( action.type, ' => ',  action.payload)
    state.isLoading = false
    state.error = action.error
}

export const axiosFetchCompletePokemon = async (name) => {
    try {
        const species = await pokeSpeciesApi.get(`/${name}`)
        const pokemon = await pokemonApi.get(`/${name}`)
        const buildedPokemon = new Pokemon({...species, ...pokemon})
        return buildedPokemon
    } catch (error) {
        throw error
    }
}

// used for pokeFilters
export const fetchPokemonList = createAsyncThunk(
    'pokeFilter/fetchPokemonList',
    async ( _args, {rejectWithValue, dispatch}) => {
        return pokeSpeciesApi.get('', {params: {limit: 1500}})
            .then(({results}) => {
                dispatch(setMaxPage(results.length))
                dispatch(setNamesList(results))
                dispatch(setFilterList(results))
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
    async ({name}, {rejectWithValue, dispatch}) => {
        axiosFetchCompletePokemon(name)
            .then((datas) => {
                dispatch(setSelectedPokemon(datas))
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
            const list = pokeFilter.filterList.slice(fromPokemon, toPokemon)
            return api.all(
                list.map(monster => axiosFetchCompletePokemon(monster?.pokemon?.name || monster.name))
            )
            .catch(rejectWithValue)
        }
        rejectWithValue()
    }
)
export const fetchEvolutions = createAsyncThunk(
    "pokemon/fetchEvolutions",
    async (_args, {rejectWithValue, dispatch, getState}) => {
        const {selectedPokemon, pokeList} = getState().pokemon
        if (!!selectedPokemon.evolutions?.length)
            return dispatch(setEvolutions(selectedPokemon.evolutions))
        return api.get(selectedPokemon.evolvesUrl)
            .then(({chain}) => {
                const evolveArray = evolveMap(chain)
                api.all(evolveArray.map((name) => {
                    if (name == selectedPokemon.name) 
                        return selectedPokemon
                    const findedInList = pokeList.find(p => p.name == name)
                    if (!!findedInList) 
                        return findedInList
                    return axiosFetchCompletePokemon(name)
                }))
                    .then((evolutionList) => dispatch(setEvolutions(evolutionList)))
                    .catch(rejectWithValue)
            })
            .catch(rejectWithValue)
    }
)