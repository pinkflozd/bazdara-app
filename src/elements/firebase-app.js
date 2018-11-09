import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyBXxzi4oP1NBQU2t1VTpmsvXp5JZ7KzE_c",
  authDomain: "vreme-live.firebaseapp.com",
  databaseURL: "https://bazdara-99a47.firebaseio.com",
  projectId: "vreme-live",
  storageBucket: "bazdara-99a47.appspot.com",
  messagingSenderId: "982039873090"
};

export default firebase.initializeApp(config);
