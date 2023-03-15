import React, { useContext } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Toast from 'react-native-root-toast';
import { signInAnonymously } from 'firebase/auth';

import LoginStyles from '../styles/LoginStyles';
import auth from '../../firebase.js';
import UserContext from '../utils/UserContext';
import { addUserToDatabase } from '../utils/Api';

// Start screen
export const LoginScreen = ({ navigation }) => {
  const { setUserId } = useContext(UserContext);

  // When the user presses the Login button, log them in as an anonymous user
  const handleAnonymousSignIn = async () => {
    // Log the user in as an anonymous user
    await signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;

        // Set context
        setUserId(user.uid);

        // Add the user to the database if not already in there
        addUserToDatabase(user.uid);

        // Display toast notification
        Toast.show("Logged in as anonymous user", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Anonymous sign-in failed:", errorCode, errorMessage);
      });
  };

  const handleButtonPress = async () => {
    await handleAnonymousSignIn();
    navigation.navigate('QuoteFeed');
  }

  return (
    <View style={LoginStyles.GreenBackground}>
      <View style={LoginStyles.QuoteFeed}>
        <View style={LoginStyles.QuoteFeedTitleBackground}>
          <Text style={LoginStyles.QuoteFeedTitleText}>QuickQuotes</Text>
        </View>
        <Image source={require('../../green-quote-mark-icon.png')} style={LoginStyles.image} />
        <View style={LoginStyles.RowContainer}>
          <Pressable style={LoginStyles.SettingButton} onPress={handleButtonPress}>
              <Text style={LoginStyles.SettingText}>Press to Enter</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};