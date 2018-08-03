import React from 'react';
import { Platform, StyleSheet, Text, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';

import FAB from 'react-native-fab';
import HeaderButtons, { HeaderButton, Item } from 'react-navigation-header-buttons';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import Deck from '../components/Deck';
import { getDecks } from '../helpers/api';
import { setLocalNotification } from '../helpers/notifications';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'All decks',
    headerRight: (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title="search" iconName="ios-add" onPress={() => navigation.navigate('NewDeck')} />
      </HeaderButtons>
    )
  });

  state = {
    decks: {},
  };

  componentDidMount = () => {
    this.fetchDecks();
    setLocalNotification();
  }

  fetchDecks = async () => {
    const decks = await getDecks();
    this.setState({ decks });
  }

  handlePress = title => {
    this.props.navigation.navigate('Deck', { title });
  };

  render() {
    return (
      <React.Fragment>
        <NavigationEvents onDidFocus={this.fetchDecks} />
        <FlatList
          data={Object.keys(this.state.decks)}
          renderItem={({item:title}) => <Deck title={title} size={this.state.decks[title].length} onPress={() => this.handlePress(title)} />}
          keyExtractor={item => `deck-${item}`}
          contentContainerStyle={{ padding: 16 }}
        />
      </React.Fragment>
    );
  }
}

const IoniconsHeaderButton = passMeFurther => (
  <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={40} color="rgb(0,122,255)" />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    flex: 1,
    alignItems: 'stretch',
    padding: 16,
  },
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
  deckName: {
    fontSize: 20,
    marginBottom: 16,
  },
  deckSize: {
    fontSize: 16,
    color: '#999',
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
  },
});

export default HomeScreen;
