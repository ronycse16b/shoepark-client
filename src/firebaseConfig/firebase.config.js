// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDmWKjySwQjdNAehslR4uHkYcJWny1E_qM",
    authDomain: "shoe-parkbd.firebaseapp.com",
    projectId: "shoe-parkbd",
    storageBucket: "shoe-parkbd.appspot.com",
    messagingSenderId: "914302533175",
    appId: "1:914302533175:web:ea9f712e93a765ec8989b2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);

export { storage, app };
