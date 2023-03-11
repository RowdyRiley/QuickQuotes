import { StyleSheet } from 'react-native';

const SettingStyles = StyleSheet.create({
  SettingsContainer: {
    marginTop: '7%'
  },
  RowContainer: {
    flexDirection: 'row',
    marginBottom: 45,
  },
  SettingButton: {
    position: 'absolute',
    width: '60%',
    height: 40,
    paddingVertical: 5,
    paddingHorizontal: 10,
    left: '3%',
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: 'rgba(0, 0, 0, 0.29)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 10,
  },
  SettingText: {
    // fontFamily: 'Abhaya Libre SemiBold',
    fontWeight: '300',
    fontSize: 17,
    color: '#FFFFFF',
  },
  NotificationBox: {
    position: 'absolute',
    width: '30%',
    height: 40,
    right: '3%',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.29)',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    borderRadius: 10,
  },
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
  Button: {
    position: 'absolute',
    width: 360,
    height: 100,
    left: 100,
    top: 80,
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
  ModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  ModalContent: {
    backgroundColor: "#877965",
    height: '50%',
    width: '75%',
    padding: '5%',
    borderRadius: 10,
    alignItems: "center"
  },
  ModalText: {
    marginVertical: 10,
    fontSize: 18
  }
});

export default SettingStyles;