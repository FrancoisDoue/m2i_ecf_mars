import React, { useEffect, useLayoutEffect, useState } from 'react'
import PokeNavigation from './PokeNavigation'
import { useDispatch, useSelector } from 'react-redux'
import LoadingView from './components/shared/LoadingView'
import { fetchDetailledPokemonList, fetchPokemonList, fetchTypesList } from './storage/services/pokemonService'
import { getFavorites } from './storage/services/storageService'

const App = () => {

  const dispatch = useDispatch()
  const pokemon = useSelector((state) => state.pokemon)
  const pokeFilter = useSelector(state => state.pokeFilter)
  const [isInitialize, setIsInitialize] = useState(false)

  const initializeFilters = () => {
    dispatch(fetchTypesList())
    dispatch(fetchPokemonList())
  }
  const initializePage = () => {
    dispatch(fetchDetailledPokemonList())
    dispatch(getFavorites())
  }

  useLayoutEffect(() => {
    initializeFilters()
    dispatch(getFavorites())
  }, [])

  useEffect(() => {
    initializePage()
  }, [pokemon.page, pokeFilter.filterList])
  
  useEffect(() => {
    setIsInitialize(!isInitialize)
  }, [pokeFilter.namesList])

  if(!pokeFilter.isLoading && !isInitialize) return (
    <PokeNavigation />
  )
  return (
    <LoadingView />
  )  
}


export default App