import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterList } from '../storage/slices/pokeFilterSlice'
import { setPage } from '../storage/slices/pokeSlice'
import { pokeColors } from '../styles/globalStyle'

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
    <View style={styles.main}>
      <View style={styles.inputGroup} >
        <TextInput 
          value={searchValue}
          onChangeText={handleInputSearch}
          placeholder='Search'
          // onSubmitEditing={() => console.log('grant')}
          style={styles.input}
        />
        <Pressable
          onPress={handleSearch}
          style={styles.searchBtn}
        >
          <Text>Find</Text>
        </Pressable>
      </View>
      <FlatList 
        data={typesList}
        keyExtractor={item => item.name}
        scrollEnabled={false}
        numColumns={5}
        
        renderItem={({item}) => 
          (!!item.pokemon.length) && 
          <Pressable 
            style={(e) => [
              styles.btnType(e), 
              selectedTypes.find(type => type == item.name) && {borderColor: pokeColors.pokeRed}
            ]}
            onPress={() => handleTypeSearch(item)}
          >
            {/* <Text>{item.name}</Text>  */}
            <Image source={{uri: `https://veekun.com/dex/media/types/en/${item.name}.png`}} width={60} height={26} />
          </Pressable>
        }
      
      />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: pokeColors.pokeRed
  },
  inputGroup: {
    width: '90%',
    flexDirection: 'row'
  },
  searchBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '19%',
    // backgroundColor: 'white'
  },
  input: {
    width: '80%',
    borderStartWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    // marginTop: 40,
    borderColor: pokeColors.pokeDarkRed,
    backgroundColor: pokeColors.pokeWhite,
    // borderLeftRadius: 1000,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    paddingHorizontal: 20,
  },
  btnType: ({pressed}) => ({
    padding: 2,
    margin: 4,
    borderWidth: 2,
    borderRadius: 3,
    borderColor: (pressed) ? pokeColors.pokeRed : pokeColors.pokeWhite,
    backgroundColor: pokeColors.pokeWhite,
    elevation: (pressed) ? 1 : 4
  }),
})