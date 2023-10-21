import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ScreenContainer({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#ffffff',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
});
