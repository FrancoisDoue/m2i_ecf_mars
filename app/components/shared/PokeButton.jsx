import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import globalStyle, { pokeColors } from '../../styles/globalStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'

const PokeButton = ({title = 'PokeButton', style, onPress, variant, iconVariant = 'catching-pokemon', disabled}) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles.pokeButtonContainer, style]}
            disabled={disabled}
        >
            <Text style={styles.pokeButtonText}>
                {title}
            </Text> 
            {variant && 
                <View style={styles.pokeball}>
                    <Icon name={iconVariant} color={pokeColors.pokeWhite} size={40} /> 
                </View>
            }
        </TouchableOpacity>
    )
}

export default PokeButton

const styles = StyleSheet.create({
    pokeButtonContainer: {
        width: '95%',
        height: 60,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: pokeColors.pokeBlue,
        borderRadius: 4,
    },
    pokeButtonText: {
        ...globalStyle.textXLarge,
        ...globalStyle.textWhite,
    },
    pokeball: {
        transform: [{rotate: '-15deg'}]
    },
})