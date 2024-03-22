import { Image, StyleSheet, View, ActivityIndicator, Animated } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { pokeColors } from '../../styles/globalStyle'
import logo from '../../assets/pokemonLogo.png'


const LoadingView = ({noFading}) => {

  const fading = useRef(new Animated.Value(.1)).current

  useEffect(() => {
    Animated.timing(fading, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()
  }, [fading])

  return (
    <Animated.View style={[{opacity: (noFading) ? 1 : fading}, styles.loadingScreen]}>
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