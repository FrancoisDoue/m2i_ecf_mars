import {Image, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle, {pokeColors} from '../styles/globalStyle';
import PokeButton from '../components/shared/PokeButton';
import { addFavorite, removeFavorite } from '../storage/services/storageService';
import { fetchEvolutions } from '../storage/services/pokemonService';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedPokemon, selectedEvolutions} = useSelector(state => state.pokemon);
  const {favorites} = useSelector(state => state.user);
  // const [evolutions, setEvolutions] = useState(selectedPokemon.evolutions)

  const isInFavorites = favorites.some(({name}) => name === selectedPokemon.name);

  const toggleFavorites = () => {
    if (!isInFavorites) dispatch(addFavorite(selectedPokemon))
    else dispatch(removeFavorite(selectedPokemon.name))
  };

  useLayoutEffect(() => {
    if (!selectedPokemon.evolutions) dispatch(fetchEvolutions())
    // dispatch(fetchEvolutions())
    navigation.setOptions({
      title: selectedPokemon.upperCaseName,
    })
  }, [selectedPokemon.evolutions])

  return (
    <View style={styles.main}>
      {!!selectedPokemon && (
        <>
          <Image
            source={{
              uri: selectedPokemon.imageLarge,
            }}
            width={300}
            height={210}
            resizeMode='contain'
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
              <Image
                key={type.name}
                source={{uri: type.img}}
                width={69}
                height={28}
                resizeMode='contain'
              />
            ))}
          </View>
          <View style={styles.pokeMain} >
            <View style={styles.pokeEvolutions}>
              {selectedEvolutions?.map(({capitalizedName, name, imageAnimatedSmall, imageSmall}, index) => (
                <React.Fragment key={index}>
                {(!!index) && 
                <View>
                  <Icon name="keyboard-double-arrow-up" size={20} color={pokeColors.pokeBlue}/>
                </View>}
                <View 
                  style={[
                    styles.evolutionItem, 
                    (name == selectedPokemon.name) && {
                      borderWidth: 1.5,
                      borderColor: pokeColors.pokeDarkRed
                    }
                  ]}
                >
                  <Image 
                    source={{uri: (name == selectedPokemon.name) ? imageAnimatedSmall : imageSmall}}
                    width={100}
                    height={70}
                    resizeMode={(name == selectedPokemon.name) ? 'contain' : 'cover'}
                  />
                  <Text 
                    style={[styles.evolutionText, (name == selectedPokemon.name) && {...globalStyle.textRed}]}
                  >{capitalizedName}</Text>
                </View>
                </React.Fragment>
              ))}
            </View>
            <View style={styles.pokeStats}>
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
            </View>
          </View>
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
  pokeMain: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pokeEvolutions: {
    width: '29%',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
    borderRightWidth: 1,
    borderColor: pokeColors.pokeRed
  },
  evolutionItem: {
    width: '90%',
    height: 100,
    justifyContent: 'center',
    backgroundColor: pokeColors.pokeWhite,
    elevation: 2,
    alignItems: 'center',
    margin: 4,
    borderWidth: .5,
    borderColor: pokeColors.pokeBlue,
    borderRadius: 4,
  },
  evolutionText: {
    ...globalStyle.textSmall,
    ...globalStyle.textBlue,
    fontWeight: '500',
  },
  pokeStats: {
    width: '70%'
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
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});
