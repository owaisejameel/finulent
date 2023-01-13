importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

//local
const firebaseConfig = {
  apiKey: "AIzaSyCwPOEP9dWNM4zzdVUy6ACbypBS-f3JcZs",
  authDomain: "finulent-4bd6b.firebaseapp.com",
  projectId: "finulent-4bd6b",
  storageBucket: "finulent-4bd6b.appspot.com",
  messagingSenderId: "839384205774",
  appId: "1:839384205774:web:027f920bfc5e7c68e5439f"
  };
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
 if(payload.data.author && payload.data.twi_body){
  const notificationTitle = payload.data.author;
  const notificationOptions = {
    body: payload.data.twi_body,
    icon: "/logo192.png",
  };
   // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
 }else{
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/logo192.png",
  };
 }
});
