import React from 'react';
import { View } from 'react-native';
import { RealmProvider } from './src/models';
import { Routes } from './src/Routes';
import { Text } from 'react-native-paper';

const App = () => {
  return (
    <RealmProvider
      fallback={
        <View>
          <Text>Loading...</Text>
        </View>
      }>
      <Routes />
    </RealmProvider>
  );
};

export default App;
