import { StyleSheet } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'


const FavoritesScreen = ({ navigation }) => {

    const { favorites } = useSelector(state => state.user)
    
    handleNavigate = (id) => {
        navigation.navigate('home', {
            screen: 'pokedetail',
            params: {pokeId: id},
        })
    }

    return (
        <GradientView>
            <PokeList 
                list={favorites}
                pressedAction={handleNavigate}
            />
        </GradientView>
    )
}

export default FavoritesScreen

const styles = StyleSheet.create({})