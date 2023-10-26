import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

export default function GoBackButton({
  onPress,
  style,
}: {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <IconButton
      style={style}
      mode="outlined"
      icon="arrow-left"
      onPress={onPress}
    />
  );
}
