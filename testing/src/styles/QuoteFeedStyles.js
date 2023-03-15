import { StyleSheet } from 'react-native';

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
  QuoteLabel: {
    color: 'white',
    // color: '#05c4b2',
    fontSize: 13,
    fontWeight: 'bold'
  },
  QuoteText: {
    color: 'white',
    fontSize: 12,
    lineHeight: 18,
  },
  HorizontalLine: {
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    marginTop: 10,
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
  ModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  Modal: {
    backgroundColor: "#877965",
    maxHeight: '80%',
    width: '90%',
    padding: '5%',
    borderRadius: 10,
    alignItems: "center"
  },
  ModalButton: {
    backgroundColor: '#484035',
    width: '50%',
    padding: '3%',
    marginBottom: '1%',
    borderRadius: 10,
  },
  ModalButtonText: {
    color: 'white',
    alignSelf: 'center'
  },
  ModalLabel: {
    // color: 'white',
    color: '#05c4b2',
    fontSize: 16,
    fontWeight: 'bold'
  },
  ModalText: {
    color: 'white',
    fontSize: 16,
  },
  CommentBox: {
    color: '#372200',
    paddingLeft: 5,
    borderRadius: 5,
  }
})

export default QuoteFeedStyles;