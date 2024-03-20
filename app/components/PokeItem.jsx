import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PokeItem = ({ pokemon, onPress }) => {

  const pokeGif = pokemon.sprites.other.showdown.front_default
  // console.log(pokeGif)
  return (
    <Pressable style={styles.pokeBox} onPress={onPress}>
      <Image source={{ uri: pokeGif }}  style={{width: 150, height: 70}} resizeMode='contain' />
      <View style={styles.pokeDescription}>
        <Text>{pokemon.name}</Text>
        <Text>#{pokemon.order}</Text>
      </View>
    </Pressable>
  )
}

export default PokeItem

const styles = StyleSheet.create({
  pokeBox: {
    minWidth: 150,

    width: '33%',
    height: 100,
    margin: 15,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pokeDescription: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  }
})