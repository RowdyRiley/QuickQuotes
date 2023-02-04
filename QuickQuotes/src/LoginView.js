import React from 'react';
import {StyleSheet, View, Image, Button, Text, TextInput} from 'react-native';


const LoginView = ({navigation}) => {
  const [user, setUser] = React.useState();
  const [pw, setPw] = React.useState();
  const [loginUser, setLoginUser] = React.useState();

  // add functions here for GET,POST,etc requests (might implement async functions for faster results)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Quick Quotes'}</Text>
      <TextInput
        onChangeText={setLoginUser}
        placeholder="user"
        accessibilityLabel="user"
        value={user}
      />
      <TextInput
        onChangeText={setPw}
        placeholder="password"
        accessibilityLabel="password"
        value={pw}
      />
      <View style={styles.buttons}>
        <Button
          accessibilityLabel="login"
          title="Login"
          // add code to check if username/pw are correct
          onPress={() => {
            navigation.navigate('QuoteView'); // page after successful login
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    alignContent: 'space-between',
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    marginTop: 60,
    margin: 20,
    fontSize: 18,
  },
  input: {
    borderRadius: 10,
    height: 40,
    margin: 12,
    marginLeft: 32,
    marginRight: 32,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 10,
  },
  buttons: {
    flexDirection: 'row',
    alignContent: 'center',
    paddingLeft: 100,
    paddingRight: 100,
    justifyContent: 'space-around',
  },
});

export default LoginView;
