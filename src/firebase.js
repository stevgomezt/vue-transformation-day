import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDCVl7YzXjLpXPc_DRdA2Pv4HZ2eeeN2ks",
  authDomain: "landing-page-entel.firebaseapp.com",
  projectId: "landing-page-entel",
  storageBucket: "landing-page-entel.appspot.com",
  messagingSenderId: "526510505807",
  appId: "1:526510505807:web:b8d3406479898802900f3a"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
export { auth }; // Exporta la instancia de autenticación
