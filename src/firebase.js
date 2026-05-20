import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVXld1aOElvBjzJKLYZt6zwBKB0Idm74Q",
  authDomain: "wavesights.firebaseapp.com",
  projectId: "wavesights",
  storageBucket: "wavesights.firebasestorage.app",
  messagingSenderId: "412254207118",
  appId: "1:412254207118:web:c4763d6c12540396979ddf",
  measurementId: "G-ZWJ6WR0B79"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);