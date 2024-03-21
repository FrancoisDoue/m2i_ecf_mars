import { StyleSheet } from "react-native"

export const pokeColors = {
    pokeBlue: '#3b4cca',
    pokeRed: '#ff0000',
    pokeDarkRed: '#cc0000',
    pokeYellow: '#ffde00',
    pokeGold: '#b3a123',
    pokeWhite: '#ffffff',
    pokeBlack: '#130606'
}

export const gradientColors = {
    pokeGradient: [
        {offset: '0%', color: pokeColors.pokeBlue, opacity: '1'},
        {offset: '50%', color: pokeColors.pokeWhite, opacity: '1'},
        {offset: '86%', color: pokeColors.pokeWhite, opacity: '1'},
        {offset: '91%', color: pokeColors.pokeRed, opacity: '1'},
        {offset: '100%', color: pokeColors.pokeRed, opacity: '1'},
    ]
}

export default StyleSheet.create({
    textPrimary: {
        color: 'black'
    },
    textBlue: {
        color: pokeColors.pokeBlue,
    },
    textRed: {
        color: pokeColors.pokeDarkRed,
    },
    textWhite: {
        color: pokeColors.pokeWhite,
    },
    textYellow: {
        color: pokeColors.pokeYellow,
    },
    textXLarge: {
        fontSize: 30,
        fontWeight: '600',
    },
    textLarge: {
        fontSize: 22,
        fontWeight: '500'
    },
    textMedium: {
        fontSize: 19
    },
    textSmall: {
        fontSize: 16
    }
})