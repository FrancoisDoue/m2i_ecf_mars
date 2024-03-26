import { Button, FlatList, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterList } from '../storage/slices/pokeFilterSlice'
import { setPage } from '../storage/slices/pokeSlice'
import globalStyle, { pokeColors } from '../styles/globalStyle'
import PokeButton from '../components/shared/PokeButton'
import PressablePokeType from '../components/PressablePokeType'
import GradientView from '../components/shared/GradientView'

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
    const isInList = selectedTypes?.some(e => e == type)
    if(isInList) {
      setSelectedTypes(prev => prev.filter(e => e != type))
    }else{
      setSelectedTypes(prev => [...prev, type])
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
    <GradientView>
      <View style={styles.paramsContainer}>
        <Text style={[globalStyle.textXLarge, globalStyle.textWhite, styles.headerResults]}>Search</Text>
        {(!!searchValue || !!selectedTypes.length) &&
          <Text style={[globalStyle.textMedium, globalStyle.textWhite, styles.infoResults]}>{currentNameFilter.length} finded pokemons</Text>
        }
      </View>
      <View style={styles.inputGroup} >
        <TextInput 
          value={searchValue}
          onChangeText={handleInputSearch}
          placeholder="Pokemon's name"
          // onSubmitEditing={() => console.log('test')}
          style={styles.input}
        />
      </View>
      <View style={styles.typesContainer}>
        <Text style={styles.typesText}>Select types : </Text>
        <FlatList 
          data={typesList}
          keyExtractor={item => item.name}
          scrollEnabled={false}
          numColumns={5}
          
          renderItem={({item}) => (!!item.pokemon.length) &&
            <PressablePokeType nameType={item.name} action={handleTypeSearch} types={selectedTypes}/> 
          }
        />
      </View>
      <View style={styles.validGroup}>
        <PokeButton 
          title='Search' 
          variant 
          iconVariant='search'
          disabled={!currentNameFilter.length}
          onPress={handleSearch}
        />
      </View>

    </GradientView>
  )
}
export default SearchScreen

const styles = StyleSheet.create({
  headerResults: {
    marginTop: 50,
    textAlign: 'center',
  },
  infoResults: {
    // marginVertical: 50,
    marginHorizontal: 25,
  },
  paramsContainer: {
    flex: 0.3,
    minHeight: 70,
    width: '100%'
  },
  typesContainer: {
    flex: .4,
    minHeight: 200,
    width: '100%',
    alignItems: 'center'
  },
  typesText: {
    ... globalStyle.textLarge,
    padding: 10,
    marginHorizontal: 10,
    color: pokeColors.pokeBlack,
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    // backgroundColor: pokeColors.pokeDarkRed
  },
  input: {
    width: '80%',
    borderWidth: 2,
    borderColor: pokeColors.pokeGold,
    backgroundColor: pokeColors.pokeWhite,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  validGroup: {
    alignItems: 'center'
  }

  // btnType: ({pressed}) => ({
  //   padding: 2,
  //   margin: 4,
  //   borderWidth: 2,
  //   borderRadius: 3,
  //   borderColor: (pressed) ? pokeColors.pokeRed : pokeColors.pokeWhite,
  //   backgroundColor: pokeColors.pokeWhite,
  //   elevation: (pressed) ? 1 : 4
  // }),
})