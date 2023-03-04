import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { QuoteFeed, SubjectsScreen, SettingsScreen } from './Screens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="QuoteFeed" component={QuoteFeed} />
        <Stack.Screen name="Subjects" component={SubjectsScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C6641',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subjectButton: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: '#877965',
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  subjectText: {
    fontSize: 34,
    color: 'white',
  },
  settingsButton: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    backgroundColor: '#877965',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  settingsText: {
    fontSize: 34,
    color: 'white',
  }
});
