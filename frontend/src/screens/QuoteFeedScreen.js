import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, ScrollView, Pressable } from 'react-native';
import { Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastContainer } from 'react-native-root-toast';

import QuoteFeedStyles from '../styles/QuoteFeedStyles';
import * as Api from '../utils/Api';
import RenderQuoteModal from '../components/RenderQuoteModal';
import RenderQuote from '../components/RenderQuote';
import UserContext from '../utils/UserContext';

// Display the 15 most recent quotes in a feed
export const QuoteFeedScreen = ({ navigation }) => {
  const [quoteQueue, setQuoteQueue] = useState([]);             // Quotes in quote feed
  const [selectedQuote, setSelectedQuote] = useState(null);     // Expand this quote when pressed
  const [isModalVisible, setIsModalVisible] = useState(false);  // Whether the modal is displayed
  const { userId } = useContext(UserContext);

  // Display the saved quote feed when app is launched
  useEffect(() => {
    AsyncStorage.getItem('quoteQueue')
    .then((quoteQueueJSON) => {
      if (quoteQueueJSON) {
        setQuoteQueue(JSON.parse(quoteQueueJSON));
      }
    })
  }, []);

  // Store quoteQueue whenever it gets updated
  useEffect(() => {
    if (quoteQueue == null) {
      return;
    }
    AsyncStorage.setItem('quoteQueue', JSON.stringify(quoteQueue));
  }, [quoteQueue])

  // When a user presses on the get quote button, fetch a quote and store it in a queue
  const handleGetQuote = async () => {
    const newQuote = await Api.getRandomQuote(userId);
    if (newQuote) {
      setQuoteQueue((prevQueue) => [newQuote, ...prevQueue.slice(0, 14)]);
    }
  }

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
      <View style={QuoteFeedStyles.QuoteFeed}>
        <View style={QuoteFeedStyles.QuoteFeedTitleBackground}>
          <Text style={QuoteFeedStyles.QuoteFeedTitleText}>Quote Feed</Text>
        </View>

        <ScrollView style={QuoteFeedStyles.Scroll}>
          {quoteQueue.map((quote) => (
            <React.Fragment key={quote.quote_id}>
              {RenderQuote(quote, handleQuotePress)}
            </React.Fragment>
          ))} 
        </ScrollView>
      </View>

      <View style={QuoteFeedStyles.ButtonContainer}>
        <Button
          color='#877965'
          title="Give me a quote!"
          onPress={() => handleGetQuote()}
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
  );
};