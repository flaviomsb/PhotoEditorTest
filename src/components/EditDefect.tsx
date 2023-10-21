import React from 'react';
import { Defect } from '../models/Defect';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function EditDefect({ defect }: { defect: Defect }) {
  return (
    <View>
      <Text>{defect.description}</Text>
    </View>
  );
}
