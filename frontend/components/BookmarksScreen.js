import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, TouchableOpacity, Modal, TextInput } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Toast } from 'react-native-root-toast';
import { Rating } from 'react-native-ratings';

import { renderQuote } from '../Screens.js'
import { QuoteFeedStyles } from '../Screens.js'

// Insert the your server ip and port here
const URL = "http://192.168.1.197:5000";
const user_id = 1;

const BookmarksScreen = ({ navigation }) => {
  // ------
  const [quoteQueue, setQuoteQueue] = useState([]);             // Quotes in quote feed
  const [selectedQuote, setSelectedQuote] = useState(null);     // Expand this quote when pressed
  const [isModalVisible, setIsModalVisible] = useState(false);  // Whether the modal is displayed
  // const [commentText, setCommentText] = useState("");           // Text inside comment box
  // Test

  // Make an API request to get a specific quote
  const getSpecificQuote = async (quote) => {
    const response = await fetch(URL + '/get-specific-quote', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote_id: quote.quote_id
      })
    });
    if (response.status == 200) {
      const data = await response.json();
      if (data) {
        setSelectedQuote(data);
      }
    }
  };

  // Make an API request to add quote to user's bookmarks
  const bookmarkQuote = async (quote) => {
    try {
      const response = await fetch(URL + '/add-favorite', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          quote_id: quote.quote_id
        })
      });
      if (response.status == 201) {
        Toast.show('Quote bookmarked!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    } catch (error) {
      console.log("Error in bookmarkQuote:", error);
    }
  };

  // Make an API request to add a comment to the quote
  const addComment = async (quote, comment) => {
    try {
      const response = await fetch(URL + '/add-comment', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          quote_id: quote.quote_id,
          comment_content: comment
        })
      });
      if (response.status == 201) {
        Toast.show('Comment added!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          hideOnPress: true,
          delay: 0,
        });
      }
    } catch (error) {
      console.log("Error in addComment:", error);
    }
  }

  // Make an API request to add a rating to the quote
  const addRating = async (quote, rating) => {
    try {
      const response = await fetch(URL + '/modify-rating', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id,
          quote_id: quote.quote_id,
          rating: rating
        })
      });
      if (response.status == 200) {
        Toast.show('Rating added!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
          hideOnPress: true,
          delay: 0,
        });
      }
    } catch (error) {
      console.log("Error in addRating:", error);
    }
  }

  // Display additional quote info in a modal
  const handleQuotePress = (quote) => {
    getSpecificQuote(quote);
    setIsModalVisible(true);
  }

  // Add comment to database and refresh quote
  const handleCommentPress = async () => {
    try {
      const call1 = await addComment(selectedQuote, commentText);
      const call2 = await getSpecificQuote(selectedQuote);
    } catch (error) {
      console.log("Error in QuoteFeed handleCommentPress: ", error);
    }
    setCommentText("");
  }

  // Add rating and refresh quote
  const handleRatingPress = async(rating) => {
    try {
      const call1 = await addRating(selectedQuote, rating);
      const call2 = await getSpecificQuote(selectedQuote);
    } catch(error) {
      console.log("Error in QuoteFeed handleRatingPress: ", error);
    }
  }

  // Close quote modal and reset data
  const closeModal = () => {
    setSelectedQuote(null);
    setIsModalVisible(false);
    setCommentText("");
  }

  // Display quote in a pressable button
  const renderQuote = (quote) => (
    <TouchableOpacity key={quote.quote_id} onPress={() => handleQuotePress(quote)}>
      <Text style={QuoteFeedStyles.QuoteText}>{quote.quote_content}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={QuoteFeedStyles.QuoteLabel}>Author: </Text>
        <Text style={QuoteFeedStyles.QuoteText}>{quote.author}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={QuoteFeedStyles.QuoteLabel}>Tag: </Text>
        <Text style={QuoteFeedStyles.QuoteText}>{quote.tag}</Text>
      </View>
      <View style={QuoteFeedStyles.HorizontalLine}/>
    </TouchableOpacity>
  )

  // Display additional info about a quote
  const renderModal = () => {
    if(selectedQuote) {
      return (
        <ScrollView>
          <Text style={QuoteFeedStyles.ModalText}>{selectedQuote.quote_content}</Text>
          <View style={{flexDirection: 'row', marginBottom: '2%', marginTop: '2%'}}>
            <Text style={QuoteFeedStyles.ModalLabel}>Author: </Text>
            <Text style={QuoteFeedStyles.ModalText}>{selectedQuote.author}</Text>
          </View>

          <View style={{flexDirection: 'row', marginBottom: '2%'}}>
            <Text style={QuoteFeedStyles.ModalLabel}>Tag: </Text>
            <Text style={QuoteFeedStyles.ModalText}>{selectedQuote.tag}</Text>
          </View>

          <View style={{flexDirection: 'row', marginBottom: '2%', alignItems: 'center'}}>
            <Text style={QuoteFeedStyles.ModalLabel}>Rating: </Text>
            <Rating
              type='star'
              ratingCount={5}
              startingValue={selectedQuote.rating}
              imageSize={20}
              fractions={2}
              jumpValue={1}
              tintColor={'#877965'}
              readOnly={false}
              onFinishRating={rating => handleRatingPress(rating)}
            />
            <Text style={QuoteFeedStyles.ModalText}>  {(Math.round(selectedQuote.rating * 100) / 100).toFixed(2)}</Text>
          </View>

          <Text style={QuoteFeedStyles.ModalLabel}>Comments:</Text>
          {selectedQuote.comments.map((comment, index) => (
            <Text key={index} style={QuoteFeedStyles.ModalText}>User {user_id}: {comment.comment_content}</Text>
          ))}

          <View style={QuoteFeedStyles.HorizontalLine}/>

          <TextInput
            style={QuoteFeedStyles.CommentBox}
            onChangeText={setCommentText}
            value={commentText}
            placeholder={"Enter comment"}
            cursorColor={'white'}
            multiline
            maxLength={140}
          />

          <View style={QuoteFeedStyles.HorizontalLine}/>
          
          <Pressable style={QuoteFeedStyles.ModalButton} onPress={() => handleCommentPress()}>
            <Text style={QuoteFeedStyles.ModalButtonText}>Comment</Text>
          </Pressable>
          <Pressable style={QuoteFeedStyles.ModalButton} onPress={() => bookmarkQuote(selectedQuote)}>
            <Text style={QuoteFeedStyles.ModalButtonText}>Bookmark</Text>
          </Pressable>
          <Pressable style={QuoteFeedStyles.ModalButton} onPress={() => closeModal()}>
            <Text style={QuoteFeedStyles.ModalButtonText}>Close</Text>
          </Pressable>
        </ScrollView>
      )
    }
  }
  // -----

  const [quoteList, setQuoteList] = useState([]);

  useEffect(() => {
    const setBookmarks = async () => {
      const data = await getBookmarks();
      const newList = JSON.parse(JSON.stringify(data));
      setQuoteList(newList);
    }
    setBookmarks();
  }, []);

  const getBookmarks = async () => {
    try {
      const response = await fetch(URL + '/get-favorite-quotes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_id: user_id
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Error in getBookmarks:", error);
    }
  }

return (
    <View style={QuoteFeedStyles.GreenBackground}>
      <View style={BookmarkStyles.BookmarkFeed}>
        <View style={QuoteFeedStyles.QuoteFeedTitleBackground}>
          <Text style={QuoteFeedStyles.QuoteFeedTitleText}>Bookmarks</Text>
        </View>

        <ScrollView style={QuoteFeedStyles.Scroll}>
          {quoteList.slice(0).reverse().map(renderQuote)}
        </ScrollView>
      </View>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={isModalVisible}
        onRequestClose={() => closeModal()}
      >
        <View style={BookmarkStyles.ModalBackground}>
          <View style={QuoteFeedStyles.Modal}>
            <RootSiblingParent>
              {renderModal()}
            </RootSiblingParent>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const BookmarkStyles = StyleSheet.create({
  BookmarkFeed: {
    backgroundColor: '#877965',
    alignSelf: 'center',
    width: '90%',
    height: '90%',
    marginTop: '4%',
    borderRadius: 10,
  },
  ModalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  }
})

export { BookmarksScreen };