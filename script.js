// ============================================
// NIGHTSHIFT JAVASCRIPT
// ============================================


// --------------------------------------------
// 1. LIVE DIGITAL CLOCK
// --------------------------------------------

function updateClock() {

    const now = new Date();

    const clock = document.getElementById("liveClock");
    const dateDisplay = document.getElementById("dateDisplay");

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
        hours = 12;
    }

    hours = String(hours).padStart(2, "0");

    clock.textContent =
        `${hours}:${minutes}:${seconds} ${period}`;

    const dateOptions = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    };

    dateDisplay.textContent =
        now.toLocaleDateString("en-US", dateOptions);
}

updateClock();

setInterval(updateClock, 1000);


// --------------------------------------------
// 2. FOCUS COUNTDOWN TIMER
// --------------------------------------------

const FOCUS_DURATION = 25 * 60;

let remainingSeconds = FOCUS_DURATION;

let countdownInterval = null;

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const timerStatus = document.getElementById("timerStatus");

const startFocusButton =
    document.getElementById("startFocus");

const resetFocusButton =
    document.getElementById("resetFocus");


function updateCountdownDisplay() {

    const days = Math.floor(
        remainingSeconds / 86400
    );

    const hours = Math.floor(
        (remainingSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (remainingSeconds % 3600) / 60
    );

    const seconds =
        remainingSeconds % 60;


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(seconds).padStart(2, "0");
}


function startCountdown() {

    if (countdownInterval !== null) {
        return;
    }

    timerStatus.textContent =
        "Focus session is running...";

    countdownInterval = setInterval(() => {

        if (remainingSeconds <= 0) {

            clearInterval(countdownInterval);

            countdownInterval = null;

            timerStatus.textContent =
                "Session complete. Nice work!";

            return;
        }

        remainingSeconds--;

        updateCountdownDisplay();

    }, 1000);
}


function resetCountdown() {

    clearInterval(countdownInterval);

    countdownInterval = null;

    remainingSeconds = FOCUS_DURATION;

    updateCountdownDisplay();

    timerStatus.textContent =
        "Timer reset. Ready when you are.";
}


startFocusButton.addEventListener(
    "click",
    startCountdown
);

resetFocusButton.addEventListener(
    "click",
    resetCountdown
);

updateCountdownDisplay();


// --------------------------------------------
// 3. INTERACTIVE RESET BUTTON
// --------------------------------------------

const resetSuggestions = [

    "Close one tab that you no longer need.",

    "Write down the single task you want to finish next.",

    "Move your phone away from your immediate workspace.",

    "Take a short stretch before returning to your screen.",

    "Clear one small area around your study space.",

    "Drink some water, then return to your next task.",

    "Look away from the screen for a few seconds and reset your attention."
];


let resetIndex = 0;

let resetCount = 0;

const resetMessage =
    document.getElementById("resetMessage");

const resetCounter =
    document.getElementById("resetCounter");

const resetButton =
    document.getElementById("resetButton");


resetButton.addEventListener(
    "click",
    () => {

        resetMessage.textContent =
            resetSuggestions[resetIndex];

        resetIndex++;

        if (resetIndex >= resetSuggestions.length) {
            resetIndex = 0;
        }

        resetCount++;

        resetCounter.textContent =
            `Resets completed: ${resetCount}`;
    }
);


// --------------------------------------------
// 4. DAILY CHECK-IN
// --------------------------------------------

const checkinMessages = [

    "Choose one task and give it your full attention.",

    "Start with the easiest unfinished task.",

    "Remove one distraction before you begin.",

    "Spend five minutes organizing what needs to be done.",

    "Finish something small before opening another task.",

    "Take a breath. You can work through this one step at a time."
];


let checkinIndex = 0;

const checkinButton =
    document.getElementById("checkinButton");

const checkinMessage =
    document.getElementById("checkinMessage");


checkinButton.addEventListener(
    "click",
    () => {

        checkinMessage.textContent =
            checkinMessages[checkinIndex];

        checkinIndex++;

        if (checkinIndex >= checkinMessages.length) {
            checkinIndex = 0;
        }
    }
);