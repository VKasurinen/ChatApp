
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import Constants from "expo-constants"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth} from 'firebase/auth';




// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: Constants.manifest2.extra.apiKey,
//   authDomain: Constants.manifest2.extra.authDomain,
//   projectId: Constants.manifest2.extra.projectId,
//   storageBucket: Constants.manifest2.extra.storageBucket,
//   messagingSenderId: Constants.manifest2.extra.messagingSenderId,
//   appId: Constants.manifest2.extra.appId,
//   databaseURL: Constants.manifest2.extra.databaseURL

// };


// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID

// };


const firebaseConfig = {
  apiKey: "AIzaSyApFyDuVTfZ_PJgOub6TXjTDuInOv4xwRQ",
  authDomain: "chatappreact-85e83.firebaseapp.com",
  projectId: "chatappreact-85e83",
  storageBucket: "chatappreact-85e83.appspot.com",
  messagingSenderId: "215499383515",
  appId: "1:215499383515:web:cc7f4504ed355459b662fe"
};




// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();