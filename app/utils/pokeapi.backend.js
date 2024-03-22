import axios from "axios";

const responseInterceptor = [
    (response) => response.data,
    (error) => Promise.reject({
        code: error.code,
        status: error.response.status,
        url: error.response.config.url,
        message: error.message,
    })
]

export const api = axios

export const pokeSpeciesApi = api.create({baseURL: 'https://pokeapi.co/api/v2/pokemon-species'})
pokeSpeciesApi.interceptors.response.use(...responseInterceptor)

export const pokemonApi = api.create({baseURL: 'https://pokeapi.co/api/v2/pokemon'})
pokemonApi.interceptors.response.use(...responseInterceptor)

export const typesApi = api.create({baseURL: 'https://pokeapi.co/api/v2/type'})
typesApi.interceptors.response.use(...responseInterceptor)


