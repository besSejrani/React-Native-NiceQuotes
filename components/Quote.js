import React from 'react';
import { Text, View } from 'react-native';

const Quote = ({ text, author }) => {
  const { textStyle, authorStyle, container } = styles;
  return (
    <View style={container}>
      <Text style={textStyle}> {text} </Text>
      <Text style={authorStyle}> &mdash; {author}</Text>
    </View>
  );
};

const styles = {
  container: {
    padding: 30
  },
  textStyle: {
    fontSize: 23,
    fontStyle: 'italic',
    textAlign: 'auto'
  },
  authorStyle: {
    margin: 20,
    fontSize: 18,
    textAlign: 'right'
  }
};

export default Quote;
