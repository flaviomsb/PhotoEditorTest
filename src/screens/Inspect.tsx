import React, { useCallback } from 'react';
import { Button, Divider, IconButton } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import EmptyListMessage from '../components/EmptyListMessage';
import useInspection from '../hooks/useInspection';
import type { RootParamList } from '../Routes';
import { useQuery } from '../models';
import { Defect } from '../models/Defect';
import EditDefect from '../components/EditDefect';

interface Props extends NativeStackScreenProps<RootParamList, 'Inspect'> {}

const keyExtractor = (item: Defect) => item.id.toString();

export default function Inspect({ route, navigation }: Props) {
  const inspection = useInspection(route.params.id);
  const defects = useQuery(Defect).filtered('inspection IN {$0}', inspection);

  const renderItem = useCallback(({ item }: { item: Defect }) => {
    return <EditDefect defect={item} />;
  }, []);

  return (
    <ScreenContainer>
      <View style={styles.actions}>
        <IconButton
          mode="outlined"
          icon="arrow-left"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          mode="outlined"
          icon="car-wrench"
          onPress={() => {
            navigation.push('AddDefect', {
              id: route.params.id,
            });
          }}
          uppercase>
          Add Defect
        </Button>
      </View>
      <FlatList
        data={defects}
        removeClippedSubviews
        initialNumToRender={20}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={<EmptyListMessage message="No defects found" />}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
