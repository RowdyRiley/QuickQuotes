import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGzgSqFs7JPLFIOOz3dkOGWBxc1HfBcP8",
  authDomain: "quickquotes-ea480.firebaseapp.com",
  projectId: "quickquotes-ea480",
  storageBucket: "quickquotes-ea480.appspot.com",
  messagingSenderId: "390959175519",
  appId: "1:390959175519:web:07f07b1fc99e0eb18f48ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;