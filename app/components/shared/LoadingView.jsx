import { Image, StyleSheet, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { pokeColors } from '../../styles/globalStyle'
import logo from '../../assets/pokemonLogo.png'


const LoadingView = () => {
  return (
    <View style={styles.loadingScreen}>
      <Image source={logo} style={styles.logo} resizeMode={"contain"} />
      <ActivityIndicator color={pokeColors.pokeWhite} size={120}/>
    </View>
  )
}

const styles = StyleSheet.create({
    loadingScreen: {
      flex: 1,
      backgroundColor: pokeColors.pokeRed,
      justifyContent: 'center',
      alignItems:'center'
    },
    logo: {
      width: 300
    }
})

export default LoadingView