import { StyleSheet } from "react-native"

// export const colors = {
//     bgPrimary: '#3B194D',
//     bgSecondary: '#100317',
//     bgTertiary: '#EAD9F2',
//     colorPrimary: '#EAD9F2',
//     colorSecondary: '#BA9CC9',
//     colorTertiary: '#F9F1FD',
// }

export const pokeColors = {
    pokeBlue: '#3b4cca',
    pokeRed: '#ff0000',
    pokeDarkRed: '#cc0000',
    pokeYellow: '#ffde00',
    pokeGold: '#b3a123',
    pokeWhite: '#ffffff'
}

export const gradientColors = {
    // main: [
    //     {offset: '0%', color: colors.bgPrimary, opacity: '1'},
    //     {offset: '100%', color: colors.bgSecondary, opacity: '1'},
    // ],
    pokeGradient: [
        {offset: '0%', color: pokeColors.pokeBlue, opacity: '1'},
        {offset: '50%', color: pokeColors.pokeWhite, opacity: '1'},
        {offset: '87%', color: pokeColors.pokeWhite, opacity: '1'},
        {offset: '90%', color: pokeColors.pokeRed, opacity: '1'},
        {offset: '100%', color: pokeColors.pokeRed, opacity: '1'},
    ]
    // pokeGradient: [
    //     {offset: '0%', color: pokeColors.pokeYellow, opacity: '1'},
    //     {offset: '30%', color: pokeColors.pokeYellow, opacity: '1'},
    //     {offset: '35%', color: pokeColors.pokeWhite, opacity: '1'},
    //     {offset: '65%', color: pokeColors.pokeWhite, opacity: '1'},
    //     {offset: '100%', color: pokeColors.pokeBlue, opacity: '1'},
    // ]
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