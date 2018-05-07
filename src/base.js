import Rebase from 're-base';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDoR4jyw-5iysbDud3g6BBLQIkguIpvllk",
  authDomain: "imho-5fd1d.firebaseapp.com",
  databaseURL: "https://imho-5fd1d.firebaseio.com",
  projectId: "imho-5fd1d",
  storageBucket: "",
  messagingSenderId: "291394703569"
}

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { app, base, facebookProvider, googleProvider };