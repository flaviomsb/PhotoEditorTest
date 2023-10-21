import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function EmptyListMessage({
  message,
}: {
  message: string;
}): React.JSX.Element {
  return (
    <View style={styles.root}>
      <Text variant="titleMedium">{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
