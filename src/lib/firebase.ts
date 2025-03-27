
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyC7vV5Y8NaF8jM6_7KFQJZl1xeYuPBmwDg",
  authDomain: "marketing-analyzer-demo.firebaseapp.com",
  projectId: "marketing-analyzer-demo",
  storageBucket: "marketing-analyzer-demo.appspot.com",
  messagingSenderId: "850471277317",
  appId: "1:850471277317:web:8acf81be67b0372544d4c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
