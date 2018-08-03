import React from 'react';
import { View, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { saveDeckTitle } from '../helpers/api';

class NewDeckScreen extends React.Component {
  static navigationOptions = {
    title: 'New deck',
  };

  state = {
    title: '',
    disabled: true,
  }

  handleSubmit = () => {
    const promise = saveDeckTitle(this.state.title);
    promise.then(() => this.props.navigation.goBack());
  }

  handleChange = value => {
    this.setState({
      title: value,
      disabled: value === ''
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.row}>
          <Text style={styles.icon}>T</Text>
          <TextInput
            style={styles.input}
            onChangeText={this.handleChange}
            value={this.state.title}
            maxLength={50}
            autoFocus
            returnKeyType="done"
            autoCorrect={false}
            enablesReturnKeyAutomatically
            blurOnSubmit
            underlineColorAndroid="transparent"
            placeholder="Title"
            onSubmitEditing={() => { this.handleSubmit }}
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
              Create deck
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

export default NewDeckScreen;
