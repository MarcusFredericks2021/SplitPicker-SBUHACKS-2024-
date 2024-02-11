// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAUiDE4ha_qLmH-aMKyrkIn5No2ZoSD3dg",
    authDomain: "splitpicker-73171.firebaseapp.com",
    projectId: "splitpicker-73171",
    storageBucket: "splitpicker-73171.appspot.com",
    messagingSenderId: "308242200929",
    appId: "1:308242200929:web:ca873dbc504f2049ef2d20",
    measurementId: "G-1XVLRLB7R8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const analytics = getAnalytics(app);
