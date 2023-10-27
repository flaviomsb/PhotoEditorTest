import React, { useCallback, useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, View, StyleSheet } from 'react-native';
import { Divider, Searchbar } from 'react-native-paper';
import InspectionRowItem from '../components/InspectionRowItem';
import EmptyListMessage from '../components/EmptyListMessage';
import ScreenContainer from '../components/ScreenContainer';
import useInspections from '../hooks/useInspections';
import { Inspection } from '../models/Inspection';
import { RootParamList } from '../Routes';
import PopulateDbButton from '../components/PopulateDbButton';

const keyExtractor = (item: Inspection) => item.id.toString();

interface Props extends NativeStackScreenProps<RootParamList, 'Home'> {}

export default function Home({ navigation }: Props): React.JSX.Element {
  const [searchCriteria, setSearchCriteria] = useState('');
  const inspections = useInspections({ searchCriteria });

  const renderItem = useCallback(
    ({ item }: { item: Inspection }) => (
      <InspectionRowItem
        inspection={item}
        navigation={navigation}
        onPress={() => {
          navigation.navigate('Inspect', {
            id: item.id.toString(),
            title: item.title,
          });
        }}
      />
    ),
    [navigation],
  );

  return (
    <ScreenContainer>
      <View style={styles.topBar}>
        {!inspections.length && !searchCriteria ? (
          <PopulateDbButton />
        ) : (
          <Searchbar
            value={searchCriteria}
            onChangeText={text => {
              setSearchCriteria(text);
            }}
            placeholder="Search"
          />
        )}
      </View>
      <FlatList
        data={inspections}
        initialNumToRender={20}
        ItemSeparatorComponent={Divider}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyListMessage message="No inspections available" />
        }
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  topBar: {
    marginVertical: 10,
  },
});
