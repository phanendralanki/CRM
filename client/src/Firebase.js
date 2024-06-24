// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ticketingapp-a8676.firebaseapp.com",
  projectId: "ticketingapp-a8676",
  storageBucket: "ticketingapp-a8676.appspot.com",
  messagingSenderId: "1038005096683",
  appId: "1:1038005096683:web:166d17d35bb93dd2daaeae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);