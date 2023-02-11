// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Button, Text, TextInput, FlatList} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import React from 'react';

export default function App() {
  const [user, setUser] = React.useState();
  const [pw, setPw] = React.useState();
  const [loginUser, setLoginUser] = React.useState();


  const [selected, setSelected] = React.useState("");
  let [data2, setData2] = React.useState([]);
  
  let data = [
      {value:'Science'},
      {value:'History'},
      {value:'Microsoft'},
      {value:'Apple'},
      {value:'Google'},
      {value:'React Native'},
      {value:'Python'},
  ];
  
//   let data2 = [
//     {value:'Cars'},
//     {value:'Sports'},
//     {value:'Cameras'},
//     {value:'Computers'},
//     {value:'Vegetables'},
//     {value:'Diary Products'},
//     {value:'Drinks'},
// ];

  const add = () => {
    setData2(data2.concat({value: selected}));//data2.push({value: selected}));
  }


  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.container3}>
          <Text style={styles.title}>Subjects</Text>   
        </View>  
        <View style={styles.flat}>
          <FlatList 
            data={data2} 
            renderItem={({item}) => <Text style={styles.item}>{item.value}</Text>}/>
        </View>
        <View style={styles.slist}>
          <SelectList 
            setSelected={(val) => setSelected(val)} 
            style={{backgroundColor: "#605647"}}  // doesn't work, need to figure out how to change the color
            data={data}  
            save="value"
            onSelect={() => add()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    //flexDirection: 'row', 
    backgroundColor: '#5c6540',
    //alignContent: 'space-between',
    paddingTop: '10%',
    paddingBottom: '20%',
    paddingLeft:  '5%',
    paddingRight: '5%',
    // flex: 1,
    // padding: 10,
    // alignItems: 'center',
    // alignContent: 'space-between',
  },
  container2: {
    flex: 1,
    //paddingTop: '%',
    paddingLeft: '10%',
    //alignContent: 'space-between',
    backgroundColor: '#867965',
  },
  container3: {
    flex: 0,
    paddingTop: '0%',
    paddingBottom: '0%',
    // paddingLeft:  '5%',
    // paddingRight: '5%',
    backgroundColor: '#484035',
    marginTop: '5%',
    marginLeft: '-11.3%',
    marginBottom: '5%',
    color: 'white',
  },
  slist: {
    //padding: -100,
    alignItems: 'center',
    color: 'white',

  },
  flat: {
    //flex: 1,
    //paddingTop: 90
  },
  item: {
    color: 'white',
  },
  title: {
    marginTop: 30,
    margin: 20,
    fontSize: 18,
    paddingLeft: '25%',
    //alignSelf: 'center',
  },
  // input: {
  //   borderRadius: 10,
  //   height: 40,
  //   margin: 12,
  //   marginLeft: 32,
  //   marginRight: 32,
  //   borderWidth: 1,
  //   borderColor: '#d3d3d3',
  //   padding: 10,
  // },
  // buttons: {
  //   flexDirection: 'row',
  //   alignContent: 'center',
  //   paddingLeft: 100,
  //   paddingRight: 100,
  //   justifyContent: 'space-around',
  // },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
