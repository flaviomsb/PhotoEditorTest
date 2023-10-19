import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import Home from './screens/Home';
import TakeTest from './screens/TakeTest';

export type RootParamList = {
  Home: undefined;
  TakeTest: undefined;
};

const Stack = createNativeStackNavigator<RootParamList>();

export function Routes() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TakeTest" component={TakeTest} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
