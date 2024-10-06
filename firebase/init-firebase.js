// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB2wJx7wkjPMAPR5o3nsD0WCYv_rnXZ5Uo",
  authDomain: "al-watania-transport.firebaseapp.com",
  projectId: "al-watania-transport",
  storageBucket: "al-watania-transport.appspot.com",
  messagingSenderId: "12810711310",
  appId: "1:12810711310:web:81bb76b28590911605e75f",
  measurementId: "G-DGW9LF99YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app); // Get a reference to the storage service

