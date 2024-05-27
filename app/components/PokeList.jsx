import { FlatList, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import PokeItem from './PokeItem';
import { useDispatch, useSelector } from 'react-redux';
import {pokeColors} from '../styles/globalStyle';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { goToNextPage, goToPrevPage } from '../storage/slices/pokeSlice';

const PokeList = ({list, isFavoritesScreen}) => {
  const dispatch = useDispatch();

  const {step, page} = useSelector(state => state.pokemon);

  const PressableElement = ({direction, onPress}) => {
    return (
      <Pressable onPress={onPress}>
        <Icon name={`keyboard-arrow-${direction}`} size={40} color={pokeColors.pokeBlue} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={list}
      numColumns={2}
      fadingEdgeLength={10}
      ListHeaderComponent={
        (page > 1 && !isFavoritesScreen) &&
          <PressableElement direction={'up'} onPress={() => dispatch(goToPrevPage())} />
      }
      ListHeaderComponentStyle={styles.pressableElement}
      ListFooterComponent={
        list?.length == step && 
          <PressableElement direction={'down'} onPress={() => dispatch(goToNextPage())}/>
      }
      ListFooterComponentStyle={styles.pressableElement}
      columnWrapperStyle={{justifyContent: 'center'}}
      keyExtractor={item => item.name}
      renderItem={({item}) => <PokeItem pokemon={item} />}
      
    />
  );
};

export default PokeList;

const styles = StyleSheet.create({
  pressableElement: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: pokeColors.pokeWhite,
    opacity: .35,
  },
});
