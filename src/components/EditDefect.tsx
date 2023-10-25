import React from 'react';
import type Realm from 'realm';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Defect } from '../models/Defect';
import { useRealm } from '../models';
import DefectPhotos from './DefectPhotos';

export default function EditDefect({ defect }: { defect: Defect }) {
  const realm = useRealm();
  const [description, setDescription] = React.useState('');

  const updateDefect = React.useCallback(() => {
    realm.write(() => {
      defect.description = description;
    });
  }, [defect, description, realm]);

  const deleteDefect = React.useCallback(() => {
    realm.write(() => {
      defect.inspection.defects = defect.inspection.defects?.filter(
        def => def.id.toString() !== defect.id.toString(),
      ) as unknown as Realm.List<Defect>;

      realm.delete(defect);
    });
  }, [defect, realm]);

  React.useEffect(() => {
    setDescription(defect.description);
  }, [defect.description]);

  return (
    <View style={styles.root}>
      <View>
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
      </View>
      <View style={styles.actions}>
        <Button
          icon="delete-forever"
          textColor="red"
          onPress={deleteDefect}
          uppercase>
          Delete
        </Button>
        <Button
          icon="check-circle"
          textColor="green"
          onPress={updateDefect}
          disabled={
            description === defect.description || description.length < 10
          }
          uppercase>
          Save
        </Button>
        <DefectPhotos defect={defect} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    marginBottom: 16,
    marginHorizontal: 4,
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  input: {
    backgroundColor: '#ffffff',
  },
  actions: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
