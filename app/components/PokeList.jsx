import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import PokeItem from './PokeItem'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedPokemon } from '../storage/slices/pokeSlice'
import { fetchPokemon } from '../storage/services/pokemonService'
import { useNavigation } from '@react-navigation/native'

const PokeList = ({list, headerComponent, footerComponent, navigation}) => {

  // const navigation = useNavigation()

  const dispatch = useDispatch()
  const {pokeList, selectedPokemon, step} = useSelector(state => state.pokemon)

  // const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  //   // https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end
  //   const paddingToBottom = 100;
  //   return layoutMeasurement.height + contentOffset.y >=
  //     contentSize.height - paddingToBottom;
  // };

  const handlePokeNavigation = (item) => {
    console.log(item.id)
    console.log(pokeList.some(({id}) => item.id == id))
    if (pokeList.some(({id}) => item.id == id)){
      dispatch(setSelectedPokemon(item))
    } else {
      dispatch(fetchPokemon(item))
    }
    navigation.navigate('pokedetail', selectedPokemon)
  }

  return (
    <FlatList
      data={list}
      numColumns={2}
      ListHeaderComponent={ headerComponent || <></> }
      ListFooterComponent={ (!!footerComponent && list?.length == step) ? footerComponent : <></> }
      // onScroll={({nativeEvent}) => (!!onEnd && isCloseToBottom(nativeEvent)) && onEnd()} // pb de performance...
      // scrollEventThrottle={200}
      columnWrapperStyle={{justifyContent: 'center'}}
      keyExtractor={(item) => item.name}
      renderItem={({item}) => 
          <PokeItem pokemon={item} onPress={() => handlePokeNavigation(item)} />
      }
    />
  )
}

export default PokeList

const styles = StyleSheet.create({})