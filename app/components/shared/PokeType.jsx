import { Image } from 'react-native'
import React from 'react'

const PokeType = ({type, height = 26, width = 60, style}) => {
  return (
    <Image 
        source={{uri : `https://veekun.com/dex/media/types/en/${type}.png`}} 
        width={width}
        height={height}
        style={style}
    />
  )
}
export default PokeType
