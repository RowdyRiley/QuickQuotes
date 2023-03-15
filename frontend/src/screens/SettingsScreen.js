import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import QuoteFeedStyles from '../styles/QuoteFeedStyles';
import SettingStyles from '../styles/SettingStyles';
import RenderNotificationsModal from '../components/RenderNotificationsModal';
import UserContext from '../utils/UserContext';

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

  const handleLogOut = async () => {
    setUserId("1");
    navigation.navigate('Login')
  }

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

        {/* Login button; moved to front page */}
        {/* <View style={SettingStyles.RowContainer}>
          <ToastContainer />
          <Pressable style={SettingStyles.SettingButton} onPress={handleAnonymousSignIn}>
              <Text style={SettingStyles.SettingText}>Login</Text>
          </Pressable>
        </View> */}

        <View style={SettingStyles.RowContainer}>
          <Pressable style={SettingStyles.SettingButton} onPress={handleLogOut}>
              <Text style={SettingStyles.SettingText}>Logout</Text>
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
