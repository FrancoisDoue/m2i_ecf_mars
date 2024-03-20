import { ActivityIndicator, Button, StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokeList } from '../storage/slices/pokeSlice'
import PokeList from '../components/PokeList'
import { useRoute } from '@react-navigation/native'

const HomeScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.pokemon)
  const search = route.params?.search
  console.log(search)

  useLayoutEffect(() => {
    dispatch(getPokeList())
  }, [search])

  const handlePokeNavigation = (id) => {
    console.log(id)
    navigation.navigate('pokedetail', { pokeId: id })
  }
  const handleNext = () => dispatch(getPokeList({ url: pokemon.next }))
  const handlePrev = () => dispatch(getPokeList({ url: pokemon.prev }))


  return (
    <View style={styles.main}>
      {pokemon.isLoading ?
        <ActivityIndicator size={200} />
        :
        <>
          {pokemon.prev && <Button title='Prev' onPress={handlePrev} />}

          <PokeList list={pokemon.pokeList} pressedAction={handlePokeNavigation} />

          {pokemon.next && <Button title='Next' onPress={handleNext} />}
        </>
      }
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
})