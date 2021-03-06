import React, { PureComponent } from 'react';
import { KeyboardAvoidingView, TextInput } from 'react-native';
import styles from './styles';
import { saveDeck } from '../../utils/api';
import TextButton from '../../components/TextButton/TextButton';

class NewDeck extends PureComponent {
  state = { 
    text: ''
  }

  // Create a new deck, clear the input field, and redirect to Home
  handleSubmit = async () => {
    const { text } = this.state;
    const savedDeck = await saveDeck(text);
    const newDeck = savedDeck[text];
    this.setState({ text: '' });
    this.props.navigation.navigate('DeckDetail', { deck: newDeck });
  }

  render() {
    const { text } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <TextInput 
          placeholder="Deck title" 
          value={text} 
          onChangeText={text => this.setState({ text })}
          style={styles.inputField}
        />
        <TextButton disabled={!text} text="Create Deck" onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    );
  }
}

export default NewDeck;