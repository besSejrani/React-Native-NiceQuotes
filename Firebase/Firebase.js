import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  // Your firebase credentials
};

class Firebase {
  static db;

  static init = () => {
    firebase.initializeApp(config);
    Firebase.db = firebase.firestore();
  };
}

export default Firebase;
