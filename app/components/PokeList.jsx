import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PokeItem from './PokeItem'

const PokeList = ({list, pressedAction}) => {
  return (
    <FlatList
        data={list}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'center'}}
        keyExtractor={(item) => item.name}
        renderItem={({item}) => 
            <PokeItem pokemon={item} onPress={() => pressedAction(item.id)} />
        }
  />
  )
}

export default PokeList

const styles = StyleSheet.create({})