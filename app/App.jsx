import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import { Provider } from 'react-redux'
import store from './storage/store'
import DetailScreen from './screens/DetailScreen'
import FavoritesScreen from './screens/FavoritesScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const PokeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='pokedex'
    >
      <Stack.Screen name='pokedex' component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name='pokedetail' component={DetailScreen} />
    </Stack.Navigator>
  )
}

const App = () => {


  return (
    <>
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName='home'
          screenOptions={{
            headerShown: false
          }}
        >
          <Tab.Screen name='search' component={SearchScreen} options={{
            tabBarLabel: 'Rechercher',
            tabBarIcon: ({focused, color}) => <Icon name='search' color={color} size={focused ? 40 : 30} />
          }}/>
          <Tab.Screen name='home'  component={PokeStack} options={{
            tabBarLabel: 'Pokedex',
            tabBarIcon: ({focused, color}) => <Icon name='catching-pokemon' color={color} size={focused ? 40 : 30} />
          }}/>
          <Tab.Screen name='favorites' component={FavoritesScreen} options={{
            tabBarLabel: 'Mes Pokemons',
            tabBarIcon: ({focused, color}) => <Icon name='bookmark' color={color} size={focused ? 40 : 30} />,
            headerShown: true,
            title: 'Mes Pokemons'
          }}/>

        </Tab.Navigator>

      </NavigationContainer>
    </Provider>
    </>
  )
}

export default App