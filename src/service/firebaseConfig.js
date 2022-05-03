// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase
const fbase = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const firebase_db = firebase.database();
export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const firebaseStorage = firebase.storage();
