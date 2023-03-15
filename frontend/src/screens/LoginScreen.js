import {React, useContext} from 'react';
import { View, Text, Image, Button, Pressable } from 'react-native';
import UserContext from '../utils/UserContext';
import LoginStyles from '../styles/LoginStyles';

 import { useState, useEffect } from 'react';
// import { Pressable, Modal } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';

//  import QuoteFeedStyles from '../styles/QuoteFeedStyles';
//  import SettingStyles from '../styles/SettingStyles';
// import RenderNotificationsModal from '../components/RenderNotificationsModal';
// import auth from '../../firebase.js';

import { signInAnonymously } from 'firebase/auth';
import auth from '../../firebase.js';
import { addUserToDatabase } from '../utils/Api';
import Toast, { ToastContainer } from 'react-native-root-toast';
//import UserContext from '../utils/UserContext';
// Start screen
export const LoginScreen = ({ navigation }) => {
  const { userId, setUserId } = useContext(UserContext);

  // When the user presses the Login button, log them in as an anonymous user
  const handleAnonymousSignIn = async () => {
    // Check if user is already logged in
    if (userId != 1) {
      var toastMsg = "Already logged in!";
    } else {
      var toastMsg = "Logged in as anonymous user.";
    }

    // Log the user in as an anonymous user
    await signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;

        // Set context
        setUserId(user.uid);

        // Add the user to the database if not already in there
        addUserToDatabase(user.uid);

        // Display toast notification

        Toast.show(toastMsg, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });  

        navigation.navigate('QuoteFeed');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Anonymous sign-in failed:", errorCode, errorMessage);
      });
  };

  return (
    <View style={LoginStyles.GreenBackground}>
      <View style={LoginStyles.QuoteFeed}>
        <View style={LoginStyles.QuoteFeedTitleBackground}>
          <Text style={LoginStyles.QuoteFeedTitleText}>QuickQuotes</Text>
        </View>
        <Image source={require('../../green-quote-mark-icon.png')} style={LoginStyles.image} />
        <View style={LoginStyles.RowContainer}>
          <ToastContainer /> 
          <Pressable style={LoginStyles.SettingButton} onPress={handleAnonymousSignIn}>
              <Text style={LoginStyles.SettingText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};