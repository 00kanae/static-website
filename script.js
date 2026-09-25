/* =========================
   LIVE DIGITAL CLOCK
========================= */

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    if (hours === 0) {
        hours = 12;
    }
    hours = String(hours).padStart(2, "0");

    const time = `${hours}:${minutes}:${seconds} ${period}`;
    document.getElementById("liveClock").textContent = time;

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    document.getElementById("dateDisplay").textContent =
        now.toLocaleDateString("en-US", dateOptions);
}

updateClock();
setInterval(updateClock, 1000);


/* =========================
   FOCUS COUNTDOWN
========================= */

const FOCUS_DURATION = 25 * 60;

let remainingSeconds = FOCUS_DURATION;
let focusInterval = null;

function updateTimerDisplay() {
    let remaining = remainingSeconds;

    const days = Math.floor(remaining / 86400);
    remaining %= 86400;

    const hours = Math.floor(remaining / 3600);
    remaining %= 3600;

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    document.getElementById("days").textContent = String(days).padStart(2, "0");
    document.getElementById("hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
    document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

function startFocusTimer() {
    if (focusInterval !== null) {
        return;
    }

    document.getElementById("timerStatus").textContent = "Focus session is running.";

    focusInterval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(focusInterval);
            focusInterval = null;
            document.getElementById("timerStatus").textContent = "Focus session complete. Nice work.";
        }
    }, 1000);
}

function resetFocusTimer() {
    clearInterval(focusInterval);
    focusInterval = null;
    remainingSeconds = FOCUS_DURATION;
    updateTimerDisplay();
    document.getElementById("timerStatus").textContent = "Timer reset. Ready when you are.";
}

document.getElementById("startFocus").addEventListener("click", startFocusTimer);
document.getElementById("resetFocus").addEventListener("click", resetFocusTimer);

updateTimerDisplay();


/* =========================
   INTERACTIVE RESET BUTTON
========================= */

const resetIdeas = [
    "Drink some water and take three slow breaths.",
    "Stand up and stretch for one minute.",
    "Put your phone down and look away from the screen.",
    "Write down the one task you want to finish.",
    "Clean one small part of your study area.",
    "Take a short walk before returning to your work.",
    "Close unnecessary tabs and simplify your workspace."
];

let resetIndex = 0;
let resetCount = 0;

document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("resetMessage").textContent = resetIdeas[resetIndex];

    resetIndex++;
    if (resetIndex >= resetIdeas.length) {
        resetIndex = 0;
    }

    resetCount++;
    document.getElementById("resetCounter").textContent = resetCount;
});


/* =========================
   DAILY CHECK-IN
========================= */

const checkInMessages = [
    "You don't need to have everything figured out.",
    "Start with one small task.",
    "A slow start is still a start.",
    "Give yourself a moment before continuing.",
    "Focus on what you can do next.",
    "You made it here. Now take the next step."
];

let checkInIndex = 0;

document.getElementById("checkinButton").addEventListener("click", () => {
    checkInIndex++;
    if (checkInIndex >= checkInMessages.length) {
        checkInIndex = 0;
    }

    document.getElementById("checkinMessage").textContent = checkInMessages[checkInIndex];
});