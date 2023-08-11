import { initializeApp } from "firebase/app";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyAsAqK5U0jUyM0d_RSPcOgLr-FYnukQqXw",
    authDomain: "smart-questionnaire.firebaseapp.com",
    projectId: "smart-questionnaire",
    storageBucket: "smart-questionnaire.appspot.com",
    messagingSenderId: "453061042969",
    appId: "1:453061042969:web:a9373c5b7b399f9eea9b88",
    measurementId: "G-W13BQQ4LF6"
  };

const app = initializeApp(firebaseConfig);

const functions = getFunctions(app);

export  { app, functions};
