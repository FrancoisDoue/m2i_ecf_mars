import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import globalStyle, { pokeColors } from '../styles/globalStyle'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

const PokeItem = ({ pokemon, onPress }) => {

  const favorites = useSelector(state => state.user.favorites)
  const isInFavorites = favorites.some(fav => fav.id == pokemon.id)

  const styles = StyleSheet.create({
    pokeBox: {
      position: 'relative',
      minWidth: 150,
      width: '33%',
      height: 100,
      margin: 15,
      backgroundColor: pokeColors.pokeWhite,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (isInFavorites) ? 1.5 : .5,
      borderColor: pokeColors[(isInFavorites) ? 'pokeDarkRed' : 'pokeBlue'],
      borderRadius: 4,
      elevation: 3,
    },
    pokeDescription: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around'
    },
    cardText: {
      ...globalStyle.textSmall,
      color: pokeColors[(isInFavorites) ? 'pokeDarkRed' : 'pokeBlue'],
      fontWeight: (isInFavorites)? '600' : '400',
    },
    pokeball: {
      position: 'absolute',
      top: 5,
      right: 15,
      opacity: .5,
      transform: [{rotate: '20deg'}]
    }
  })

  const pokeImg = (isInFavorites) ? 
    pokemon.sprites.other.showdown.front_default :
    pokemon.sprites.front_default
  
  return (
    <Pressable style={styles.pokeBox} onPress={onPress}>
      <Image source={{ uri: pokeImg }}  style={{width: 100, height: 70}} resizeMode={isInFavorites? 'contain': null} />
      <View style={styles.pokeDescription}>
        {[pokemon.name.toUpperCase(), '#'+pokemon.order].map((element, i) =>
          <Text key={i} style={styles.cardText}>{element}</Text>
        )}
      </View>
      {isInFavorites && 
        <View style={styles.pokeball}>
          <Icon name='catching-pokemon' color={pokeColors.pokeDarkRed} size={40} />
        </View> 
      }
    </Pressable>
  )
}

export default PokeItem

