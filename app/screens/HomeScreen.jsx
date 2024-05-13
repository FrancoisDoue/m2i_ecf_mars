import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PokeList from '../components/PokeList'
import GradientView from '../components/shared/GradientView'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import PokeType from '../components/shared/PokeType'
import globalStyle, { pokeColors } from '../styles/globalStyle'
import LoadingView from '../components/shared/LoadingView'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { setFilterList } from '../storage/slices/pokeFilterSlice'

const HomeScreen = ({ navigation, route }) => {

  const dispatch = useDispatch()
  const {pokeList, isLoading} = useSelector(state => state.pokemon)
  const {namesList} = useSelector(state => state.pokeFilter)
  const [params, setParams] = useState({})

  const clearFilters = () => {
    route.params = undefined
    setParams({})
    dispatch(setFilterList(namesList))
  }

  useEffect(() => {
    setParams(route.params || {})
  }, [route.params])
  
  useLayoutEffect(() => {
    const {searchName, searchTypes} = params
    const [isName, isTypes] = [!!searchName, !!searchTypes?.length]
    if (isName || isTypes){
      navigation.setOptions({
        headerShown: !isLoading,
        headerShadowVisible: false,
        title: 'Search:',
        headerRight: () => (
          <View style={styles.searchResults}>
            <View style={styles.searchResultContent}>
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
            <Pressable style={styles.clearFiltersBtn} onLongPress={clearFilters}>
              <Text style={styles.clearText}>Clear</Text>
              <Icon name='filter-alt-off' size={18} color={pokeColors.pokeWhite} />
            </Pressable>
          </View>
        )
      })
    } else {
      navigation.setOptions({ headerShown: false })
    }
  }, [isLoading, params])


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
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '75%',
  },
  searchResultContent: {
    flexDirection: 'row',
    width: '75%',
    paddingEnd: 20,
    height: '100%',
    justifyContent: 'space-between',
    margin: 0,
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
  },
  clearFiltersBtn: {
    borderWidth: .5,
    elevation: 4,
    backgroundColor: pokeColors.pokeDarkRed,
    borderColor: pokeColors.pokeWhite,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderRadius: 4,
    flexDirection: 'row',
  },
  clearText: {
    ...globalStyle.textWhite,
    marginHorizontal: 4,
  },
})

export default HomeScreen
