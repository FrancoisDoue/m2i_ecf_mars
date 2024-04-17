import { Image, StyleSheet, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { pokeColors } from '../../styles/globalStyle'
import logo from '../../assets/pokemonLogo.png'


const LoadingView = () => {

  const fading = useRef(new Animated.Value(.1)).current

  useEffect(() => {
    Animated.timing(fading, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()
  }, [fading])

  return (
    <Animated.View style={[{opacity: fading}, styles.loadingScreen]}>
      <Image source={logo} style={styles.logo} resizeMode={"contain"} />
      <ActivityIndicator color={pokeColors.pokeWhite} size={120}/>
    </Animated.View>
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