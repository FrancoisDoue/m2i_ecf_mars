import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import { pokeColors } from '../styles/globalStyle'

const NavigatorButton = ({onPress, isUp}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        styles={styles.navButton}
    >
        <View >
            <Icon name={isUp? 'keyboard-arrow-up' : 'keyboard-arrow-down'} color={pokeColors.pokeBlue} size={40} />
        </View>
    </TouchableOpacity>
  )
}

export default NavigatorButton

const styles = StyleSheet.create({
    navButton: {
        height: 50,
        width: '100%',
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: pokeColors.pokeBlue,
    }
})