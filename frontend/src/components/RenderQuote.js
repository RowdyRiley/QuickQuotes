import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import QuoteFeedStyles from '../styles/QuoteFeedStyles';

// Display quote in a pressable button
const RenderQuote = (quote, handleQuotePress) => (
  <TouchableOpacity onPress={() => handleQuotePress(quote)}>
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

export default RenderQuote;