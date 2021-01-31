import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDDBHVFba8BbInUny7yAMZOgycXZ7ePUf8",
    authDomain: "clone-57d41.firebaseapp.com",
    databaseURL: "https://clone-57d41-default-rtdb.firebaseio.com",
    projectId: "clone-57d41",
    storageBucket: "clone-57d41.appspot.com",
    messagingSenderId: "533703619744",
    appId: "1:533703619744:web:2abdc1245776b2698385c5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth};