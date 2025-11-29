// pi-wrapper.js
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase fallback
const firebaseConfig = {
  apiKey: "AIzaSyCMuOymY5KniYJgg51vkhcYWxXeyXAyFk0",
  authDomain: "pet-paths.firebaseapp.com",
  databaseURL: "https://pet-paths-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pet-paths",
  storageBucket: "pet-paths.firebasestorage.app",
  messagingSenderId: "5202022310",
  appId: "1:5202022310:web:55991fbd2be58294bfc967",
  measurementId: "G-SW8L37HRVV"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Pi IP (updated by Worker)
let piIP = null;

// Fetch Pi IP from your Cloudflare Worker
async function updatePiIP() {
  try {
    const res = await fetch("https://pet-paths.site/webhook");
    const data = await res.json();
    if (data.ip) piIP = data.ip;
    return piIP;
  } catch (e) {
    console.warn("Failed to get Pi address:", e);
    piIP = null;
    return null;
  }
}

// Write data: Pi first, Firebase fallback
export async function writeData(key, data) {
  if (!piIP) await updatePiIP();

  if (piIP) {
    try {
      const res = await fetch(`${piIP}/db/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Pi write failed");
      return await res.json();
    } catch (e) {
      console.warn("Pi write failed, falling back to Firebase:", e);
    }
  }

  // Firebase fallback
  const statusRef = ref(db, key);
  const newRef = push(statusRef);
  await push(statusRef, data);
  return { success: true, key };
}

// Read data: Pi first, Firebase fallback
export async function readData(key) {
  if (!piIP) await updatePiIP();

  if (piIP) {
    try {
      const res = await fetch(`${piIP}/db/${encodeURIComponent(key)}`);
      if (!res.ok) throw new Error("Pi read failed");
      return await res.json();
    } catch (e) {
      console.warn("Pi read failed, falling back to Firebase:", e);
    }
  }

  // Firebase fallback
  const snapshot = await get(ref(db, key));
  return snapshot.val();
}

// Example usage
// writeData('narberthDogWalkStatuses/test', {status:'walking', user:'oliver'})
// readData('narberthDogWalkStatuses/test').then(console.log)
