import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'
import { StyleSheet, Text, View } from 'react-native'
import PokeType from '../components/shared/PokeType'
import globalStyle from '../styles/globalStyle'
import LoadingView from '../components/shared/LoadingView'

const HomeScreen = ({ navigation, route }) => {
  const {searchName, searchTypes} = route.params || {}

  const {pokeList, isLoading} = useSelector(state => state.pokemon)

  useLayoutEffect(() => {
    // console.log(searchName, searchTypes)
    const [isName, isTypes] = [!!searchName, !!searchTypes?.length]
    if (isName || isTypes){
      navigation.setOptions({
        headerShown: !isLoading,
        headerShadowVisible: false,
        title: 'Search results for:',
        headerRight: () => (
          <View style={styles.searchResults}>
            {isName && 
              <Text style={[styles.headerTextResult, {fontWeight: '500'}]}> "{searchName}" </Text>
            }
            {(isName && isTypes) && <Text style={styles.headerTextResult}> & </Text>}
            {isTypes && 
            <View style={styles.typesBearer}>
              <Text style={styles.headerTextResult}>type{searchTypes.length > 1 ? 's' : ''} : </Text>
              {searchTypes.map((e, i) => 
                <PokeType style={styles.pokeType} key={i} type={e} width={40} height={17}/>)
              }
            </View> }
          </View>
        )
      })
    } else navigation.setOptions({ headerShown: false })
  }, [route.params, isLoading])


  if (isLoading) return (
    <LoadingView />
  )

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
    width: '52%',
    height: '100%',
    justifyContent: 'space-between',
  },
  typesBearer: {
    flexDirection: 'row'
  },
  pokeType: {
    margin: 2,
  },
  headerTextResult: {
    ...globalStyle.textWhite,
    ...globalStyle.textSmall
  }
})

export default HomeScreen
