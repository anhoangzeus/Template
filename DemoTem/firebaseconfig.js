// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBg61xdBSQcJYqrG-QliJx1aT-0fNzYxrw",
    authDomain: "fir-tlcn.firebaseapp.com",
    databaseURL: "https://fir-tlcn.firebaseio.com",
    projectId: "fir-tlcn",
    storageBucket: "fir-tlcn.appspot.com",
    messagingSenderId: "687401414004",
    appId: "1:687401414004:web:cfefba721f05e93789d021",
    measurementId: "G-QPD1GBZ7MK"
  };

//  var firebaseConfig = {
//     apiKey: "AIzaSyBg61xdBSQcJYqrG-QliJx1aT-0fNzYxrw",
//     authDomain: "fir-tlcn.firebaseapp.com",
//     databaseURL: "https://fir-tlcn.firebaseio.com",
//     projectId: "fir-tlcn",
//     storageBucket: "fir-tlcn.appspot.com",
//     messagingSenderId: "687401414004",
//     appId: "1:687401414004:web:a33691022d66563289d021",
//     measurementId: "G-JPZ9HFXEN5"
//   };

  export const fbApp = firebase.initializeApp(firebaseConfig);