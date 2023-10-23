import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { List } from 'react-native-paper';
import type { Inspection } from '../models/Inspection';
import DefectCount from './DefectCount';

const leftIcon = (props: { color?: string; style?: StyleProp<ViewStyle> }) => (
  <List.Icon {...props} icon="car-info" />
);

export default function InspectionRowItem({
  inspection,
  onPress,
}: {
  inspection: Inspection;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <List.Item
        title={inspection.title}
        description={`Inspector: ${inspection.user.name}`}
        left={leftIcon}
      />
      <DefectCount count={inspection.defects?.length ?? 0} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
