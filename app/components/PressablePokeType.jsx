import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { pokeColors } from '../styles/globalStyle';

const PressablePokeType = ({action, disabled, nameType, types}) => {
  return (
    <Pressable
      disabled={disabled}
      style={e => [
        styles.btnType(e),
        types.find(type => type == nameType) && {
          borderColor: pokeColors.pokeDarkRed,
          elevation: 0,
        },
      ]}
      onPress={() => action(nameType)}>
      {/* <Text>{item.name}</Text>  */}
      <Image
        source={{uri: `https://veekun.com/dex/media/types/en/${nameType}.png`}}
        width={60}
        height={26}
      />
    </Pressable>
  );
};

export default PressablePokeType;

const styles = StyleSheet.create({
  btnType: ({pressed}) => ({
    padding: 1,
    margin: 8,
    borderWidth: 3,
    borderRadius: 3,
    borderColor: pressed ? pokeColors.pokeRed : pokeColors.pokeWhite,
    backgroundColor: pokeColors.pokeWhite,
    elevation: pressed ? 1 : 3,
  }),
});
