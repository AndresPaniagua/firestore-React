import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBAQqlb_qlbjq7AcxLHBqmmBhDZp5G9LnU",
    authDomain: "testreact-1ca12.firebaseapp.com",
    projectId: "testreact-1ca12",
    storageBucket: "testreact-1ca12.appspot.com",
    messagingSenderId: "960836469182",
    appId: "1:960836469182:web:3b85576bf41a42b29979ef"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  const store = fire.firestore();

  export { store };