import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Modal } from 'react-native';
import { ToastContainer } from 'react-native-root-toast';

import QuoteFeedStyles from '../styles/QuoteFeedStyles'
import BookmarkStyles from '../styles/BookmarkStyles';
import RenderQuote from '../components/RenderQuote'
import RenderQuoteModal from '../components/RenderQuoteModal'
import * as Api from '../utils/Api';
import UserContext from '../utils/UserContext';

// Display all of the user's bookmarked quotes
const BookmarksScreen = ({ navigation }) => {
  const [quoteList, setQuoteList] = useState([]);               // List of bookmarked quotes
  const [selectedQuote, setSelectedQuote] = useState(null);     // Expand this quote when pressed
  const [isModalVisible, setIsModalVisible] = useState(false);  // Whether the modal is displayed
  const { userId } = useContext(UserContext);

  // Load all user bookmarks when page is loaded
  useEffect(() => {
    const setBookmarks = async () => {
      const newList = await Api.getBookmarks(userId);
      setQuoteList(newList);
    }
    setBookmarks();
  }, []);

  // When a user presses on a quote, display additional info in a modal
  const handleQuotePress = (quote) => {
    setSelectedQuote(quote);
    setIsModalVisible(true);
  }

  // Close quote modal and reset data
  const closeModal = () => {
    setSelectedQuote(null);
    setIsModalVisible(false);
  }

  return (
    <View style={QuoteFeedStyles.GreenBackground}>
      <View style={BookmarkStyles.BookmarkFeed}>
        <View style={QuoteFeedStyles.QuoteFeedTitleBackground}>
          <Text style={QuoteFeedStyles.QuoteFeedTitleText}>Bookmarks</Text>
        </View>

        <ScrollView style={QuoteFeedStyles.Scroll}>
          {quoteList.slice(0).reverse().map((quote) => (
            <React.Fragment key={quote.quote_id}>
              {RenderQuote(quote, handleQuotePress)}
            </React.Fragment>
          ))}
        </ScrollView>
      </View>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={isModalVisible}
        onRequestClose={() => closeModal()}
      >
        <ToastContainer />
        {RenderQuoteModal(selectedQuote, closeModal)}
      </Modal>
    </View>
  )
}

export { BookmarksScreen };