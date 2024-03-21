import React, { useEffect, useLayoutEffect } from 'react'
import PokeNavigation from './PokeNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator, View } from 'react-native'
import { getPokeList } from './storage/slices/pokeSlice'

const App = () => {

  const dispatch = useDispatch()
  const pokemonIsLoading = useSelector((state) => state.pokemon.isLoading)
  const userIsLoading = useSelector((state) => state.user.isLoading)

  const initializeApp = () => {
    dispatch(getPokeList())
  }

  useLayoutEffect(() => {
    initializeApp()
  }, [])
  


  if(!pokemonIsLoading && !userIsLoading) return (
    <PokeNavigation />
  )

  return (
    <View>
      <ActivityIndicator />
    </View>
  )
}

export default App