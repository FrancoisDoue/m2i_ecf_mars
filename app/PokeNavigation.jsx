import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import DetailScreen from './screens/DetailScreen'
import FavoritesScreen from './screens/FavoritesScreen'
import { StyleSheet } from 'react-native'
import globalStyle, { pokeColors } from './styles/globalStyle'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const PokedexStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='pokedex'
      screenOptions={{
        headerTintColor: pokeColors.pokeWhite,
        headerStyle: styles.headerStyle
      }}
    >
      <Stack.Screen name='pokedex' component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name='pokedetail' component={DetailScreen} />
    </Stack.Navigator>
  )
}
const FavoritesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='favoritesList'
      screenOptions={{
        headerTintColor: pokeColors.pokeBlue,
      }}
    >
      <Stack.Screen name='favoritesList' component={FavoritesScreen} options={{headerShown: false}} />
      <Stack.Screen name='pokedetail' component={DetailScreen} />
    </Stack.Navigator>
  )
}

const PokeNavigation = () => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='home'
        screenOptions={{
          headerShown: false,
          headerStyle: styles.headerStyle,
          headerTintColor: pokeColors.pokeWhite,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: globalStyle.textSmall,
          tabBarInactiveTintColor: pokeColors.pokeBlue,
          tabBarActiveTintColor: pokeColors.pokeDarkRed,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen name='search' component={SearchScreen} options={{
          tabBarLabel: 'Rechercher',
          tabBarIcon: ({focused, color}) => <Icon name='search' color={color} size={focused ? 40 : 30} />
        }}/>
        <Tab.Screen name='home'  component={ PokedexStack } options={{
          tabBarLabel: 'Pokedex',
          tabBarIcon: ({focused, color}) => <Icon name='catching-pokemon' color={color} size={focused ? 45 : 32} />
        }}/>
        <Tab.Screen name='favorites' component={FavoritesStack} options={{
          tabBarLabel: 'Mes Pokemons',
          tabBarIcon: ({focused, color}) => <Icon name='bookmark' color={color} size={focused ? 40 : 30} />
        }}/>

      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 90, 
    paddingBottom: 9, 
    backgroundColor: pokeColors.pokeWhite, 
    borderTopWidth: 2,
    borderTopColor: pokeColors.pokeDarkRed,
  },
  headerStyle: {
    backgroundColor: pokeColors.pokeRed
  },
})

export default PokeNavigation