import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const Deck = ({ title, size, onPress = null }) => (
  <TouchableOpacity onPress={onPress} disabled={onPress === null}>
    <View style={styles.deck}>
      <Text style={styles.deckTitle}>{title}</Text>
      <Text style={styles.deckSize}>{size} cards</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  deck: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 16,
  },
  deckTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  deckSize: {
    fontSize: 16,
    color: '#999',
  }
});

export default Deck;
