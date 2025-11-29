let piAddress = null;

async function updatePiAddress() {
    try {
        const res = await fetch("/current-pi");
        const data = await res.json();
        piAddress = data.pi_address || null;
    } catch (e) {
        console.log("Failed to fetch Pi address:", e);
        piAddress = null;
    }
    setTimeout(updatePiAddress, 30000); // refresh every 30s
}
updatePiAddress();

async function sendData(key, value) {
    if (piAddress) {
        try {
            const res = await fetch(`${piAddress}/db/${key}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value)
            });
            if (res.ok) return await res.json();
            throw new Error("Pi returned error");
        } catch (e) {
            console.log("Pi unreachable, falling back to Firebase:", e);
        }
    }

    // Fallback to Firebase script on page
    if (window.firebaseSend) return window.firebaseSend(key, value);
    console.error("No Firebase fallback available");
}

async function getData(key) {
    if (piAddress) {
        try {
            const res = await fetch(`${piAddress}/db/${key}`);
            if (res.ok) return await res.json();
            throw new Error("Pi returned error");
        } catch (e) {
            console.log("Pi unreachable, falling back to Firebase:", e);
        }
    }

    if (window.firebaseGet) return window.firebaseGet(key);
    console.error("No Firebase fallback available");
}
