import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { QuoteFeedScreen } from './src/screens/QuoteFeedScreen';
import { SubjectsScreen } from './src/screens/SubjectsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { BookmarksScreen } from './src/screens/BookmarksScreen';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="QuoteFeed" component={QuoteFeedScreen} />
        <Stack.Screen name="Subjects" component={SubjectsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}