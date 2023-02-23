import React from 'react';
import { StyleSheet, View, Button, Text, FlatList} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const QuoteFeed = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the QuoteFeed</Text>
      <Button
        title="Go to Subjects"
        onPress={() => navigation.navigate('Subjects')}
      />
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />

      <Button
        title="Give me a quote!"
        onPress={() => console.log('Quote button pressed!')}
      />

    </View>
  );
};

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
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Settings</Text>
      <Button
        title="Go to Subjects"
        onPress={() => navigation.navigate('Subjects')}
      />
      <Button
        title="Go to QuoteFeed"
        onPress={() => navigation.navigate('QuoteFeed')}
      />
    </View>
  );
};




export { QuoteFeed, SubjectsScreen, SettingsScreen };