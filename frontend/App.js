import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { LoginScreen } from './src/screens/LoginScreen';
import { QuoteFeedScreen } from './src/screens/QuoteFeedScreen';
import { SubjectsScreen } from './src/screens/SubjectsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { BookmarksScreen } from './src/screens/BookmarksScreen';
import UserContext from './src/utils/UserContext';

const Stack = createStackNavigator();

export default function App() {
  // User ID Context
  const [userId, setUserId] = useState("1");

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="QuoteFeed" component={QuoteFeedScreen} />
          <Stack.Screen name="Subjects" component={SubjectsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>

  )

}