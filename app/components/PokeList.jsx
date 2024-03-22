import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import PokeItem from './PokeItem'

const PokeList = ({list, pressedAction, headerComponent, footerComponent /*, onEnd*/}) => {

  // const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  //   // https://stackoverflow.com/questions/41056761/detect-scrollview-has-reached-the-end
  //   const paddingToBottom = 100;
  //   return layoutMeasurement.height + contentOffset.y >=
  //     contentSize.height - paddingToBottom;
  // };

  return (
    <FlatList
      data={list}
      numColumns={2}
      ListHeaderComponent={ headerComponent || <></> }
      ListFooterComponent={ footerComponent || <></> }
      // onScroll={({nativeEvent}) => (!!onEnd && isCloseToBottom(nativeEvent)) && onEnd()} // pb de performance...
      // scrollEventThrottle={200}
      columnWrapperStyle={{justifyContent: 'center'}}
      keyExtractor={(item) => item.name}
      renderItem={({item}) => 
          <PokeItem pokemon={item} /*onPress={() => pressedAction(item.id)} */ />
      }
    />
  )
}

export default PokeList

const styles = StyleSheet.create({})