import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAVe1C9_swxYfRTH1xI1Q6YuzxuFRUakuc",
  authDomain: "whatsapp-clone-v2-react-js-rd.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-v2-react-js-rd.firebaseio.com",
  projectId: "whatsapp-clone-v2-react-js-rd",
  storageBucket: "whatsapp-clone-v2-react-js-rd.appspot.com",
  messagingSenderId: "1018305126471",
  appId: "1:1018305126471:web:b01d79b82f598c98061162",
  measurementId: "G-B8DXTWQ0FC",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebase.firestore();
