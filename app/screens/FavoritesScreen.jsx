import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import PokeList from '../components/PokeList'

const FavoritesScreen = ({ navigation }) => {

    const { favorites } = useSelector(state => state.user)

    return (
        <View>
            <PokeList list={favorites} pressedAction={console.log} />
        </View>
    )
}

export default FavoritesScreen

const styles = StyleSheet.create({})