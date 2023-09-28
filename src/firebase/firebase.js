
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCkr2epfo_S1U9vdXrtmMtslfjl3V9cy3c",
  authDomain: "casanova-adfd7.firebaseapp.com",
  projectId: "casanova-adfd7",
  storageBucket: "casanova-adfd7.appspot.com",
  messagingSenderId: "1051826269725",
  appId: "1:1051826269725:web:026d48c000e2647c6220f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}