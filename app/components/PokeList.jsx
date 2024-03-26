import { FlatList } from 'react-native'
import React from 'react'
import PokeItem from './PokeItem'
import { useSelector } from 'react-redux'

const PokeList = ({list, headerComponent, footerComponent}) => {

  const {step} = useSelector(state => state.pokemon)

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
      ListFooterComponent={ (!!footerComponent && list?.length == step) ? footerComponent : <></> }
      // onScroll={({nativeEvent}) => (!!onEnd && isCloseToBottom(nativeEvent)) && onEnd()} // pb de performance...
      onEndReachedThreshold={-.01}
      onStartReachedThreshold={.01}
      onStartReached={() => console.log('start')}
      onEndReached={() => console.log('hello')}
      // scrollEventThrottle={200}
      columnWrapperStyle={{justifyContent: 'center'}}
      keyExtractor={(item) => item.name}
      renderItem={({item}) => 
          <PokeItem pokemon={item} />
      }
    />
  )
}

export default PokeList
