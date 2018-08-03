import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native';

import { clearLocalNotification, setLocalNotification } from '../helpers/notifications';

class QuizScreen extends React.Component {
  static navigationOptions = ({ navigation: { getParam } }) => {
    const headerTitle = getParam('title');
    const current = getParam('current', 1);
    const numberOfCards = getParam('cards').length;

    const showRemaining = current <= numberOfCards;
    return {
      headerTitle,
      headerRight: showRemaining ? (
        <Text style={styles.headerRightText}>
          {`${current}/${numberOfCards}`}
        </Text>
      ) : null,
    };
  };

  state = {
    currentIndex: 0,
    isFlipped: false,
    correctAnswers: 0,
    finished: false,
  };

  flip = () => {
    this.setState(state => ({ isFlipped: !state.isFlipped }));
  }

  handleLast = () => {
    this.setState({ finished: true });
    clearLocalNotification()
      .then(setLocalNotification)
  }

  handleCorrect = () => {
    this.props.navigation.setParams({ current: this.state.currentIndex + 2 });
    const isLast = this.state.currentIndex === this.props.navigation.getParam('cards').length - 1;

    this.setState(state => ({
      currentIndex: state.currentIndex + 1,
      correctAnswers: state.correctAnswers + 1,
      isFlipped: false,
    }));

    if (isLast) {
      this.handleLast();
    }
  }

  handleIncorrect = () => {
    this.props.navigation.setParams({ current: this.state.currentIndex + 2 });
    const isLast = this.state.currentIndex === this.props.navigation.getParam('cards').length - 1;

    this.setState(state => ({
      currentIndex: state.currentIndex + 1,
      isFlipped: false,
    }));

    if (isLast) {
      this.handleLast();
    }
  }

  handleRetake = () => {
    this.props.navigation.setParams({ current: 1 });

    this.setState({
      currentIndex: 0,
      isFlipped: false,
      correctAnswers: 0,
      finished: false,
    });
  }

  render = () => {
    const { navigation } = this.props;
    const { currentIndex, isFlipped, correctAnswers } = this.state;
    const title = navigation.getParam('title');
    const cards = navigation.getParam('cards');
    const size = cards.length;

    if (this.state.finished) {
      return (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.cardText}>
              {(correctAnswers / size * 100).toFixed(2)}%
            </Text>
            <Text style={styles.cardSubtext}>score</Text>
          </View>
          <Button
            title="Retake quiz"
            onPress={this.handleRetake}
            />
          <Button
            title="Back"
            onPress={() => navigation.goBack()}
            />
        </View>
      );
    }

    const { q, a } = cards[currentIndex];

    return (
      <View styles={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardText}>{isFlipped ? a : q}</Text>
          <Button
            title={isFlipped ? 'Show question' : 'Show answer'}
            onPress={this.flip}
          />
        </View>
        <Button
          title="Correct"
          onPress={this.handleCorrect}
        />
        <Button
          title="Incorrect"
          onPress={this.handleIncorrect}
        />
      </View>
    );
  }
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
  }
});

export default QuizScreen;