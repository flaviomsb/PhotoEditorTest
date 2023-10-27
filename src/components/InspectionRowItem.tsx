import React from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootParamList } from '../Routes';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton, List } from 'react-native-paper';
import type { Inspection } from '../models/Inspection';
import DefectCount from './DefectCount';

export default function InspectionRowItem({
  inspection,
  onPress,
  navigation,
}: {
  inspection: Inspection;
  onPress: () => void;
  navigation: NativeStackNavigationProp<RootParamList, 'Home', undefined>;
}) {
  const signInspection = React.useCallback(() => {
    navigation.push('InspectionSignature', {
      id: inspection.id.toString(),
    });
  }, [inspection.id, navigation]);

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <List.Item
        title={inspection.title}
        description={`Inspector: ${inspection.user.name}`}
      />
      <View style={styles.icons}>
        {inspection.signaturePath && (
          <IconButton icon="file-sign" size={20} onPress={signInspection} />
        )}
        <DefectCount count={inspection.defects?.length ?? 0} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
