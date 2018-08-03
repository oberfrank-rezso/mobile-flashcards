import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { getDeck } from '../helpers/api';

class DeckScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title'),
  });

  state = {
    cards: [],
  };

  componentDidMount = () => {
    this.fetchDeck();
  };

  fetchDeck = async () => {
    const title = this.props.navigation.getParam('title');
    const cards = await getDeck(title);
    this.setState({ cards });
  };

  render = () => (
    <View>
      <NavigationEvents onDidFocus={this.fetchDeck} />
      <View style={styles.card}>
        <Text style={styles.cardText}>{this.props.navigation.getParam('title')}</Text>
        <Text style={styles.cardSubtext}>{this.state.cards.length} cards</Text>
      </View>
      <Button
        title="Start quiz"
        onPress={() => {
          this.props.navigation.navigate('Quiz', {
            title: this.props.navigation.getParam('title'),
            cards: this.state.cards,
          });
        }}
        disabled={this.state.cards.length === 0}
      />
      <Button
        title="Add card"
        onPress={() => {
          this.props.navigation.navigate('NewCard', {
            title: this.props.navigation.getParam('title'),
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 64,
    paddingBottom: 48,
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 20,
    marginBottom: 32,
  },
  cardSubtext: {
    fontSize: 16,
    color: '#999',
  },
  headerRightText: {
    marginRight: 16,
    fontSize: 16,
  },
});

export default DeckScreen;