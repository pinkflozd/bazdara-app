import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyD2PAdzxrpNtJWqKGUm2RW441euKOT6p6Y",
    authDomain: "bazdara-99a47.firebaseapp.com",
    databaseURL: "https://bazdara-99a47.firebaseio.com",
    projectId: "bazdara-99a47",
    storageBucket: "bazdara-99a47.appspot.com",
    messagingSenderId: "544509936614"
};

export default firebase.initializeApp(config);
