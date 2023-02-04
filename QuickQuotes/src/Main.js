import React from 'react';
import {NavigationContainer} from '@react-navigation/native';  // might have to download navigation files separately?
import {createStackNavigator} from '@react-navigation/stack';

import LoginView from './LoginView';
import LoginView from './LoginView';

const Stack = createStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animationEnabled: false, // Animations mess with Jest and Testing Library
        }}>
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen
          name="QuoteView"
          component={WorkspaceList}
          title="QuoteView"
          headerBackTitle="logout"
          headerBackAccessibilityLabel="logout"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
