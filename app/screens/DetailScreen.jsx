import {Image, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
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
        navigation.goBack()
        navigation.jumpTo('home', {
          screen: 'pokedetail'
        })
      }
    }
  }

  const EvolutionDisplay = () => {

    const PokePressable = ({pokemon, style}) => {
      return (
        <Pressable
          onPress={() => goToEvolution(pokemon)}
          style={[styles.evolutionItem, style, pokemon.name == selectedPokemon.name && { borderWidth: 1.5, borderColor: pokeColors.pokeDarkRed }]}
        >
          <Image
            source={{
              uri:
                pokemon.name == selectedPokemon.name
                  ? pokemon?.imageAnimatedSmall
                  : pokemon?.imageSmall,
            }}
            width={100} height={55}
            resizeMode={ pokemon.name == selectedPokemon.name ? 'contain' : 'cover' }
          />
          <Text style={[styles.evolutionText, pokemon.name == selectedPokemon.name && {...globalStyle.textRed}]}>
            {pokemon.capitalizedName}
          </Text>
        </Pressable>
      )
    }

    return (
      <>
        {selectedEvolutions?.length > 1 && (
          <View style={styles.pokeEvolutions}>
            {selectedEvolutions?.map((pokemon, index) => (
              <React.Fragment key={index}>
                {!!index && (
                  <View>
                    <Icon
                      name="keyboard-double-arrow-right"
                      size={20}
                      color={pokeColors.pokeBlue}
                    />
                  </View>
                )}
                {(Array.isArray(pokemon)) 
                  ? <ScrollView 
                    style={[styles.multiEvolutionItem]} 
                    horizontal
                    fadingEdgeLength={50}
                  >
                    {pokemon.map((p, i) => (
                      <PokePressable key={i} pokemon={p} style={{marginHorizontal: 5, width: 120}} />
                    ))}
                  </ScrollView>
                  : <PokePressable pokemon={pokemon}/>
                }
              </React.Fragment>
            ))}
          </View>
        )}
      </>
    );
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
            <EvolutionDisplay />
            <View style={styles.detailContainer}>
              <View style={styles.descriptionContainer}>
                <Text style={[styles.titleDescription]}>Description</Text>
                <ScrollView >
                  <Text style={[globalStyle.textSmall, globalStyle.textBlue]}>{selectedPokemon.description}</Text>
                </ScrollView>
              </View>
              <View style={styles.pokeStats}>
                {selectedPokemon.stats.map(stat => (
                  <View style={styles.pokeRowStat} key={stat.name}>
                    <Text style={styles.textStat}>
                      {stat.name.toUpperCase()}
                    </Text>
                    <Text style={[styles.textStat]}>
                      {stat.baseStat}
                    </Text>
                  </View>
                ))}
              </View>
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
    width: '29%',
    maxWidth: 120,
    height: 80,
    justifyContent: 'center',
    backgroundColor: pokeColors.pokeWhite,
    elevation: 2,
    alignItems: 'center',
    margin: 2,
    borderWidth: .5,
    borderColor: pokeColors.pokeBlue,
    borderRadius: 4,
  },
  multiEvolutionItem: {
    margin: 4,
    borderWidth: .5,
    borderColor: pokeColors.pokeBlue,
    backgroundColor: pokeColors.pokeWhite,
    borderRadius: 4,
    elevation: 2,
    height: 90,
    paddingVertical: 1,
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
    ...globalStyle.textMedium,
    fontWeight: '500',
    ...globalStyle.textBlue,
  },
  detailContainer: {
    width: '100%',
    maxHeight: 220,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  pokeRow: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: pokeColors.pokeDarkRed,
  },
  pokeStats: {
    width: '60%',
    borderLeftWidth: 1,
    borderColor: pokeColors.pokeRed
  },
  pokeRowStat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 2,
    margin: 2,
    marginLeft: 15,
    borderRadius: 4,
    elevation: 2,
    backgroundColor: pokeColors.pokeDarkRed
  },
  textStat: {
    ...globalStyle.textMedium,
    color: pokeColors.pokeWhite
  },
  descriptionContainer: {
    width: '40%',
    maxHeight: '100%',
    padding: 5,
  },
  titleDescription: {
    ...globalStyle.textMedium, 
    ...globalStyle.textWhite,
    textAlign: 'center',
    borderRadius: 4,
    elevation: 2,
    backgroundColor: pokeColors.pokeDarkRed
  },
});
