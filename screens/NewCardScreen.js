import React from 'react';
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import { addCardToDeck } from '../helpers/api';

class NewCardScreen extends React.Component {
  static navigationOptions = {
    title: 'New card',
  };

  state = { q: '', a: '', disabled: true };

  handleSubmit = () => {
    const { q, a, disabled } = this.state;

    if (disabled) {
      return Alert.alert(
        'Empty Field(s)',
        'Please provide both a question and an answer to create your card.',
        [{text: 'OK'}],
        { cancelable: false }
      );
    }

    const promise = addCardToDeck(
      this.props.navigation.getParam('title'),
      { q, a },
    );
    promise.then(() => this.props.navigation.goBack());
  }

  handleChange = (key, value) => {
    this.setState(({ q, a }) => {
      let disabled = true;
      if (key === 'q') {
        if (value !== '' && a !== '') {
          disabled = false;
        }
      } else if (value !== '' && q !== '') {
        disabled = false;
      }
      return {
        [key]: value,
        disabled,
      };
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.row}>
          <Text style={styles.icon}>Q</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => this.handleChange('q', value)}
            value={this.state.q}
            maxLength={50}
            autoFocus
            returnKeyType="next"
            autoCorrect={false}
            enablesReturnKeyAutomatically
            blurOnSubmit
            underlineColorAndroid="transparent"
            placeholder="Question"
            onSubmitEditing={() => { this.secondTextInput.focus(); }}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.icon}>A</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => this.handleChange('a', value)}
            value={this.state.a}
            maxLength={50}
            returnKeyType="done"
            autoCorrect={false}
            enablesReturnKeyAutomatically
            blurOnSubmit
            underlineColorAndroid="transparent"
            placeholder="Answer"
            ref={(input) => { this.secondTextInput = input; }}
            onSubmitEditing={this.handleSubmit}
          />
        </View>
        <View style={[styles.row, { marginTop: 16 }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit}
            disabled={this.state.disabled}
          >
            <Text
              style={[
                styles.buttonText,
                this.state.disabled ? { color: '#999' } : {}
              ]}
            >
              Add to deck
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16
  },
  row: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderColor: '#f0f0f0',
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  icon: {
    color: 'gray',
    fontWeight: '600',
    fontSize: 24,
    paddingLeft: 4,
    paddingRight: 20,
  },
  input: {
    flexGrow: 1,
    fontSize: 20,
    padding: 0,
  },
  button: {
    flex: 1,
    paddingTop: 4,
    paddingBottom: 4,
  },
  buttonText: {
    color: 'rgb(0,122,255)',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
  }
});

export default NewCardScreen;
