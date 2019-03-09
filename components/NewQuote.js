import React, { Component } from 'react';
import { Modal, View, TextInput, Button } from 'react-native';

class NewQuote extends Component {
  state = { zitat: null, author: null };

  render() {
    const { visible, onSave } = this.props;
    const { zitat, author } = this.state;
    return (
      <Modal
        visible={visible}
        onRequestClose={() => {
          this.setState({ zitat: null, author: null });
          onSave(null, null);
        }}
        animationType="slide"
      >
        <View style={styles.container}>
          <TextInput
            onChangeText={zitat => this.setState({ zitat })}
            multiline
            style={[styles.input, { height: 100 }]}
            placeholder="Zitat"
            placeholderTextColor="#2196f3"
          />

          <TextInput
            onChangeText={author => this.setState({ author })}
            style={styles.input}
            placeholder="Author"
            placeholderTextColor="#2196f3"
          />
          <Button
            title="Speichern"
            onPress={() => {
              this.setState({ zitat: null, author: null });
              onSave(zitat, author);
            }}
            style={styles.button}
          />
        </View>
      </Modal>
    );
  }
}

const styles = {
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    flex: 1
  },
  input: {
    width: '80%',
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 0.7,
    borderBottomColor: '#2196f3',
    fontSize: 18,
    height: 50
  },
  button: {
    marginTop: 50
  }
};

export default NewQuote;
