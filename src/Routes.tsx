import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import RealmPlugin from 'realm-flipper-plugin-device';
import { theme } from './assets/theme';
import { useRealm } from './models';
import Home from './screens/Home';
import Inspect from './screens/Inspect';
import InspectionSignature from './screens/InspectionSignature';
import AddDefect from './screens/AddDefect';

export type RootParamList = {
  Home: undefined;
  Inspect: {
    id: string;
    title: string;
  };
  InspectionSignature: {
    id: string;
  };
  AddDefect: {
    id: string;
  };
};

interface ScreenOptions {}

const Stack = createNativeStackNavigator<RootParamList>();
const headerOptions: Partial<ScreenOptions> = {
  headerStyle: {
    backgroundColor: theme.colors.primary,
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

export function Routes(): React.JSX.Element {
  const realm = useRealm();

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <>
          <RealmPlugin realms={[realm]} />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                title: 'Inspections',
                ...headerOptions,
              }}
            />
            <Stack.Screen
              name="Inspect"
              component={Inspect}
              options={({ route }) => ({
                title: route.params.title,
                ...headerOptions,
                headerBackVisible: false,
              })}
            />
            <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
              <Stack.Screen
                name="AddDefect"
                component={AddDefect}
                options={{
                  title: 'Add Defect',
                  ...headerOptions,
                }}
              />
              <Stack.Screen
                name="InspectionSignature"
                component={InspectionSignature}
                options={{
                  title: 'Inspector Signature',
                  ...headerOptions,
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </>
      </PaperProvider>
    </NavigationContainer>
  );
}
