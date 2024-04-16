import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle, {pokeColors} from '../styles/globalStyle';
import PokeButton from '../components/shared/PokeButton';
import { addFavorite, removeFavorite } from '../storage/services/storageService';
import { fetchEvolutions } from '../storage/services/pokemonService';

const DetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedPokemon} = useSelector(state => state.pokemon);
  const {favorites} = useSelector(state => state.user);

  const isInFavorites = favorites.some(({name}) => name === selectedPokemon.name);

  const toggleFavorites = () => {
    if (!isInFavorites) dispatch(addFavorite(selectedPokemon))
    else dispatch(removeFavorite(selectedPokemon.name))
  };

  useLayoutEffect(() => {
    if (!selectedPokemon.evolutions) dispatch(fetchEvolutions())
    navigation.setOptions({
      title: selectedPokemon.name.toUpperCase(),
    })
  }, [selectedPokemon])
  useEffect(() => {
  }, [])

  return (
    <View style={styles.main}>
      {!!selectedPokemon && (
        <>
          <Image
            source={{
              uri: selectedPokemon.imageLarge,
            }}
            width={300}
            height={300}
          />
          <View style={styles.pokeHeader}>
            <Text style={styles.largeText}>
              {selectedPokemon.upperCaseName}
            </Text>
            <Text style={styles.largeText}># {selectedPokemon.order}</Text>
          </View>
          <View style={styles.pokeRow}>
            <Text style={styles.mediumText}>Types:</Text>
            {selectedPokemon.types.map((type) => (
              <Text
                key={type.name}
                style={[styles.mediumText, styles.underLine]}>
                {type.name.toUpperCase()}
              </Text>
            ))}
          </View>
          {selectedPokemon.stats.map(stat => (
            <View style={styles.pokeRowStat} key={stat.name}>
              <Text style={styles.mediumText}>
                {stat.name.toUpperCase()}
              </Text>
              <Text style={[styles.mediumText, styles.underLine]}>
                {stat.baseStat}
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
