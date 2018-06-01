//import Rebase from 're-base';
import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyDoR4jyw-5iysbDud3g6BBLQIkguIpvllk",
  authDomain: "imho-5fd1d.firebaseapp.com",
  databaseURL: "https://imho-5fd1d.firebaseio.com",
  projectId: "imho-5fd1d",
  storageBucket: "",
  messagingSenderId: "291394703569"
}

const firebaseApp = firebase.initializeApp(config);
//const database = Rebase.createClass(firebaseApp.database());
const database = firebaseApp.firestore();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const settings = { timestampsInSnapshots: true };
database.settings(settings);

export { firebase, firebaseApp, database, facebookProvider, googleProvider };