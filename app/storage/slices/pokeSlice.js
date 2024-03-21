import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/pokeapi.backend";
import { evolveMap } from "../../utils/mappers";

const pokeSlice = createSlice({
    name: 'pokemon',
    initialState: {
        pokeList: [],
        prev: '',
        next: '',
        selectedPokemon: null,
        isLoading: false,
        error: null
    },
    reducers: {
        setPokemon: (state, action) => {
            const findedPokemon =  state.pokeList.find(
                (pokemon) => pokemon.id === action.payload
            )
            state.selectedPokemon = findedPokemon
        },
        setEvolve: (state, action) => {
            state.selectedPokemon.chain = evolveMap(action.payload)
        },
        setPrev: (state, action) => {
            state.prev = action.payload
        },
        setNext: (state, action) => {
            state.next = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPokeList.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = null
            state.pokeList = action.payload
        })
        builder.addCase(getPokeList.pending, (state) => { state.isLoading = true })
        builder.addCase(getPokeList.rejected, (state, action) => {
            state.error = action.payload
            state.isLoading = false
        })
        builder.addCase(getEvolve.fulfilled, () => console.log('fulfilled'))
        builder.addCase(getEvolve.pending, () => console.log('pending'))
        builder.addCase(getEvolve.rejected, (state, action) => console.log(action.payload))
    }
})

export const {setPokemon, setEvolve, setPrev, setNext, unsetPrev} = pokeSlice.actions

export default pokeSlice.reducer

export const getPokeList = createAsyncThunk(
    'pokemon/getPokeList',
    async (args, {rejectWithValue, dispatch}) => 
        api.get(args?.url || 'https://pokeapi.co/api/v2/pokemon?limit=100', {
                params: args?.params || {} 
            })
            .then(data => {
                if (data?.previous) {
                    dispatch(setPrev(data.previous))
                } else {
                    dispatch(setPrev(''))
                }
                if (data?.next) {
                    dispatch(setNext(data.next))
                } else {
                    dispatch(setNext(''))
                }
                return api.all( 
                    data?.results ? 
                        data.results.map((pokemon) => api.get(pokemon.url).catch(rejectWithValue)) :
                        data.pokemon.map(({pokemon}) => api.get(pokemon.url).catch(rejectWithValue)) 
                )
            })
            .catch(rejectWithValue)
)

export const getEvolve = createAsyncThunk(
    'pokemon/getEvolve',
    async (args, {rejectWithValue, dispatch}) => {
        console.log(args)
        return api.get(args.url)
            .then(({evolution_chain}) => 
                api.get(evolution_chain.url)
                    .then((data) => dispatch(setEvolve(data.chain)))
            )
            .catch(rejectWithValue)
    } 
)