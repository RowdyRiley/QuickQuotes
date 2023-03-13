import React from 'react';
import { View, Text, Image, Button, Pressable } from 'react-native';

import LoginStyles from '../styles/LoginStyles';

// Start screen
export const LoginScreen = ({ navigation }) => {
  return (
    <View style={LoginStyles.GreenBackground}>
      <View style={LoginStyles.QuoteFeed}>
        <View style={LoginStyles.QuoteFeedTitleBackground}>
          <Text style={LoginStyles.QuoteFeedTitleText}>QuickQuotes</Text>
        </View>
        <Image source={require('../../green-quote-mark-icon.png')} style={LoginStyles.image} />
        <View style={LoginStyles.RowContainer}>
          <Pressable style={LoginStyles.SettingButton} onPress={() => navigation.navigate('QuoteFeed')}>
              <Text style={LoginStyles.SettingText}>Press to Enter</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};