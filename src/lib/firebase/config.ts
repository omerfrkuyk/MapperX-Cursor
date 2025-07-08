import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCgbpbkVd-7SG07N46aITZc73Vt9xs0giQ",
  authDomain: "mapperx-website.firebaseapp.com",
  projectId: "mapperx-website",
  storageBucket: "mapperx-website.firebasestorage.app",
  messagingSenderId: "346649842276",
  appId: "1:346649842276:web:6b61d3afa8ec7fd9b8c571",
  measurementId: "G-1VYLPW6816"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
let analytics;

// Analytics can only be initialized on the client side
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, db, auth, storage, analytics }; 