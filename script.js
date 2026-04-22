// 1. Your Firebase Configuration (Copy this from your Firebase Console)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/u/2/project/admire-91da1/database/admire-91da1-default-rtdb/data/~2F",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yes-button");

// Function to save response to Database
function saveResponse(choice) {
    const responseRef = database.ref('responses').push();
    responseRef.set({
        answer: choice,
        timestamp: Date.now()
    });
}

// "AYOKO" Button Logic
noButton.addEventListener("mouseover", () => {
    // Record that they TRIED to say no (optional, but funny)
    // saveResponse("Tried to click No"); 

    const x = Math.floor(Math.random() * (window.innerWidth - noButton.offsetWidth));
    const y = Math.floor(Math.random() * (window.innerHeight - noButton.offsetHeight));

    noButton.style.position = "absolute";
    noButton.style.left = `${x}px`;
    noButton.style.top = `${y}px`;
});

// If they actually manage to click "Ayoko"
noButton.addEventListener("click", () => {
    saveResponse("Ayoko");
    alert("Bakit ayaw mo?! ☕");
});

// "SIGE" Button Logic
yesButton.addEventListener("click", () => {
    saveResponse("Sige"); // <--- SAVE TO DATABASE

    var confettiElement = document.getElementById('confetti-canvas');
    var confettiSettings = { target: confettiElement, max: 729, size: 1, animate: true, props: ['circle', 'square', 'triangle', 'line'], colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]], clock: 25, rotate: true,start_from_edge: true, respawn: true };

    yesButton.style.display = "none";
    noButton.style.display = "none";
    document.getElementById("gif").style.display = "none";
    document.getElementById("main").style.display = "none";

    confettiElement.style.position = "absolute";
    confettiElement.style.top = "0";
    confettiElement.style.left = "0";
    confettiElement.style.width = "100%";
    confettiElement.style.height = "100%";
    confettiElement.style.zIndex = "1000";

    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    let p = document.createElement("p");
    p.innerText = "NICE TAMA KA NG DESISYON 🎉 \n SABIHAN MO KO KUNG ANO GUSTO MO!";
    p.style.cssText = "font-size: 2rem; font-weight: bold; text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1001;";
    document.body.appendChild(p);
});