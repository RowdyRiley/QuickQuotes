import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import Toast, { ToastContainer } from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInAnonymously } from 'firebase/auth';

import QuoteFeedStyles from '../styles/QuoteFeedStyles';
import SettingStyles from '../styles/SettingStyles';
import RenderNotificationsModal from '../components/RenderNotificationsModal';
import auth from '../../firebase.js';
import UserContext from '../utils/UserContext';
import { addUserToDatabase } from '../utils/Api';

export const SettingsScreen = ({ navigation }) => {
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState(null);
  const [notificationPeriod, setNotificationPeriod] = useState("");
  const { userId, setUserId } = useContext(UserContext);

  // Load notification frequency options when user enters
  useEffect(() => {
    // Load frequency
    AsyncStorage.getItem('notificationFrequency')
    .then((notificationFrequencyJSON) => {
      if (notificationFrequencyJSON) {
        setNotificationFrequency(JSON.parse(notificationFrequencyJSON));
      }
    })

    // Load period
    AsyncStorage.getItem('notificationPeriod')
    .then((notificationPeriodJSON) => {
      if (notificationPeriodJSON) {
        setNotificationPeriod(JSON.parse(notificationPeriodJSON));
      }
    })
  }, [])

  // Store notificationFrequency in AsyncStorage whenever it changes
  useEffect(() => {
    if (notificationFrequency == null) {
      return;
    }
    AsyncStorage.setItem('notificationFrequency', JSON.stringify(notificationFrequency));
  }, [notificationFrequency])

  // Store notificationPeriod in AsyncStorage whenever it changes
  useEffect(() => {
    if (notificationPeriod == null) {
      return;
    }
    AsyncStorage.setItem('notificationPeriod', JSON.stringify(notificationPeriod));
  }, [notificationPeriod])

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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Anonymous sign-in failed:", errorCode, errorMessage);
      });
  };

  return (
    <View style={QuoteFeedStyles.GreenBackground}>
      <View style={QuoteFeedStyles.QuoteFeed}>
        <View style={QuoteFeedStyles.QuoteFeedTitleBackground}>
          <Text style={QuoteFeedStyles.QuoteFeedTitleText}>Settings</Text>
        </View>

        {/* Notification Frequency Options; leave out until feature implemented */}
        {/* <View style={SettingStyles.SettingsContainer}>
          <View style={SettingStyles.RowContainer}>
            <Pressable style={SettingStyles.SettingButton} onPress={() => setNotificationsModalVisible(true)}>
              <Text style={SettingStyles.SettingText}>Notification Frequency</Text>
            </Pressable>

            <View style={SettingStyles.NotificationBox}>
              <Text style={SettingStyles.SettingText}>
                {notificationFrequency && notificationPeriod
                ? `${notificationFrequency} / ${notificationPeriod}`
                : ""}
              </Text>            
            </View>
          </View>
        </View> */}

        <View style={[SettingStyles.RowContainer, {marginTop: '7%'}]}>
          <Pressable style={SettingStyles.SettingButton} onPress={() => navigation.navigate('Bookmarks')}>
              <Text style={SettingStyles.SettingText}>Bookmarks</Text>
          </Pressable>
        </View>

        <View style={SettingStyles.RowContainer}>
          <ToastContainer />
          <Pressable style={SettingStyles.SettingButton} onPress={handleAnonymousSignIn}>
              <Text style={SettingStyles.SettingText}>Login</Text>
          </Pressable>
        </View>
      </View>

      <View style={QuoteFeedStyles.TaskbarBackground}>
        <Pressable style={QuoteFeedStyles.SubjectsButton} onPress={() => navigation.navigate('Subjects')}>
          <Text style={QuoteFeedStyles.TaskbarTitleText}>Subjects</Text>
        </Pressable>

        <Pressable style={QuoteFeedStyles.SettingsButton} onPress={() => navigation.navigate('QuoteFeed')}>
          <Text style={QuoteFeedStyles.TaskbarTitleText}>QuoteFeed</Text>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={notificationsModalVisible}
        onRequestClose={() => setNotificationsModalVisible(false)}
      >
        {RenderNotificationsModal(setNotificationFrequency, setNotificationPeriod, setNotificationsModalVisible)}
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
};
