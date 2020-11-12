import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCpKuOsxjV3s_Xpjk9KlQY8d7JI4fKh5L4",
  authDomain: "whatsapp-clone-react-js-rd.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-react-js-rd.firebaseio.com",
  projectId: "whatsapp-clone-react-js-rd",
  storageBucket: "whatsapp-clone-react-js-rd.appspot.com",
  messagingSenderId: "646438007663",
  appId: "1:646438007663:web:f03dd011ff46e0b0b12e9a",
  measurementId: "G-VME853WB19",
};
const firebaseInit = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
