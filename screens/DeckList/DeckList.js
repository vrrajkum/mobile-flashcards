import React from 'react';
import { FlatList } from 'react-native';
import { getDecks } from '../../utils/api';
import Deck from '../../components/Deck/Deck';

class DeckList extends React.PureComponent {
  state = {
    decks: null
  }

  // Retrieve the list of decks
  async componentDidMount() {
    const decks = await getDecks();
    this.setState({ decks });
  }

  // Reload the component upon a change in decks
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.componentDidMount();
    }
  }

  // Pull up details for an individual deck when that deck is pressed
  handlePress = (deck) => {

  }

  render() {
    const { decks } = this.state;
    const deckArray = decks && Object.keys(decks).map(deckName => decks[deckName]); // Format decks for <FlatList /> component

    return (
      <FlatList
        data={deckArray}
        renderItem={({ item }) => <Deck deck={item} />}
        keyExtractor={item => item.title}
      />
    );
  }
}

export default DeckList;