import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCaIDRYa3duKK_E4-oeJU3Ymnvo7X-vjzg",
  authDomain: "instasnap-arch.firebaseapp.com",
  projectId: "instasnap-arch",
  storageBucket: "instasnap-arch.appspot.com",
  messagingSenderId: "1023480080094",
  appId: "1:1023480080094:web:15ccdfc0e7de7f1bc5c44f",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
