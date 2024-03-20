import { ActivityIndicator, Button, StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokeList } from '../storage/slices/pokeSlice'
import PokeList from '../components/PokeList'
import { useRoute } from '@react-navigation/native'
import GradientView from '../components/shared/GradientView'
import { pokeColors } from '../styles/globalStyle'

const HomeScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.pokemon)
  // const search = route.params?.search
  // console.log(search)

  useLayoutEffect(() => {
    dispatch(getPokeList())
  }, [])

  const handlePokeNavigation = (id) => {
    console.log(id)
    navigation.navigate('pokedetail', { pokeId: id })
  }
  const handleNext = () => dispatch(getPokeList({ url: pokemon.next }))
  const handlePrev = () => dispatch(getPokeList({ url: pokemon.prev }))


  return (
    <GradientView>
        {pokemon.isLoading ?
          <View style={[styles.main, styles.spinnerContainer]} >
            <ActivityIndicator size={200} color={pokeColors.pokeRed} />
          </View>
          :
          <>
            {pokemon.prev && <Button title='Prev' onPress={handlePrev} />}

            <PokeList list={pokemon.pokeList} pressedAction={handlePokeNavigation} /* onEnd={handleNext} */ />

            {pokemon.next && <Button title='Next' onPress={handleNext} />}
          </>
        }
    </GradientView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
  
})