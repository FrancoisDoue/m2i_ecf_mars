import React from 'react'
import { useSelector } from 'react-redux'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'


const FavoritesScreen = ({ navigation }) => {

    const { favorites } = useSelector(state => state.user)
    console.log(favorites)

    return (
        <GradientView>
            <PokeList 
                list={favorites}
                isFavoritesScreen
            />
        </GradientView>
    )
}

export default FavoritesScreen

// const styles = StyleSheet.create({})