import { AsyncStorage } from 'react-native';

export const getDecks = async () => {
  const value = await AsyncStorage.getItem('mobile-flashcards:decks');
  if (value !== null) {
    return JSON.parse(value);
  }
  return {};
}

export const getDeck = async title => {
  const decks = await getDecks();
  return decks[title];
};

export const saveDeckTitle = async title => {
  const value = await getDecks();

  AsyncStorage.setItem(
    'mobile-flashcards:decks',
    JSON.stringify({
      ...value,
      [title]: []
    }),
  );
}

export const addCardToDeck = async (title, card) => {
  const value = await getDecks();

  AsyncStorage.setItem(
    'mobile-flashcards:decks',
    JSON.stringify({
      ...value,
      [title]: [
        ...value[title],
        card,
      ]
    }),
  );
};
