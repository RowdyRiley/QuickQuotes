import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { View, Text, Pressable } from 'react-native';
import { Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import QuoteFeedStyles from '../styles/QuoteFeedStyles';
import SettingStyles from '../styles/SettingStyles';
import RenderNotificationsModal from '../components/RenderNotificationsModal';

export const SettingsScreen = ({ navigation }) => {
  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [notificationFrequency, setNotificationFrequency] = useState(null);
  const [notificationPeriod, setNotificationPeriod] = useState("");

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

  return (
    <View style={QuoteFeedStyles.GreenBackground}>
      <View style={QuoteFeedStyles.QuoteFeed}>
        <View style={QuoteFeedStyles.QuoteFeedTitleBackground}>
          <Text style={QuoteFeedStyles.QuoteFeedTitleText}>Settings</Text>
        </View>

        <View style={SettingStyles.SettingsContainer}>
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
        </View>

        <View style={SettingStyles.RowContainer}>
          <Pressable style={SettingStyles.SettingButton} onPress={() => navigation.navigate('Bookmarks')}>
              <Text style={SettingStyles.SettingText}>Bookmarks</Text>
          </Pressable>
        </View>

        <View style={SettingStyles.RowContainer}>
          <Pressable style={SettingStyles.SettingButton}>
              <Text style={SettingStyles.SettingText}>Profile</Text>
          </Pressable>
        </View>

        <View style={SettingStyles.RowContainer}>
          <Pressable style={SettingStyles.SettingButton} onPress={() => navigation.navigate('Login')}>
              <Text style={SettingStyles.SettingText}>Back to Home Screen</Text>
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
