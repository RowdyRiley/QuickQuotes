import React from 'react';
import { View, Button } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import SettingsScreenStyles from '../styles/SettingStyles';
 
// Display the Notifications setting modal
const RenderNotificationsModal = (setNotificationFrequency, setNotificationPeriod, setNotificationsModalVisible) => {
  const notificationFrequencyOptions = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 },
    { value: 9 },
    { value: 10 }
  ];
  const notificationPeriodOptions = [
    { value: 'Hour' },
    { value: 'Day' },
    { value: 'Week' },
    { value: 'Month' }
  ];

  return (
    <View style={SettingsScreenStyles.ModalBackground}>
      <View style={SettingsScreenStyles.ModalContent}>
        <View style={{flexDirection: 'row', height: '85%'}}>
          <SelectList
            data={notificationFrequencyOptions}
            setSelected={(val) => setNotificationFrequency(val)}
            save="key"
            search={false}
            placeholder="Frequency"
            boxStyles={{borderColor: 'rgba(0, 0, 0, 0.29)'}}
            inputStyles={{fontWeight: '300'}}
            dropdownStyles={{borderColor: 'rgba(0, 0, 0, 0.29)'}}
            dropdownTextStyles={{fontWeight: '300'}}
          />

          <SelectList
            data={notificationPeriodOptions}
            setSelected={(val) => setNotificationPeriod(val)}
            save="key"
            search={false}
            placeholder="Period"
            boxStyles={{borderColor: 'rgba(0, 0, 0, 0.29)'}}
            inputStyles={{fontWeight: '300'}}
            dropdownStyles={{borderColor: 'rgba(0, 0, 0, 0.29)'}}
            dropdownTextStyles={{fontWeight: '300'}}
          />
        </View>

        <Button
          title="Close"
          onPress={() => {
            setNotificationsModalVisible(false);
          }}
        />
      </View>
    </View>
  )
}

export default RenderNotificationsModal;