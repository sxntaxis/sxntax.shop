let triesLeft = 5;
let lastTryTime = 0;
const messages = [
    "Better luck next time!",
    "You win a small prize!",
    "You hit the jackpot!",
    "Try again tomorrow!",
    "Not your day!"
];

function handleGacha() {
    const now = Date.now();
    
    // Reset tries if 1 hour has passed
    if (now - lastTryTime >= 3600000) {
        triesLeft = 5;
    }

    if (triesLeft > 0) {
        // Generate a random message
        const messageIndex = Math.floor(Math.random() * messages.length);
        const message = messages[messageIndex];

        // Update message on the screen
        document.getElementById("message").innerText = message;

        // Update tries left
        triesLeft--;
        document.getElementById("tries-left").innerText = `Tries left: ${triesLeft}`;

        // Update last try time
        lastTryTime = now;

        // Save to localStorage to persist tries and last try time
        localStorage.setItem("triesLeft", triesLeft);
        localStorage.setItem("lastTryTime", lastTryTime);
    } else {
        document.getElementById("message").innerText = "You've used all your tries! Come back later.";
    }
}

// Initialize the page with saved tries and last try time from localStorage
window.onload = function() {
    const savedTries = localStorage.getItem("triesLeft");
    const savedTime = localStorage.getItem("lastTryTime");

    if (savedTries && savedTime) {
        triesLeft = parseInt(savedTries);
        lastTryTime = parseInt(savedTime);
    }

    document.getElementById("tries-left").innerText = `Tries left: ${triesLeft}`;
};
