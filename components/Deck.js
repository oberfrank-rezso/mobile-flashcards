import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';

const Deck = ({ title, size, onPress = null }) => (
  onPress === null ? (
    <View style={styles.deck}>
      <Text style={styles.deckTitle}>{title}</Text>
      <Text style={styles.deckSize}>{size} cards</Text>
    </View>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.deck}>
        <Text style={styles.deckTitle}>{title}</Text>
        <Text style={styles.deckSize}>{size} cards</Text>
      </View>
    </TouchableOpacity>
  )
);

const styles = StyleSheet.create({
  deck: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: 'white',
    borderRadius: Platform.OS === 'ios' ? 4 : 0,
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
