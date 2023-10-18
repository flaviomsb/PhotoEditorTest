import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import PhotoEditor from '@baronha/react-native-photo-editor';

const { width } = Dimensions.get('window');

const App = () => {
  const stickers = [];
  const [photo, setPhoto] = useState({});
  const remoteURL =
    'https://images.unsplash.com/photo-1634915728822-5ad85582837a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=774&q=80';

  const onEdit = async () => {
    try {
      const path = await PhotoEditor.open({
        path: remoteURL,
        // path: photo.path,
        stickers,
      });
      setPhoto({
        ...photo,
        path,
      });
      console.log('resultEdit', path);
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity onPress={onEdit}>
        {photo?.path && (
          <Image
            style={style.image}
            source={{
              uri: photo.path,
            }}
          />
        )}
        <Image
          style={style.image}
          source={{
            uri: remoteURL,
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {},
  image: {
    width,
    height: width,
  },
  openPicker: {
    margin: 12,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleOpen: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 12,
  },
});
