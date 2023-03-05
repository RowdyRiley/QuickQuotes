import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Pressable, FlatList, TouchableOpacity} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import {Modal, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Insert the your server ip and port here
const URL = "http://192.168.1.197:5000";

const QuoteFeed = ({ navigation }) => {
  // Queue to store quotes to be displayed 
  const [quoteQueue, setQuoteQueue] = useState([]);

  const handleNewQuote = (data) => {
    // Parse the data for a quote
    const newQuote = JSON.parse(JSON.stringify(data))

    // Push quote to queue
    setQuoteQueue((prevQueue) => [newQuote, ...prevQueue.slice(0, 14)]);

    // Save the queue to AsyncStorage
    AsyncStorage.setItem('quoteQueue', JSON.stringify(quoteQueue));
  }

  // Display the saved quote feed when app is launched
  useEffect(() => {
    AsyncStorage.getItem('quoteQueue')
    .then((quoteQueueJSON) => {
      if (quoteQueueJSON) {
        setQuoteQueue(JSON.parse(quoteQueueJSON));
      }
    })
  }, []);

  // Make an API request to get a random quote
  const getQuote = async () => {
    const response = await fetch(URL + '/get-quote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1
      })
    });
    if (response.status == 200) {
      const data = await response.json();
      if (data) {
        handleNewQuote(data);
      }
    }
  };

  // Display additional quote information here
  const handleQuotePress = () => {
    
  }

  // Display quote in a pressable button
  const renderQuote = (quote) => (
    <TouchableOpacity key={quote.quote_id} onPress={() => handleQuotePress(quote)}>
      <Text style={QuoteFeedStyles.Quote}>Quote: {quote.quote_content}</Text>
      <Text style={QuoteFeedStyles.Quote}>Author: {quote.author}</Text>
      <Text style={QuoteFeedStyles.Quote}>Tag: {quote.tag}</Text>
      <View style={QuoteFeedStyles.HorizontalLine} />
    </TouchableOpacity>
  )

  return (
      
      <View style={QuoteFeedStyles.GreenBackground}>
        <View style={QuoteFeedStyles.QuoteFeed}>
          <View style={QuoteFeedStyles.QuoteFeedTitleBackground}>
            <Text style={QuoteFeedStyles.QuoteFeedTitleText}>Quote Feed</Text>
          </View>

          <ScrollView style={QuoteFeedStyles.Scroll}>
            {quoteQueue.map(renderQuote)} 
          </ScrollView>
        </View>

        <View style={QuoteFeedStyles.ButtonContainer}>
          <Button
            color='white'
            title="Give me a quote!"
            onPress={() => getQuote()}
          />
        </View>

        <View style={QuoteFeedStyles.TaskbarBackground}>
          <Pressable style={QuoteFeedStyles.SubjectsButton} onPress={() => navigation.navigate('Subjects')}>
            <Text style={QuoteFeedStyles.TaskbarTitleText}>Subjects</Text>
          </Pressable>

          <Pressable style={QuoteFeedStyles.SettingsButton} onPress={() => navigation.navigate('Settings')}>
            <Text style={QuoteFeedStyles.TaskbarTitleText}>Settings</Text>
          </Pressable>
        </View>
      </View>
    
  );
};

const QuoteFeedStyles = StyleSheet.create({
  GreenBackground: {
    flex: 1,
    backgroundColor: '#5C6641',
  },
  QuoteFeed: {
    backgroundColor: '#877965',
    alignSelf: 'center',
    width: '90%',
    height: '80%',
    marginTop: '4%',
    borderRadius: 10,
  },
  QuoteFeedTitleBackground: {
    alignSelf: 'center',
    width: '100%',
    height: '12%',
    top: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.47)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  QuoteFeedTitleText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    top: 1,
  },
  Scroll: {
    marginHorizontal: 10,
    marginTop: 12
  },
  Quote: {
    color: 'white',
    fontSize: 10,
    lineHeight: 20,
  },
  HorizontalLine: {
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  ButtonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '40%',
    height: '6%',
    marginTop: '1%'
  },
  TaskbarBackground: {
    backgroundColor: '#877965',
    position: 'absolute',
    width: '100%',
    height: '10%',
    bottom: 0,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    shadowOpacity: 1,
    justifyContent: 'center',
  },
  TaskbarTitleText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
  },
  SubjectsButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.47)',
    width: '50%',
    height: '75%',
    left: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  SettingsButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.47)',
    width: '50%',
    height: '75%',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
})

const SubjectsScreen = ({ navigation }) => {
  // List of available subjects
  const [subjectOptions, setSubjectOptions] = React.useState([]);
  // which option was selected last in the selectlist
  const [selectedSubjectKey, setSelectedSubjectKey] = React.useState("");
  // current subjects for user
  const [userSubjects, setUserSubjects] = React.useState([]);

  // Make an API request to get list of available subject options
  const getSubjectOptions = async () => {
    try {
      const response = await fetch(URL + '/get-all-tags');
      const data = await response.json();
      if (data) {
        setSubjectOptions([...data]);
      }
    } catch (error) {
      console.log("Error in getSubjectOptions:", error)
    }
  }

  // Make an API request to get list of user's saved subjects
  const getUserSubjects = async () => {
    try {
      const response = await fetch(URL + '/get-tags', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1
        })
      });
      const data = await response.json();
      if (data) {
        setUserSubjects([...data]);
      }
    } catch (error) {
      console.log("Error in getUserSubjects:", error);
    }
  };

  // Make an API request to add a subject to list of user's saved subjects
  const addSubjectToDatabase = async (subject) => {
    try {
      const response = await fetch(URL + '/add-tag', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1,
          tag: subject.value
        })
      });
    } catch (error) {
      console.log("Error in addSubjectToDatabase:", error);
    }
  };

  // Make an API request to remove a subject from list of user's saved subjects
  const removeSubjectFromDatabase = async (subject) => {
    try {
      const response = await fetch(URL + '/remove-tag', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: 1,
          tag: subject.value
        })
      });
    } catch (error) {
      console.log("Error in removeSubjectFromDatabase:", error);
    }
  }

  // Make API calls when the page is loaded to get
  // the subjectOptions and userSubjects
  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectData = await getSubjectOptions();
        const userData = await getUserSubjects();
        if (subjectData) {
          setSubjectOptions([...subjectData]);
        }
        if (userData) {
          setUserSubjects([...userData]);
        }
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

    // Adds the subject if it is not already in there
    if (!userSubjects.some(item => item.key === newSubject.key)) {
      setUserSubjects(prevUserSubjects => [...prevUserSubjects, newSubject]);
      addSubjectToDatabase(newSubject);
    }
  }

  // Remove the subject from user's list
  const removeSubject = (subjectToRemove) => {
    if (userSubjects.some(item => item.key === subjectToRemove.key)) {
      const newArray = userSubjects.filter((subject) => subject !== subjectToRemove);
      setUserSubjects(newArray);
      removeSubjectFromDatabase(subjectToRemove);
    }
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
              color="white"
              onSelect={addSubject}
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

const SubjectStyles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#5c6540',
    paddingTop: '10%',
    paddingBottom: '20%',
    paddingLeft:  '5%',
    paddingRight: '5%',
  },
  container2: {
    flex: 1,
    //paddingTop: '%',
    paddingLeft: '10%',
    marginBottom: '4%',
    //alignContent: 'space-between',
    backgroundColor: '#867965',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
  },
  container3: {
    flex: 0,
    paddingTop: '0%',
    paddingBottom: '3%',
    // paddingLeft:  '5%',
    // paddingRight: '5%',
    backgroundColor: '#484035',
    marginTop: '5%',
    marginLeft: '-11.3%',
    marginBottom: '5%',
    color: 'white',
  },
  container4: {
    backgroundColor: '#867965',
    marginBottom: '-22%',
    marginLeft: '-6%',
    marginRight: '-6%',
  },
  container5: {
    backgroundColor: '#484035',
    marginTop: '2%',
    //marginLeft: '-11.3%',
    marginBottom: '2%',
    //color: 'white',
    flexDirection: 'row',
    //marginHorizontal: 20,
  },
  flist: {
    width: '45%',
    height: '100%',
    marginTop: '10%',
    marginLeft: '5%',
  },
  slist: {
    //padding: -100,
    //alignItems: 'center',
    color: 'white',
    width: '45%',
    height: '100%',
    marginTop: '10%',
    marginRight: '5%',
    //flex: 0,
  },
  flat: {
    backgroundColor: '#484035',
    marginRight: '74%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    //flex: 1,
    //paddingTop: 90
  },
  item: {
    color: 'white',
    padding: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    marginLeft: 35,
    //margin: 20,
    fontSize: 28,
    paddingLeft: '25%',
    color: 'white',
    //alignSelf: 'center',
  },
  // for flatlist
  itemContainer: {
    backgroundColor: '#867965',
    overflow: 'hidden',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginRight: '5%',
  },
  titleContainer: {
    backgroundColor: '#484035',
    padding: 10,
    borderRadius: 10,
  },
  title2: {
    fontSize: 12,
    color: 'white',
  },
  separator: {
    height: 10,
    backgroundColor: 'transparent',
  },
});

const SettingsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
<>
      <View style={styles.container}>

      <View style={QuoteFeedStyles.TaskbarBackground}>

        <Pressable style={QuoteFeedStyles.SubjectsButton} onPress={() => navigation.navigate('Subjects')}>
          <Text style={QuoteFeedStyles.TaskbarTitleText}>Subjects</Text>
        </Pressable>

        <Pressable style={QuoteFeedStyles.SettingsButton} onPress={() => navigation.navigate('QuoteFeed')}>
          <Text style={QuoteFeedStyles.TaskbarTitleText}>QuoteFeed</Text>
        </Pressable>

      </View>

        <View style={styles.subjects}>
          <View style={styles.quotefeedback} />
          <View style={styles.title}>
            <View style={styles.titlebox} />
            <Text style={styles.settings}>Settings</Text>
          </View>
          <View style={styles.notification}>
            <View style={styles.notificBox} />
            <Text style={styles.notificText}>Notification</Text>            
          </View>
          <View style={styles.Button}>
            <View style={styles.buttonbox} />
            <Button title='Frequency' color='#FFFFFF' onPress={() => setModalVisible(true)} style={styles.buttontext}></Button>            
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Option 1</Text>
            <Text style={styles.modalText}>Option 2</Text>
            <Text style={styles.modalText}>Option 3</Text>
            <Button
              title="Close"
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#5C6641',
    position: 'relative',
  },
  subjects: {
    flex: 1,
    position: 'absolute',
    width: 349,
    height: 701,
    left: 20,
    top: 49,
  },
  quotefeedback: {
    flex: 1,
    position: 'absolute',
    width: 360,
    height: 700,
    left: -3,
    top: 0,
    backgroundColor: '#877965',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    width: 349,
    height: 55,
    left: 20,
    top: 61,
  },
  titlebox: {
    flex: 1,
    marginRight: 10,
    position: 'absolute',
    width: 360,
    height: 55,
    left: -23,
    top: -50,
    backgroundColor: 'rgba(0,0,0,0.47)',
  },
  notFreqbox: {
    flex: 1,
    position: 'absolute',
    width: 210,
    height: 40,
    left: 0,
    top: 80,
    backgroundColor: 'rgba(0, 0, 0, 0.29)',
  },
  notFreq: {
    marginBottom: 10,
    position: 'absolute',
    left: 50,
    top: 185,

    // fontFamily: 'Abhaya Libre SemiBold',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 50,
    color: '#FFFFFF',
  },
  settings: {
    position: 'absolute',
    left: 70,
    top: -48,

    // fontFamily: 'Abhaya Libre SemiBold',
    fontWeight: '600',
    fontSize: 45,
    lineHeight: 50,
    color: '#FFFFFF',
  },
  notification: {
    position: 'absolute',
    width: 360,
    height: 50,
    left: 0,
    top: 30,
  },
  notificBox: {
    position: 'absolute',
    width: 200,
    height: 40,
    left: 10,
    top: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.29)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 10,
  },
  notificText: {
    position: 'absolute',
    left: 40,
    top: 45,

    // fontFamily: 'Abhaya Libre SemiBold',
    fontWeight: '600',
    fontSize: 25,
    lineHeight: 50,
    color: '#FFFFFF',
  },
  Button: {
    position: 'absolute',
    width: 360,
    height: 100,
    left: 100,
    top: 80,
  },
  buttonbox: {
    position: 'absolute',
    width: 100,
    height: 40,
    left: 130,
    top: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.29)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 10,
  },
  buttontext: {
    position: 'absolute',
    left: 0,
    top: 0,

    // fontFamily: 'Abhaya Libre SemiBold',
    fontWeight: '600',
    fontSize: 25,
    lineHeight: 50,
    color: '#FFFFFF',
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center"
  },
  modalText: {
    marginVertical: 10,
    fontSize: 18
  }
});


export { QuoteFeed, SubjectsScreen, SettingsScreen };
