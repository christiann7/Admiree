import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKN5XrypQZ4IpABMeCUSXEpheREHOiXNw",
    authDomain: "admire-91da1.firebaseapp.com",
    // ADD THIS EXACT LINE BELOW:
    databaseURL: "https://admire-91da1-default-rtdb.asia-southeast1.firebasedatabase.app", 
    projectId: "admire-91da1",
    storageBucket: "admire-91da1.firebasestorage.app",
    messagingSenderId: "898670519968",
    appId: "1:898670519968:web:c59c0ef44cb9cbe9630bc5",
    measurementId: "G-2CM4KMW8SD"
};;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yes-button");

// Function to save response to Database
function recordResponse(choice) {
    const responsesRef = ref(database, 'responses');
    const newResponseRef = push(responsesRef);
    set(newResponseRef, {
        answer: choice,
        timestamp: new Date().toLocaleString()
    });
}

// --- AYOKO BUTTON LOGIC ---
// Keep moving randomly on mouseover
noButton.addEventListener("mouseover", () => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;
    const adjustedX = x < maxX ? x : maxX;
    const adjustedY = y < maxY ? y : maxY;

    noButton.style.position = "absolute";
    noButton.style.left = `${adjustedX}px`;
    noButton.style.top = `${adjustedY}px`;
});

// Log to database if they actually manage to click it
noButton.addEventListener("click", () => {
    recordResponse("Ayoko");
    alert("Bakit ayaw mo?! 🥺");
});

// --- SIGE BUTTON LOGIC ---
yesButton.addEventListener("click", () => {
    recordResponse("Sige");

    // Hide original UI
    yesButton.style.display = "none";
    noButton.style.display = "none";
    document.getElementById("gif").style.display = "none";
    document.getElementById("main").style.display = "none";

    // Setup Confetti
    const confettiElement = document.getElementById('confetti-canvas');
    confettiElement.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; z-index:1000;";

    const confettiSettings = { 
        target: confettiElement, 
        max: 729, 
        size: 1, 
        animate: true, 
        props: ['circle', 'square', 'triangle', 'line'], 
        colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]], 
        clock: 25, 
        rotate: true,
        start_from_edge: true, 
        respawn: true 
    };

    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    // Show Success Message
    let p = document.createElement("p");
    p.innerText = "NICE TAMA KA NG DESISYON 🎉 \n SABIHAN MO KO KUNG ANO GUSTO MO!";
    p.style.cssText = `
        font-size: 2rem; 
        font-weight: bold; 
        text-align: center; 
        position: absolute; 
        top: 50%; 
        left: 50%; 
        transform: translate(-50%, -50%); 
        z-index: 1001; 
        font-family: sans-serif;
    `;
    document.body.appendChild(p);
});