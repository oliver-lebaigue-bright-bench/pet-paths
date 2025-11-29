// pi-wrapper.js
export let dbPi = null;  // Will hold the Pi database handler
export let piIP = null;  // Current Pi IP

// Fetch Pi IP from your worker
export async function updatePiIP() {
  try {
    const res = await fetch('https://pet-paths.site/webhook');
    const data = await res.json();
    if (data.ip) piIP = data.ip;
  } catch {
    piIP = null;
  }
}

// Start updating periodically
updatePiIP();
setInterval(updatePiIP, 300000); // every 5 minutes

// Write data to Pi, fallback to Firebase
export async function writeData(refPath, value, firebaseRef) {
  if (piIP) {
    try {
      const res = await fetch(`${piIP}/db/${refPath}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      if (res.ok) return;  // Done
    } catch (err) {
      console.warn("Pi unavailable, falling back to Firebase");
    }
  }
  // Fallback
  await firebaseRef(refPath).set(value);
}

// Read data from Pi, fallback to Firebase
export async function readData(refPath, firebaseRef) {
  if (piIP) {
    try {
      const res = await fetch(`${piIP}/db/${refPath}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn("Pi unavailable, falling back to Firebase");
    }
  }
  // Fallback
  const snap = await firebaseRef(refPath).get();
  return snap.val();
}
