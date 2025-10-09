let seconds = 0;

const timer = setInterval(() => {
    seconds++;
    console.log(`Timer: ${seconds} second(s)`);

    // Optional: stop after 10 seconds
    if (seconds >= 10) {
        clearInterval(timer);
        console.log("Timer stopped.");
    }
}, 1000);
