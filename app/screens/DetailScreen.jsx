import { Button, Image, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEvolve, setPokemon } from '../storage/slices/pokeSlice'
import { addToFavorites, removeFromFavorites } from '../storage/slices/userSlice'

const DetailScreen = ({navigation, route}) => {

    const {pokeId} = route.params
    const dispatch = useDispatch()
    const {selectedPokemon} = useSelector(state => state.pokemon)
    const {favorites} = useSelector(state => state.user)
    
    const isInFavorites = !!favorites.find(({id}) => id === pokeId)

    console.log(favorites, isInFavorites)

    useLayoutEffect(() => {
        // dispatch(setPokemon(pokeId))
        if (selectedPokemon?.id == pokeId) {
            dispatch(getEvolve({url: selectedPokemon.species.url}))

            navigation.setOptions({title : selectedPokemon.name})
        } else {
            dispatch(setPokemon(pokeId))
        }
    }, [selectedPokemon])

    const toggleFavorites = () => {
        if (!isInFavorites) dispatch(addToFavorites(selectedPokemon))
        else dispatch(removeFromFavorites(selectedPokemon))
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
                <Button title={isInFavorites? 'Release' : 'Catch'} onPress={toggleFavorites} />
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
        padding: 10
    },
    pokeHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        borderBottomWidth: 3,
        borderColor: 'black'
    },
    largeText: {
        fontSize: 30
    },
    mediumText: {
        fontSize: 22,
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
        borderColor: 'black'
    },
    pokeRowStat: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',      
        padding: 5,
    }
})