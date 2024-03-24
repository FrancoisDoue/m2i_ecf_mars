import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterList } from '../storage/slices/pokeFilterSlice'
import { setPage } from '../storage/slices/pokeSlice'

const SearchScreen = ({navigation}) => {

  const dispatch  = useDispatch()

  const {typesList, namesList} = useSelector(state => state.pokeFilter)
  const [searchValue, setSearchValue] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [currentNameFilter, setCurrentNameFilter] = useState(namesList)

  const handleInputSearch = (value) => {
    setSearchValue(value)
    const currentFilteredValues = [...namesList]
      .filter(e => (!value) ? true : e.name.includes(value.toLowerCase()))
      .filter(element => {
        if (selectedTypes.length) {
          for(const i in selectedTypes) {
            const type = typesList.find(({name}) => name == selectedTypes[i])
            const isNotInList = !type.pokemon.some(item => element.name == item.name)
            // console.log( selectedTypes[i], type.pokemon.find(item => e.name == item.name))
            if (isNotInList) return false
          }
        }
        return true
      })
    // console.log(value, selectedTypes)
    // console.log(currentFilteredValues.length, currentFilteredValues.map(e => e.name))
    setCurrentNameFilter([...currentFilteredValues])
  }

  const handleTypeSearch = (type) => {
    const isInList = selectedTypes?.some(e => e == type.name)
    if(isInList) {
      setSelectedTypes(prev => prev.filter(e => e != type.name))
    }else{
      setSelectedTypes(prev => [...prev, type.name])
    }
  }

  useEffect(() => {
    if (selectedTypes.length) {
      const filteredPokemons = new Set(
        selectedTypes.map((typeName) => { 
          return typesList.find(type => type.name == typeName).pokemon
        })
      )
      setCurrentNameFilter([...filteredPokemons])
    } else {
      setCurrentNameFilter(namesList)
    } 
    handleInputSearch(searchValue)
  }, [selectedTypes])

  const handleSearch = () => {
    dispatch(setFilterList(currentNameFilter))
    dispatch(setPage(1))
    navigation.navigate('home')
  }

  return (
    <View>
      <TextInput 
        value={searchValue}
        onChangeText={handleInputSearch}
        placeholder='Search'
        onSubmitEditing={() => console.log('grant')}
      />
      <Button title='search' onPress={handleSearch} />
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