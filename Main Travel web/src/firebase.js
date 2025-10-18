import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCqgxeGiXsOA5LCBeCQxKz7jWicGLdM_kw",
  authDomain: "bharat-backpackers-2896c.firebaseapp.com",
  projectId: "bharat-backpackers-2896c",
  storageBucket: "bharat-backpackers-2896c.firebasestorage.app",
  messagingSenderId: "743896187593",
  appId: "1:743896187593:web:6f28752452a8953639c318"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

