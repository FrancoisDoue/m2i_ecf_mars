import React, { useEffect, useLayoutEffect, useState } from 'react'
import PokeNavigation from './PokeNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { getPokeList } from './storage/slices/pokeSlice'
import LoadingView from './components/shared/LoadingView'
import { getAllFromStorage } from './storage/slices/userSlice'

const App = () => {

  const dispatch = useDispatch()
  const pokemonIsLoading = useSelector((state) => state.pokemon.isLoading)
  // const userIsLoading = useSelector((state) => state.user.isLoading)

  const initializeApp = () => {
    dispatch(getPokeList())
    dispatch(getAllFromStorage())
  }

  useLayoutEffect(() => {
    initializeApp()
  }, [])

  if(!pokemonIsLoading) return (
    <PokeNavigation />
  )
  return (
    <LoadingView />
  )

  
}


export default App