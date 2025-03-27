
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAxDjACUAcRrJoDItcqKCMwEVHX3rNBvtg",
  authDomain: "poster-analyzer.firebaseapp.com",
  projectId: "poster-analyzer",
  storageBucket: "poster-analyzer.firebasestorage.app",
  messagingSenderId: "551387135420",
  appId: "1:551387135420:web:d6bb112c1041ee900cbfb9",
  measurementId: "G-44NP5BZ05X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
