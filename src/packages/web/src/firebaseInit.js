import firebase from "firebase/app";
import "firebase/messaging";
import { toast } from "react-toastify";
import "react-router-modal/css/react-router-modal.css";
toast.configure();

const firebaseConfig = {
    apiKey: "AIzaSyCwPOEP9dWNM4zzdVUy6ACbypBS-f3JcZs",
    authDomain: "finulent-4bd6b.firebaseapp.com",
    projectId: "finulent-4bd6b",
    storageBucket: "finulent-4bd6b.appspot.com",
    messagingSenderId: "839384205774",
    appId: "1:839384205774:web:027f920bfc5e7c68e5439f"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
const publicKey = 'BDKQVDDYVwCIiDqTsShSyjDT3A13ZXJ2ONvaXlB57GZg2ohe_W1kklTFR4VSlALdCUOyLpm0P_bP5gzEfxAMAjg';

export const getToken = async setTokenFound => {
  let currentToken = '';
  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
  } catch (error) {
    console.log('An error occurred while retrieving token. ', error);
  }
  onMessageListener()
    .then(payload => {
      console.log('onMessageListener', payload);
      toast.info(payload?.notification?.title, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 6000
      });
      // setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
    })
    .catch(err => console.log('failed: ', err));
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log('payload',payload)
      resolve(payload);
    });
  });