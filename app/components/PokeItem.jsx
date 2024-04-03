import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import globalStyle, {pokeColors} from '../styles/globalStyle';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {setSelectedPokemon} from '../storage/slices/pokeSlice';
import {fetchPokemon} from '../storage/services/pokemonService';
import {useNavigation} from '@react-navigation/native';

const PokeItem = ({pokemon}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const favorites = useSelector(state => state.user.favorites);
  const {pokeList} = useSelector(state => state.pokemon);
  const isInFavorites = favorites.some(fav => fav.id == pokemon.id);

  const handlePokeNavigation = (item) => {
    if (pokeList.some(({id}) => item.id == id)) {
      dispatch(setSelectedPokemon(item));
    } else {
      dispatch(fetchPokemon(item));
    }
    navigation.navigate('home', {screen:'pokedetail'})
  };

  const styles = StyleSheet.create({
    pokeBox: {
      position: 'relative',
      minWidth: 150,
      width: '33%',
      height: 100,
      margin: 15,
      backgroundColor: pokeColors.pokeWhite,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: isInFavorites ? 1.5 : 0.5,
      borderColor: pokeColors[isInFavorites ? 'pokeDarkRed' : 'pokeBlue'],
      borderRadius: 4,
      elevation: 3,
    },
    pokeDescription: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    },
    cardText: {
      ...globalStyle.textSmall,
      color: pokeColors[isInFavorites ? 'pokeDarkRed' : 'pokeBlue'],
      fontWeight: isInFavorites ? '600' : '400',
    },
    pokeball: {
      position: 'absolute',
      top: 5,
      right: 15,
      opacity: 0.5,
      transform: [{rotate: '20deg'}],
    },
  });

  const pokeImg = isInFavorites
    ? pokemon.sprites.other.showdown.front_default || pokemon.sprites.front_default
    : pokemon.sprites.front_default;

  return (
    <Pressable
      style={styles.pokeBox}
      onPress={() => handlePokeNavigation(pokemon)}>
      <Image
        source={{uri: pokeImg}}
        style={{width: 100, height: 70}}
        resizeMode={isInFavorites ? 'contain' : 'cover'}
      />
      <View style={styles.pokeDescription}>
        {[pokemon.name.toUpperCase(), '#' + pokemon.order].map((element, i) => (
          <Text key={i} style={styles.cardText}>
            {element}
          </Text>
        ))}
      </View>
      {isInFavorites && (
        <View style={styles.pokeball}>
          <Icon
            name="catching-pokemon"
            color={pokeColors.pokeDarkRed}
            size={40}
          />
        </View>
      )}
    </Pressable>
  );
};

export default PokeItem;
