import React from 'react'
import { useSelector } from 'react-redux'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'

const HomeScreen = ({ navigation }) => {

  const {pokeList} = useSelector(state => state.pokemon)

  return (
    <GradientView>
      <PokeList 
        list={pokeList} 
        navigation={navigation}
      />
    </GradientView>
  )
}

export default HomeScreen
