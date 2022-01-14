// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set, update, push } from 'firebase/database';
import { useState, useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC4KpqW9Zvn9PFPcpr0tfIykF6Cpz3HDXo",
    authDomain: "wildcatfinder.firebaseapp.com",
    databaseURL: "https://wildcatfinder-default-rtdb.firebaseio.com",
    projectId: "wildcatfinder",
    storageBucket: "wildcatfinder.appspot.com",
    messagingSenderId: "570021373065",
    appId: "1:570021373065:web:803f27229ded671f55d258",
    measurementId: "G-XZP4BRTCJQ"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
        if (devMode) { console.log(`loading ${path}`); }
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val();
            if (devMode) { console.log(val); }
            setData(transform ? transform(val) : val);
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null);
            setLoading(false);
            setError(error);
        });
    }, [path, transform]);

    return [data, loading, error];
};

export const setData = (path, value) => (
    set(ref(database, path), value)
);

//
export const updateData = (childRef, value) => (
    update(childRef, value)
  );

  export const getRefByPush = (path) => (
    push(ref(database, path))
  );