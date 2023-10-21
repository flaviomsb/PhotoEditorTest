import React, { useState } from 'react';
import Realm from 'realm';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootParamList } from '../Routes';
import { StyleSheet } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import ScreenContainer from '../components/ScreenContainer';
import useInspection from '../hooks/useInspection';
import { useRealm } from '../models';
import { Defect } from '../models/Defect';

interface AddDefectProps
  extends NativeStackScreenProps<RootParamList, 'AddDefect'> {}

export default function AddDefect({ navigation, route }: AddDefectProps) {
  const realm = useRealm();
  const inspection = useInspection(route.params.id);
  const [description, setDescription] = useState('');

  const goBack = () => {
    navigation.goBack();
    setDescription('');
  };

  const saveDefect = () => {
    realm.write(() => {
      const defect = realm.create<Defect>('Defect', {
        id: new Realm.BSON.UUID(),
        description,
        inspection,
      });

      inspection?.defects?.push(defect);
    });
    goBack();
  };

  return (
    <ScreenContainer>
      <Card mode="contained" style={styles.form}>
        <Card.Title title={inspection?.title} />
        <Card.Content style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            value={description}
            style={styles.input}
            onChangeText={text => {
              setDescription(text);
            }}
            placeholder="Enter details of the defect"
            multiline
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" onPress={goBack} uppercase>
            Cancel
          </Button>
          <Button
            mode="contained"
            icon="plus"
            buttonColor="green"
            onPress={saveDefect}
            disabled={description.length < 10}
            uppercase>
            Save
          </Button>
        </Card.Actions>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'transparent',
  },
  inputContainer: {
    paddingHorizontal: 8,
  },
  input: {
    backgroundColor: '#ffffff',
  },
});
