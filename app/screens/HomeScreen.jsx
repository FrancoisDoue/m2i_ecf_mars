import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'
import { StyleSheet, Text, View } from 'react-native'
import PokeType from '../components/shared/PokeType'

const HomeScreen = ({ navigation, route }) => {
  const {searchName, searchTypes} = route.params || {}

  const {pokeList} = useSelector(state => state.pokemon)

  useLayoutEffect(() => {
    // console.log(searchName, searchTypes)
    const [isName, isTypes] = [!!searchName, !!searchTypes?.length]
    console.log(isName, isTypes)
    if (isName || isTypes){
      navigation.setOptions({
        headerShown: true,
        headerShadowVisible: false,
        title: 'Search results for:',
        headerRight: () => (
          <View style={styles.searchResults}>
            {isName && <Text>"{searchName.toUpperCase()}"</Text>}
            {(isName && isTypes) && <Text>&</Text>}
            {isTypes && <View style={styles.typesBearer}>
              <Text>type{searchTypes.length > 1 ? 's' : ''} : </Text>
              {searchTypes.map(e => <PokeType type={e} width={40} height={17}/>)}
            </View> }
          </View>
        )
      })
    }
  }, [route.params])

  return (
    <GradientView>
      <PokeList 
        list={pokeList} 
        navigation={navigation}
      />
    </GradientView>
  )
}

const styles = StyleSheet.create({
  searchResults: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between'
  },
  typesBearer: {
    width: '70%',
    flexDirection: 'row'
  }
})

export default HomeScreen
