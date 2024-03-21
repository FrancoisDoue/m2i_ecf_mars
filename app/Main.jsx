import React from 'react'
import App from './App'
import { pokeColors } from './styles/globalStyle'
import { Provider } from 'react-redux'
import store from './storage/store'
import { StatusBar } from 'react-native'

const Main = () => {

  return (
    <>
    <StatusBar backgroundColor={pokeColors.pokeRed} />
    <Provider store={store}>
      <App />
    </Provider>
    </>
  )
}

export default Main