import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavoriteFromStore, storeNewFavorite } from '../storage/slices/userSlice'
import globalStyle, { pokeColors } from '../styles/globalStyle'
import PokeButton from '../components/shared/PokeButton'

const DetailScreen = ({navigation, route}) => {

    const {id} = route.params
    // console.log(pokeId)
    const dispatch = useDispatch()
    const { selectedPokemon } = useSelector(state => state.pokemon)
    const { favorites } = useSelector(state => state.user)
    
    const isInFavorites = () => !!favorites.find((fav) => fav.id === id)
    console.log(isInFavorites())


    const toggleFavorites = () => {
        if (!isInFavorites()) dispatch(storeNewFavorite(selectedPokemon))
        else dispatch(removeFavoriteFromStore(selectedPokemon))
    }

  return (
    <View style={styles.main}>
        {!!selectedPokemon && 
            <>
                <Image 
                    source={{uri: selectedPokemon.sprites.other['official-artwork'].front_default}}
                    width={300}
                    height={300}
                />
                <View style={styles.pokeHeader}>
                    <Text style={styles.largeText}>{selectedPokemon.name.toUpperCase()}</Text>
                    <Text style={styles.largeText}># {selectedPokemon.order}</Text>
                </View>
                <View style={styles.pokeRow}>
                    <Text style={styles.mediumText}>Types:</Text>
                        {selectedPokemon.types.map(type => 
                            <Text 
                                key={type.slot}
                                style={[styles.mediumText, styles.underLine]}
                            >
                                {type.type.name.toUpperCase()}
                            </Text>
                        )}
                </View>
                {selectedPokemon.stats.map(stat => 
                    <View style={styles.pokeRowStat} key={stat.stat.name}>
                        <Text style={styles.mediumText}>
                            {stat.stat.name.toUpperCase()}
                        </Text>
                        <Text style={[styles.mediumText, styles.underLine]}>
                            {stat.base_stat}
                        </Text>
                    </View>
                )}
                <PokeButton 
                    title={isInFavorites()? 'Release' : 'Catch!'} 
                    onPress={toggleFavorites} 
                    variant={!isInFavorites()}
                />
            </>
        }
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
    },
    pokeHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderBottomWidth: 3,
        backgroundColor: pokeColors.pokeDarkRed,
        borderColor: pokeColors.pokeYellow,
        elevation: 2,
    },
    largeText: {
        ...globalStyle.textXLarge,
        ...globalStyle.textWhite
    },
    mediumText: {
        ...globalStyle.textLarge,
        ...globalStyle.textBlue,
    },
    underLine: {
        textDecorationLine: 'underline'
    },
    pokeRow: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',      
        padding: 10,
        borderBottomWidth: 1,
        borderColor: pokeColors.pokeDarkRed
    },
    pokeRowStat: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',      
        padding: 5,
    }
})