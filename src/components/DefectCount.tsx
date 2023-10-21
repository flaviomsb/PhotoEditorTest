import React from 'react';
import { StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

export default function DefectCount({ count }: { count: number }) {
  return (
    <Chip
      style={[styles.root, count > 0 && styles.hasDefects]}
      textStyle={!!count && styles.label}
      disabled={!count}
      compact>
      {count}
    </Chip>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 30,
  },
  label: {
    fontWeight: 'bold',
  },
  hasDefects: {
    backgroundColor: '#ffc9b8',
  },
});
