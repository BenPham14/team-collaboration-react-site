// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVt1OJszzZqBQYzB0M04ajqtcbVKosZnQ",
    authDomain: "chat-dead7.firebaseapp.com",
    projectId: "chat-dead7",
    storageBucket: "chat-dead7.appspot.com",
    messagingSenderId: "805368558962",
    appId: "1:805368558962:web:4672f6b8384962be4e99eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();