import { Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokeList } from '../storage/slices/pokeSlice'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'
import { pokeColors } from '../styles/globalStyle'

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.pokemon)

  useLayoutEffect(() => {
    if(!pokemon.pokeList.length) dispatch(getPokeList())
  }, [])

  const handlePokeNavigation = (id) => {
    navigation.navigate('pokedetail', { pokeId: id })
  }
  const handleNext = () => dispatch(getPokeList({ url: pokemon.next }))
  const handlePrev = () => dispatch(getPokeList({ url: pokemon.prev }))

  return (
    <GradientView>
      <PokeList 
        headerComponent={
          pokemon.prev &&
           <Button title='Précédents' color={pokeColors.pokeDarkRed}  onPress={handlePrev} />
        }
        footerComponent={
          pokemon.next && 
          <Button title='Suivants' color={pokeColors.pokeBlue} onPress={handleNext} />
        }
        list={pokemon.pokeList} 
        pressedAction={handlePokeNavigation} 
      />
    </GradientView>
  )
}

export default HomeScreen
