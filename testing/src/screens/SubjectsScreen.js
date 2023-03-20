import React, { useEffect, useContext } from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import QuoteFeedStyles from '../styles/QuoteFeedStyles';
import SubjectStyles from '../styles/SubjectStyles';
import * as Api from '../utils/Api';
import UserContext from '../utils/UserContext';

export const SubjectsScreen = ({ navigation }) => {
  const [subjectOptions, setSubjectOptions] = React.useState([]);         // List of available options
  const [selectedSubjectKey, setSelectedSubjectKey] = React.useState(""); // Last selected option
  const [userSubjects, setUserSubjects] = React.useState([]);             // User's subjects
  const { userId } = useContext(UserContext);

  // Make API calls when the page is loaded to get
  // the subjectOptions and userSubjects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = await Api.getSubjectOptions(userId);
        const subjects = await Api.getUserSubjects(userId);
        setSubjectOptions([...options]);
        setUserSubjects([...subjects]);
      } catch (error) {
        console.log("Error in Subjects Screen useEffect:", error);
      }
    }
    fetchData();
  }, []);

  // Add the subject to user's list
  const addSubject = () => {
    // Find the subject object given the key
    const newSubject = subjectOptions.find(item => item.key === selectedSubjectKey)

    // Return if subject is already in there
    if (userSubjects.some(item => item.key === newSubject.key)) {
      return;
    }

    // Add the subject to array
    setUserSubjects(prevUserSubjects => [...prevUserSubjects, newSubject]);
    Api.addSubjectToDatabase(userId, newSubject);
  }

  // Remove the subject from user's list
  const removeSubject = (subjectToRemove) => {
    // Return if subject is not in there
    if (!userSubjects.some(item => item.key === subjectToRemove.key)) {
      return;
    }

    // Create new array without the subject, replace the old array
    const newArray = userSubjects.filter((subject) => subject !== subjectToRemove);
    setUserSubjects(newArray);
    Api.removeSubjectFromDatabase(userId, subjectToRemove);
  }

  // Display subject name
  const renderSubject = ({item}) => (
    <TouchableOpacity onPress={() => removeSubject(item)}>
      <View key={item.key} style={SubjectStyles.itemContainer}>
        <View style={SubjectStyles.titleContainer}>
          <Text style={SubjectStyles.title2}>{item.value}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    // container:  for green background and views within
    // container2: for brown background and views within
    // container3: for the title 'Subjects'
    // container4: for brown background around buttons
    // container5: for transparent background around buttons
    // Easier and more consistent to reuse QuoteFeed's containers; Promotes reusability
    <View style={QuoteFeedStyles.GreenBackground}>
      <View style={QuoteFeedStyles.QuoteFeed}>
        <View style={QuoteFeedStyles.QuoteFeedTitleBackground}>
          <Text style={QuoteFeedStyles.QuoteFeedTitleText}>Subjects</Text>   
        </View>                      
                                                                 
        <View style={{flexDirection: 'row', height: '75%'}}>
          <View style={SubjectStyles.flist}>
            <FlatList                                                                     
              data={userSubjects}
              renderItem={renderSubject}  
              keyExtractor={(item) => item.key}
              ItemSeparatorComponent={() => <View style={SubjectStyles.separator} />}        
            />
          </View>

          <View style={SubjectStyles.slist}>
            <SelectList 
              setSelected={(val) => setSelectedSubjectKey(val)} 
              style={{backgroundColor: '#605647', color: 'white'}} 
              placeholder="Add new +"
              data={subjectOptions}  
              save="key"  // save the key value of the subject object
              onSelect={addSubject}
              boxStyles={{borderColor: 'rgba(0, 0, 0, 0.29)'}}
              inputStyles={{fontWeight: '300'}}
              dropdownStyles={{borderColor: 'rgba(0, 0, 0, 0.29)'}}
              dropdownTextStyles={{fontWeight: '300'}}
            />
          </View>
        </View>
      </View>

      <View style={QuoteFeedStyles.TaskbarBackground}>
        <Pressable style={QuoteFeedStyles.SubjectsButton} onPress={() => navigation.navigate('QuoteFeed')}>
          <Text style={QuoteFeedStyles.TaskbarTitleText}>QuoteFeed</Text>
        </Pressable>

        <Pressable style={QuoteFeedStyles.SettingsButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={QuoteFeedStyles.TaskbarTitleText}>Settings</Text>
        </Pressable>
      </View>
    </View>
  );
};