import { Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { goToNextPage, goToPrevPage } from '../storage/slices/pokeSlice'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'
import { pokeColors } from '../styles/globalStyle'
import { fetchDetailledPokemonList } from '../storage/services/pokemonService'

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const {page, maxPage, pokeList, isLoading} = useSelector(state => state.pokemon)

  // const handlePokeNavigation = (id) => {
  //   navigation.navigate('pokedetail', { pokeId: id })
  // }
  const handlePrev = () => dispatch(goToPrevPage())

  const handleNext = () => dispatch(goToNextPage())

  console.log(page - 1)

  return (
    <GradientView>
      <PokeList 
        headerComponent={
          (page - 1) &&
          <Button title='Précédents' color={pokeColors.pokeDarkRed}  onPress={handlePrev} />
        }
        footerComponent={
          (page < maxPage) &&
          <Button title='Suivants' color={pokeColors.pokeBlue} onPress={handleNext} />
        }
        list={pokeList} 
        // pressedAction={handlePokeNavigation} 
      />
    </GradientView>
  )
}

export default HomeScreen
