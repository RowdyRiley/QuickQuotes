import { StyleSheet } from 'react-native';

const LoginStyles = StyleSheet.create({
  GreenBackground: {
    flex: 1,
    backgroundColor: '#5C6641',
  },
  QuoteFeed: {
    backgroundColor: '#877965',
    alignSelf: 'center',
    width: '83%',
    height: '70%',
    marginTop: '20%',
    borderRadius: 80,
    padding: '10%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 7,
  },
  QuoteFeedTitleBackground: {
    alignSelf: 'center',
    width: '100%',
    height: '12%',
    top: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.47)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  QuoteFeedTitleText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'white',
    position: 'relative',
    top: 1,
  },
  image: {
    marginLeft: '21%',
    marginTop: '10%',
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  SettingButton: {
    width: '60%',
    height: 40,
    paddingVertical: 5,
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
  RowContainer: {
    flexDirection: 'row',
    marginBottom: 45,
    justifyContent: 'center', 
  },
  SettingText: {
    fontWeight: '300',
    fontSize: 17,
    color: '#FFFFFF',
  },
});

export default LoginStyles;