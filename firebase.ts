import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBpWgN3HQSSvHHi4Q3u-YxAzREyCaXMDFs",
  authDomain: "mindcanvas-ai.firebaseapp.com",
  projectId: "mindcanvas-ai",
  storageBucket: "mindcanvas-ai.firebasestorage.app",
  messagingSenderId: "900176834868",
  appId: "1:900176834868:web:3bfde7f5197c677a203561",
  measurementId: "G-WRSD4J49GH"
};

const app = initializeApp(firebaseConfig);
console.log(app);
