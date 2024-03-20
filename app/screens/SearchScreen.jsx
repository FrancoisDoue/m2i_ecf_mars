import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

const SearchScreen = ({navigation}) => {

  const [nameSearch, setNameSearch] = useState()

  const handleSearch = () => {
    // if (!nameSearch) return
    // else {
    //   navigation.navigate('home', {
    //     screen: 'pokedex',
    //     params: {search: {name: nameSearch}}
    //   })
    //   setNameSearch('')
    // }
  }

  return (
    <View>
      {/* <TextInput 
        onChangeText={setNameSearch}
        onEndEditing={handleSearch} 
        value={nameSearch} 
        placeholder='Recherche par nom' 
      />
      <Text>SearchScreen</Text> */}
      <Button title='Search' onPress={handleSearch} />
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})