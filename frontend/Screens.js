import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ScrollView, Pressable, FlatList} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import {Modal, Alert} from 'react-native';

// Insert the your server ip and port here
const URL = "http://192.168.1.197:5000";

class Quote {
  constructor(id, quote, author, tag, rating, comments) {
    this.id = id;
    this.quote = quote;
    this.author = author;
    this.tag = tag;
    this.rating = rating;
    this.comments = comments;
  }
}
const quoteQueue = [];

const QuoteFeed = ({ navigation }) => {
  const [quoteId, setQuoteId] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTag] = useState('');
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');

  const getQuote = () => {
    fetch(URL + '/get-quote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1
      })
    })
    .then((response) => response.json())
    .then((data) => {
      setQuoteId(data.quote_id);
      setQuote(data.quote_content);
      setAuthor(data.author);
      setTag(data.tag);
      setRating(data.rating);
      setComments(data.comments);
    });
    const newQuote = new Quote(quoteId, quote, author, tag, rating, comments);
    quoteQueue.push(newQuote);
    if (quoteQueue.length > 15) {
      quoteQueue.shift();
    }
  };

  return (
      
      <View style={QuoteFeedStyles.GreenBackground}>
        <View style={QuoteFeedStyles.QuoteFeed}>
          <View style={QuoteFeedStyles.QuoteFeedTitleBackground}>
            <Text style={QuoteFeedStyles.QuoteFeedTitleText}>Quote Feed</Text>
          </View>

          <ScrollView style={QuoteFeedStyles.Scroll}>
            {quoteQueue.map((quote) => (
              <View key={quote.id}>
                <Text style={QuoteFeedStyles.Quote}>Quote: {quote.quote}</Text>
                <Text style={QuoteFeedStyles.Quote}>Author: {quote.author}</Text>
                <Text style={QuoteFeedStyles.Quote}>Tag: {quote.tag}</Text>
                <View style={QuoteFeedStyles.HorizontalLine} />
              </View>
            ))}
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
    // which option was selected last in the selectlist
  const [selected, setSelected] = React.useState("");
  // current subjects for user
  let [data2, setData2] = React.useState([]);
  
  // add a subject  
  let data = [
      {value:'Science'},
      {value:'History'},
      {value:'Microsoft'},
      {value:'Apple'},
      {value:'Google'},
      {value:'React Native'},
      {value:'Python'},
  ];

  // will update once we choose which subjucts we want the user to choose from
  const add = () => {
    setData2(data2.concat({value: selected}));
  }

  return (
    // container:  for green background and views within
    // container2: for brown background and views within
    // container3: for the title 'Subjects'
    // continer4:  for brown background around buttons
    // container5: for transparent background around buttons
    <View style={SubjectStyles.container}>
      <View style={SubjectStyles.container2}>
        <View style={SubjectStyles.container3}>
          <Text style={SubjectStyles.title}>Subjects</Text>   
        </View>                                                                               
        <View style={{flexDirection: 'row'}}>
            <FlatList                                                                     
              data={data2}
              renderItem={({ item }) => (
                <View style={SubjectStyles.itemContainer}>
                  <View style={SubjectStyles.titleContainer}>
                    <Text style={SubjectStyles.title2}>{item.value}</Text>
                  </View>
                </View>
              )}  
              keyExtractor={(item) => item.value}
              ItemSeparatorComponent={() => <View style={SubjectStyles.separator} />}        
            />
          <View style={SubjectStyles.slist}>
            <SelectList 
              setSelected={(val) => setSelected(val)} 
              style={{backgroundColor: '#605647', color: 'white'}} 
              placeholder="Add new +"
              data={data}  
              save="value"
              color= "white"
              onSelect={() => add()}
            />
          </View>
        </View>
      </View>
      <View style={SubjectStyles.container4}>
        <View style={SubjectStyles.container5}>
          <View style={{marginLeft: 35}}>
            <Button
              title="QuoteFeed"
              color= "white"
              onPress={() => navigation.navigate('QuoteFeed')}
            />
          </View>
          <Text style={{fontSize:35, color: 'white', marginLeft: '12%'}}>l</Text>
          <View style={{marginLeft: 38}}>
            <Button
              title="Settings"
              color= "white"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
        </View>
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
    slist: {
      //padding: -100,
      //alignItems: 'center',
      color: 'white',
      marginLeft: '-55%',
      marginRight: '17%',
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
      marginRight: '73%',
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
