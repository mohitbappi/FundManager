import firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyAOEvdJD8Sh6xHa6pev0cy7XakY-mmItXk",
//   authDomain: "fundmanager-945dd.firebaseapp.com",
//   databaseURL: "https://fundmanager-945dd.firebaseio.com",
//   projectId: "fundmanager-945dd",
//   storageBucket: "fundmanager-945dd.appspot.com",
//   messagingSenderId: "495969577021",
//   appId: "1:495969577021:web:433e688b6b6c2a4c406254",
//   measurementId: "G-E65N5ZFJY7"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBvXsA0xj7BbyCnT9lPgCmHa1k7dXcJwoM",
  authDomain: "fundmanager-4725a.firebaseapp.com",
  databaseURL: "https://fundmanager-4725a.firebaseio.com",
  projectId: "fundmanager-4725a",
  storageBucket: "fundmanager-4725a.appspot.com",
  messagingSenderId: "140686736776",
  appId: "1:140686736776:web:f63eda5cb85b4468e48e3d",
  measurementId: "G-GW5CXLMPWY"
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();