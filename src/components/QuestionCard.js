import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const QuestionCard = memo(({ question, options, onAnswer }) => (
  <View style={styles.container}>
    <Text style={styles.questionText}>{question}</Text>
    {options.map((option, index) => (
      <TouchableOpacity 
        key={index} 
        style={styles.optionButton}
        onPress={() => onAnswer(option)}
      >
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
));

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20
  },
  optionButton: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10
  },
  optionText: {
    textAlign: 'center'
  }
});

export default QuestionCard;
