import { Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { goToNextPage, goToPrevPage } from '../storage/slices/pokeSlice'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'
import { pokeColors } from '../styles/globalStyle'

const HomeScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const {page, maxPage, pokeList} = useSelector(state => state.pokemon)

  const handlePrev = () => dispatch(goToPrevPage())
  const handleNext = () => dispatch(goToNextPage())

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
        navigation={navigation}
      />
    </GradientView>
  )
}

export default HomeScreen
