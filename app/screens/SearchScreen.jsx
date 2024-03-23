import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterList } from '../storage/slices/pokeFilterSlice'
import { setPage } from '../storage/slices/pokeSlice'

const SearchScreen = ({navigation}) => {

  const dispatch  = useDispatch()

  const {typesList, namesList} = useSelector(state => state.pokeFilter)
  const [searchValue, setSearchValue] = useState('')
  const [typesValue, setTypesValue] = useState([])
  const [currentNameFilter, setCurrentNameFilter] = useState(namesList)

  const handleInputSearch = (value) => {
    setSearchValue(value)
    const currentFilteredValues = [...namesList]
      .filter(e => 
        (!value) ? 
          true : 
          e.name.includes(value.toLowerCase())
      )
      .filter(element => 
        (!typesValue.length) ? 
          true : 
          [...typesValue.map(e => e.pokemon).flat()].find(e => element.name == e.name)
      )
    setCurrentNameFilter(currentFilteredValues)
  }

  const handleTypeSearch = (type) => {
    const isInList = !!typesValue?.find(e => e.name == type.name)
    if(isInList) {
      setTypesValue(prev => prev.filter(e => e.name !== type.name))
    }else{
      setTypesValue(prev => [...prev, type])
    }
    handleInputSearch(searchValue)
  }
  console.table(typesValue.map(e => e.name))
  console.log(currentNameFilter.map(poke => poke.name))

  // const handleSearch = (item) => {
  //   dispatch(setFilterList(item.pokemon))
  //   // dispatch(setPage(1))
  //   // navigation.navigate('home')
  // }

  return (
    <View>
      <TextInput 
        value={searchValue}
        onChangeText={handleInputSearch}
        placeholder='Search'
        onSubmitEditing={() => console.log('grant')}
      />
      <FlatList 
        data={typesList}
        keyExtractor={item => item.name}
        renderItem={({item}) => 
          (!!item.pokemon.length) && <Pressable onPress={() => handleTypeSearch(item)} >
            <Text>{item.name}</Text> 
          </Pressable>
        }
      
      />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})