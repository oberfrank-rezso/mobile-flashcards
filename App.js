import { createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import DeckScreen from './screens/DeckScreen';
import NewDeckScreen from './screens/NewDeckScreen';
import NewCardScreen from './screens/NewCardScreen';
import QuizScreen from './screens/QuizScreen';

const App = createStackNavigator({
  Home: HomeScreen,
  NewDeck: NewDeckScreen,
  NewCard: NewCardScreen,
  Deck: DeckScreen,
  Quiz: QuizScreen,
}, {
  initialRouteName: 'Home',
});

export default App;
