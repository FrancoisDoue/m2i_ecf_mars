import {Image, StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useLayoutEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import globalStyle, {pokeColors} from '../styles/globalStyle';
import PokeButton from '../components/shared/PokeButton';
import { addFavorite, removeFavorite } from '../storage/services/storageService';
import { fetchEvolutions } from '../storage/services/pokemonService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { setEvolutions, setSelectedPokemon } from '../storage/slices/pokeSlice';

const DetailScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {selectedPokemon, selectedEvolutions} = useSelector(state => state.pokemon);
  const {favorites} = useSelector(state => state.user);

  const isInFavorites = favorites.some(({name}) => name === selectedPokemon.name);

  const toggleFavorites = () => {
    if (!isInFavorites) dispatch(addFavorite(selectedPokemon))
    else dispatch(removeFavorite(selectedPokemon.name))
  };

  useLayoutEffect(() => {
    if (!selectedPokemon.evolutions) {
      dispatch(fetchEvolutions())
    } else if (selectedEvolutions != selectedPokemon.evolutions) {
      dispatch(setEvolutions(selectedPokemon.evolutions))
    }
    navigation.setOptions({
      title: selectedPokemon.upperCaseName,
    })
  }, [selectedPokemon])
  
  const goToEvolution = (evolution) => {
    if (selectedPokemon.name != evolution.name) {
      dispatch(setSelectedPokemon(evolution))
      if (!favorites.some(({name}) => name === evolution.name)) {
        console.log("pokemon is not in favorites")
        navigation.navigate('home', {
          screen: 'pokedetail'
        })
      }
    }
  }

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
            <Text style={styles.mediumText}>
              Type{selectedPokemon.types.length > 1 && 's'}:
            </Text>
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
            {(selectedEvolutions?.length > 1) &&
            <View style={styles.pokeEvolutions}>
              { selectedEvolutions?.map((pokemon, index) => (
                <React.Fragment key={index}>
                {(!!index) && 
                  <View>
                    <Icon name="keyboard-double-arrow-right" size={20} color={pokeColors.pokeBlue}/>
                  </View>
                }
                  <Pressable 
                    onPress={() => goToEvolution(pokemon)}
                    style={[
                      styles.evolutionItem, 
                      (pokemon.name == selectedPokemon.name) && {
                        borderWidth: 1.5,
                        borderColor: pokeColors.pokeDarkRed
                      }
                    ]}
                  >
                    <Image 
                      source={{uri: (pokemon.name == selectedPokemon.name) ? pokemon.imageAnimatedSmall : pokemon.imageSmall}}
                      width={100}
                      height={55}
                      resizeMode={(pokemon.name == selectedPokemon.name) ? 'contain' : 'cover'}
                    />
                    <Text 
                      style={[styles.evolutionText, (pokemon.name == selectedPokemon.name) && {...globalStyle.textRed}]}
                    >{pokemon.capitalizedName}</Text>
                  </Pressable>
                </React.Fragment>
              ))}
            </View>
            }
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
    // flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
  },
  pokeEvolutions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderColor: pokeColors.pokeRed
  },
  evolutionItem: {
    width: '27%',
    height: 80,
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
  // pokeStats: {
  //   width: '60%',
  // },
  pokeRowStat: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});
