let piAddress = null;

// Poll serverhook to get the latest Pi address every 30 seconds
async function updatePiAddress() {
    try {
        const res = await fetch("/current-pi-address.json"); // served from your site
        const data = await res.json();
        piAddress = data.pi_address || null;
    } catch (e) {
        console.log("Failed to get Pi address:", e);
        piAddress = null;
    }
    setTimeout(updatePiAddress, 30000);
}
updatePiAddress();

// Function to route data
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

    // Fallback: call existing site script for Firebase
    if (window.firebaseSend) {
        return window.firebaseSend(key, value);
    } else {
        console.error("No Firebase fallback available");
    }
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

    // Fallback
    if (window.firebaseGet) {
        return window.firebaseGet(key);
    } else {
        console.error("No Firebase fallback available");
    }
}
