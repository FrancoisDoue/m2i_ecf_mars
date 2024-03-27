import {
  Button,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import PokeItem from './PokeItem';
import {useDispatch, useSelector} from 'react-redux';
import {pokeColors} from '../styles/globalStyle';
import {goToNextPage, goToPrevPage} from '../storage/slices/pokeSlice';

const PokeList = ({list}) => {
  const dispatch = useDispatch();

  const {step, page} = useSelector(state => state.pokemon);

  const PressableFooter = () => {
    return (
      <Pressable>
        <Text>Test</Text>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={list}
      numColumns={2}
      ListHeaderComponent={
        page > 1 && (
          <Button title="Précédents" color={pokeColors.pokeDarkRed} onPress={() => dispatch(goToPrevPage())} />
        )
      }
      ListFooterComponent={
        list?.length == step && (
          //   <Button title='Suivants' color={pokeColors.pokeBlue}  onPress={() => dispatch(goToNextPage())} />
          <PressableFooter />
        )
      }
      ListFooterComponentStyle={styles.footerComponent}
      columnWrapperStyle={{justifyContent: 'center'}}
      keyExtractor={item => item.name}
      renderItem={({item}) => <PokeItem pokemon={item} />}
      
    />
  );
};

export default PokeList;

const styles = StyleSheet.create({
  footerComponent: {
    padding: 40,
    width: '100%',
  },
});

// const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
//   // https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end
//   const paddingToBottom = 100;
//   return layoutMeasurement.height + contentOffset.y >=
//     contentSize.height - paddingToBottom;
// };
// const [refreshing, setRefreshing] = useState(false)

// onScroll={({nativeEvent}) => (!!onEnd && isCloseToBottom(nativeEvent)) && onEnd()} // pb de performance...

// -------------------------------------
// const onRefresh = React.useCallback(() => {
//   setRefreshing(true)
//   setTimeout(() => { setRefreshing(false) }, 2000)
// }, [])

// useEffect(() => {
//   console.log(refreshing)
// }, [refreshing])

// refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

// -----------------------------

// onEndReachedThreshold={-.01}
// onStartReachedThreshold={.01}
// onStartReached={() => console.log('start')}
// onEndReached={() => console.log('hello')}
// scrollEventThrottle={200}
