// -------------------- Pi Wrapper --------------------

// The Pi’s IP will be updated from your Cloudflare Worker
let pi_ip = null;

// Periodically fetch the Pi's current IP
async function updatePiIP() {
  try {
    const res = await fetch('https://pet-paths.site/webhook');
    const data = await res.json();
    if (data.ip) pi_ip = data.ip;
  } catch (err) {
    pi_ip = null;
  }
}

// Run update immediately and every 5 minutes
updatePiIP();
setInterval(updatePiIP, 300000); // 300000 ms = 5 minutes

// Override Firebase write
window.writeData = async function(key, value) {
  if (pi_ip) {
    try {
      await fetch(`${pi_ip}/db/${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });
      return;
    } catch (err) {
      console.warn("Pi unavailable, falling back to Firebase");
    }
  }

  // Fallback to Firebase if Pi not available
  firebase.database().ref(key).set(value);
}

// Override Firebase read
window.readData = async function(key) {
  if (pi_ip) {
    try {
      const res = await fetch(`${pi_ip}/db/${key}`);
      return await res.json();
    } catch (err) {
      console.warn("Pi unavailable, falling back to Firebase");
    }
  }

  // Fallback to Firebase if Pi not available
  return (await firebase.database().ref(key).get()).val();
}

// Optional: automatically replace Firebase .set()/.get() calls
// For example, if you can update your code:
// Instead of firebase.database().ref('key').set(value) -> writeData('key', value)
// Instead of firebase.database().ref('key').get() -> readData('key')
