import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useLayoutEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle, {pokeColors} from '../styles/globalStyle';
import PokeButton from '../components/shared/PokeButton';
import { addFavorite, removeFavorite } from '../storage/services/storageService';

const DetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedPokemon} = useSelector(state => state.pokemon);
  const {favorites} = useSelector(state => state.user);

  const isInFavorites = favorites.some(({name}) => name === selectedPokemon.name);
  console.log(selectedPokemon.name)
  console.log(favorites.map(fav => fav.name))

  const toggleFavorites = () => {
    if (!isInFavorites) dispatch(addFavorite(selectedPokemon))
    else dispatch(removeFavorite(selectedPokemon.name))
    // if (!isInFavorites) dispatch(storeNewFavorite(selectedPokemon));
    // else dispatch(removeFavoriteFromStore(selectedPokemon));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedPokemon.name.toUpperCase(),
    })
  }, [selectedPokemon])

  return (
    <View style={styles.main}>
      {!!selectedPokemon && (
        <>
          <Image
            source={{
              uri: selectedPokemon.sprites.other['official-artwork']
                .front_default,
            }}
            width={300}
            height={300}
          />
          <View style={styles.pokeHeader}>
            <Text style={styles.largeText}>
              {selectedPokemon.name.toUpperCase()}
            </Text>
            <Text style={styles.largeText}># {selectedPokemon.order}</Text>
          </View>
          <View style={styles.pokeRow}>
            <Text style={styles.mediumText}>Types:</Text>
            {selectedPokemon.types.map(type => (
              <Text
                key={type.slot}
                style={[styles.mediumText, styles.underLine]}>
                {type.type.name.toUpperCase()}
              </Text>
            ))}
          </View>
          {selectedPokemon.stats.map(stat => (
            <View style={styles.pokeRowStat} key={stat.stat.name}>
              <Text style={styles.mediumText}>
                {stat.stat.name.toUpperCase()}
              </Text>
              <Text style={[styles.mediumText, styles.underLine]}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
          <PokeButton
            title={isInFavorites ? 'Release' : 'Catch!'}
            onPress={toggleFavorites}
            variant={!isInFavorites}
          />
        </>
      )}
    </View>
  );
};

export default DetailScreen;

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
    ...globalStyle.textWhite,
  },
  mediumText: {
    ...globalStyle.textLarge,
    ...globalStyle.textBlue,
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  pokeRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: pokeColors.pokeDarkRed,
  },
  pokeRowStat: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});
