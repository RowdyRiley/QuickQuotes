import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Clipboard } from 'react-native';
import Toast from 'react-native-root-toast';
import { Rating } from 'react-native-ratings';
import { RootSiblingParent} from 'react-native-root-siblings'

import * as Api from '../utils/Api.js';
import QuoteFeedStyles from '../styles/QuoteFeedStyles.js';
import UserContext from '../utils/UserContext';

// Display additional info about a quote in a Modal
const RenderQuoteModal = (quote, closeModal) => {
  const [displayedQuote, setDisplayedQuote] = useState(null); // The quote currently being displayed
  const [commentText, setCommentText] = useState("");         // String inside comment box
  const { userId } = useContext(UserContext);

  // Set the displayedQuote when quote is updated
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        if (quote) {
          const data = await Api.getSpecificQuote(userId, quote);
          setDisplayedQuote(data);
        }
      } catch (error) {
        console.log("Error in fetchQuote: ", error);
      }
    };
    fetchQuote();
  }, [quote]);

  // Add comment to database and refresh quote
  const handleCommentPress = async () => {
    try {
      const response = await Api.addComment(userId, quote, commentText);
      const refreshedQuote = await Api.getSpecificQuote(userId, quote);
      setDisplayedQuote(refreshedQuote);

      if(response.status == 201) {
        Toast.show('Comment added!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    } catch (error) {
      console.log("Error in handleCommentPress: ", error);
    }
    setCommentText("");
  }

  // Add rating and refresh quote
  const handleRatingPress = async(rating) => {
    try {
      const response = await Api.addRating(userId, quote, rating);
      const refreshedQuote = await Api.getSpecificQuote(userId, quote);
      setDisplayedQuote(refreshedQuote);

      if(response.status == 200) {
        Toast.show('Rating updated!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    } catch(error) {
      console.log("Error in handleRatingPress: ", error);
    }
  }

  // Add quote to user's bookmark and refresh quote
  const handleBookmarkPress = async() => {
    try {
      const response = await Api.bookmarkQuote(userId, quote);
      const refreshedQuote = await Api.getSpecificQuote(userId, quote);
      setDisplayedQuote(refreshedQuote);

      if(response.status == 201) {
        Toast.show('Quote bookmarked!', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      } else {
        Toast.show('Quote already bookmarked', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
        });
      }
    } catch(error) {
      console.log("Error in handleBookmarkPress: ", error);
    }
  }

  if(displayedQuote) {
    return (
      <View style={QuoteFeedStyles.ModalBackground}>
        <View style={QuoteFeedStyles.Modal}>
          <RootSiblingParent>
            <ScrollView>
              
              <Text style={QuoteFeedStyles.ModalText}>{displayedQuote.quote_content}</Text>
              <View style={{flexDirection: 'row', marginBottom: '2%', marginTop: '2%'}}>
                <Text style={QuoteFeedStyles.ModalLabel}>Author: </Text>
                <Text style={QuoteFeedStyles.ModalText}>{displayedQuote.author}</Text>
              </View>

              <View style={{flexDirection: 'row', marginBottom: '2%'}}>
                <Text style={QuoteFeedStyles.ModalLabel}>Tag: </Text>
                <Text style={QuoteFeedStyles.ModalText}>{displayedQuote.tag}</Text>
              </View>

              <View style={{flexDirection: 'row', marginBottom: '2%', alignItems: 'center'}}>
                <Text style={QuoteFeedStyles.ModalLabel}>Rating: </Text>
                <Rating
                  type='star'
                  ratingCount={5}
                  startingValue={displayedQuote.rating}
                  imageSize={20}
                  fractions={2}
                  jumpValue={1}
                  tintColor={'#877965'}
                  readOnly={false}
                  onFinishRating={rating => handleRatingPress(rating)}
                />
                <Text style={QuoteFeedStyles.ModalText}>  {(Math.round(displayedQuote.rating * 100) / 100).toFixed(2)}</Text>
              </View>

              <Text style={QuoteFeedStyles.ModalLabel}>Comments:</Text>
              {displayedQuote.comments.map((comment, index) => (
                <Text key={index} style={QuoteFeedStyles.ModalText}>Anonymous: {comment.comment_content}</Text>
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

              <Pressable style={QuoteFeedStyles.ModalButton} onPress={() => handleBookmarkPress()}>
                <Text style={QuoteFeedStyles.ModalButtonText}>Bookmark</Text>
              </Pressable>

              <Pressable style={QuoteFeedStyles.ModalButton} onPress={() => Clipboard.setString("Check out this quote from the Quick Quotes app!:\n\n" + displayedQuote.quote_content + "\n\n-" + displayedQuote.author)}>
                <Text style={QuoteFeedStyles.ModalButtonText}>Share</Text>
              </Pressable>
              
              <Pressable style={QuoteFeedStyles.ModalButton} onPress={() => closeModal()}>
                <Text style={QuoteFeedStyles.ModalButtonText}>Close</Text>
              </Pressable>

            </ScrollView>
          </RootSiblingParent>
        </View>
      </View>
    )
  }
}

export default RenderQuoteModal;