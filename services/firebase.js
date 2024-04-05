import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ17Nf7JOwJAItWRetrAWp2THjE0epdEg",
  authDomain: "uhub-b1a4d.firebaseapp.com",
  projectId: "uhub-b1a4d",
  storageBucket: "uhub-b1a4d.appspot.com",
  messagingSenderId: "37094280542",
  appId: "1:37094280542:web:d11e9fb832f560cba853cf",
  measurementId: "G-SCK4ZNCYEF",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
