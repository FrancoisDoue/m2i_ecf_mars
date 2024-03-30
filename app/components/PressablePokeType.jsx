import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { pokeColors } from '../styles/globalStyle';
import PokeType from './shared/PokeType';

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
        <PokeType type={nameType} />
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
