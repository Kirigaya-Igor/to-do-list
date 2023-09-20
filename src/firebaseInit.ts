// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB9z8nPM1_GMuciHq-ozmZFgViGPnkHywc',
    authDomain: 'todo-list-638b8.firebaseapp.com',
    projectId: 'todo-list-638b8',
    storageBucket: 'todo-list-638b8.appspot.com',
    messagingSenderId: '393903875150',
    appId: '1:393903875150:web:0774edf310aa66675e0f1f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
