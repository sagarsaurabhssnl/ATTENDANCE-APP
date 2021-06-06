import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCWPJXcUfYwEKrtU96tN4UFxiO5ItPn1Mw",
  authDomain: "attendance-5535d.firebaseapp.com",
  databaseURL: "https://attendance-5535d-default-rtdb.firebaseio.com",
  projectId: "attendance-5535d",
  storageBucket: "attendance-5535d.appspot.com",
  messagingSenderId: "1015154074724",
  appId: "1:1015154074724:web:e41567c8735f7ccb4fab71"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.database();
