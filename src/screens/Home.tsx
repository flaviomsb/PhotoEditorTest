import React, { useCallback, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  FlatList,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Button, Divider, List } from 'react-native-paper';
import EmptyListMessage from '../components/EmptyListMessage';
import ScreenContainer from '../components/ScreenContainer';
import { useQuery } from '../models';
import { Inspection } from '../models/Inspection';
import populateDb from '../services/db/populateDb';
import { RootParamList } from '../Routes';
import DefectCount from '../components/DefectCount';

const keyExtractor = (item: Inspection) => item.id.toString();
const leftIcon = (props: { color?: string; style?: StyleProp<ViewStyle> }) => (
  <List.Icon {...props} icon="car-info" />
);

interface Props extends NativeStackScreenProps<RootParamList, 'Home'> {}

export default function Home({ navigation }: Props): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const inspections = useQuery(Inspection);

  const renderItem = useCallback(
    ({ item }: { item: Inspection }) => (
      <TouchableOpacity
        style={styles.renderItem}
        onPress={() => {
          navigation.navigate('Inspect', {
            id: item.id.toString(),
            title: item.title,
          });
        }}>
        <List.Item
          title={item.title}
          description={`Inspector: ${item.user.name}`}
          left={leftIcon}
        />
        <DefectCount count={item.defects?.length ?? 0} />
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <ScreenContainer>
      {!inspections.length && (
        <View style={styles.populateDb}>
          <Button
            mode="contained"
            loading={loading}
            onPress={() => {
              setLoading(true);
              populateDb().finally(() => {
                setLoading(false);
              });
            }}>
            Populate DB
          </Button>
        </View>
      )}
      <FlatList
        data={inspections}
        removeClippedSubviews
        initialNumToRender={20}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          <EmptyListMessage message="No inspections available" />
        }
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  populateDb: {
    marginVertical: 20,
  },
  renderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
