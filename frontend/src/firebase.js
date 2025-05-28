// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAm4uXuqlTCfbeCr2XHAeHUrbIbFt-PLbI",
  authDomain: "todo-list-auth-8a754.firebaseapp.com",
  projectId: "todo-list-auth-8a754",
  storageBucket: "todo-list-auth-8a754.firebasestorage.app",
  messagingSenderId: "146690345092",
  appId: "1:146690345092:web:0f6d22d683f53666215ad1",
  measurementId: "G-WW2D7TT5V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();