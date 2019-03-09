import React, { Component } from 'react';
import { View, Button, Alert, Text, ActivityIndicator } from 'react-native';
import Firebase from './Firebase/Firebase';
import Quote from './components/Quote';
import NewQuote from './components/NewQuote';

StyledButton = props => {
  let button = null;
  if (props.visible) {
    button = (
      <View style={props.style}>
        <Button title={props.title} onPress={props.onPress} />
      </View>
    );
  }
  return button;
};

export default class App extends Component {
  state = { id: 0, showNewQuote: false, quotes: [], loading: true };

  componentDidMount = () => {
    Firebase.init();
    this.getData();
  };

  getData = async () => {
    let quotes = [];
    let query = await Firebase.db.collection('quotes').get();

    query.forEach(quote => {
      quotes.push({
        id: quote.id,
        text: quote.data().text,
        author: quote.data().author
      });
    });
    this.setState({ quotes, loading: false });
  };

  saveQuoteDB = async (text, author, quotes) => {
    docRef = await Firebase.db.collection('quotes').add({ text, author });
    quotes[quotes.length - 1].id = docRef.id;
  };

  removeQuoteDB = id => {
    Firebase.db
      .collection('quotes')
      .doc(id)
      .delete();
  };

  addQuotes = (text, author) => {
    let { quotes } = this.state;
    if (text && author) {
      quotes.push({ text, author });
      this.saveQuoteDB(text, author, quotes);
    }
    this.setState({ id: quotes.length - 1, showNewQuote: false, quotes });
  };

  deleteButton = async () => {
    Alert.alert(
      'Zitat löschen ?',
      'Dies kann nicht rückgängig gemacht werden.',
      [
        { text: 'Abbrechen', style: 'negative' },
        { text: 'Löschen', style: 'destructive', onPress: this.deleteQuote }
      ]
    );
  };

  deleteQuote = () => {
    let { id, quotes } = this.state;
    this.removeQuoteDB(quotes[id].id);
    quotes.splice(id, 1);
    this.setState({ id: quotes.length - 1, quotes });
  };

  nachstesZitat = () => {
    let { id, quotes } = this.state;
    let nextId = id + 1;
    if (nextId === quotes.length) nextId = 0;
    this.setState({ id: nextId });
  };

  foreresZitat = () => {
    let { id, quotes } = this.state;
    if (id <= 0) {
      return this.setState({ id: quotes.length - 1 });
    }
    this.setState({
      id: id - 1
    });
  };

  render() {
    let { quotes, id } = this.state;
    const quote = quotes[id];

    let content = <Text style={{ fontSize: 36 }}>Keine Zitate</Text>;
    if (quote) {
      content = <Quote text={quote.text} author={quote.author} />;
    }

    if (this.state.loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#2196f3"
          style={styles.loadingActivity}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <NewQuote
            visible={this.state.showNewQuote}
            onSave={(text, author) => this.addQuotes(text, author)}
          />

          {content}

          <View style={styles.buttonUp}>
            <StyledButton
              visible={quotes.length - 1 >= 0 ? true : false}
              title="Löschen"
              onPress={() => this.deleteButton()}
            />

            <StyledButton
              visible
              title="Neu"
              onPress={() =>
                this.setState({ showNewQuote: !this.state.showNewQuote })
              }
            />
          </View>

          <View style={styles.buttonDown}>
            <StyledButton
              visible={quotes.length - 1 >= 1 ? true : false}
              title="Lätztes Zitat"
              onPress={() => {
                this.foreresZitat();
              }}
            />
            <StyledButton
              visible={quotes.length - 1 >= 1 ? true : false}
              title="Nächstes Zitat"
              onPress={() => {
                this.nachstesZitat();
              }}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonDown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    position: 'absolute',
    top: '87%'
  },
  buttonUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 350,
    position: 'absolute',
    bottom: '87%'
  },
  loadingActivity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
