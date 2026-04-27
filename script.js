// Firebase configuration (from Firebase Console)
const firebaseConfig = {
 apiKey: "AIzaSyDKN5XrypQZ4IpABMeCUSXEpheREHOiXNw",
  authDomain: "admire-91da1.firebaseapp.com",
  databaseURL: "https://admire-91da1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admire-91da1",
  storageBucket: "admire-91da1.firebasestorage.app",
  messagingSenderId: "898670519968",
  appId: "1:898670519968:web:c59c0ef44cb9cbe9630bc5",
  measurementId: "G-2CM4KMW8SD"
};

// Initialize Firebase
let database;
if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
  console.log("✅ Firebase initialized successfully");
} else {
  console.error("❌ Firebase SDK not loaded!");
}

// Get the "No" button element
const noButton = document.getElementById("no-button");

// Add a mouseover event listener to move the "No" button randomly
noButton.addEventListener("mouseover", () => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);

  // Restrict the "No" button's movement within the bounds of the screen
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;
  const maxX = window.innerWidth - buttonWidth;
  const maxY = window.innerHeight - buttonHeight;
  const adjustedX = x < maxX ? x : maxX;
  const adjustedY = y < maxY ? y : maxY;

  // Apply the new position to the button
  noButton.style.position = "absolute";
  noButton.style.left = `${adjustedX}px`;
  noButton.style.top = `${adjustedY}px`;
});

// Get the "Yes" button element
const yesButton = document.getElementById("yes-button");

// Add a click event listener to create confetti
yesButton.addEventListener("click", () => {
  
var confettiElement = document.getElementById('confetti-canvas');
var confettiSettings = { target: confettiElement, max: 729, size: 1, animate: true, props: ['circle', 'square', 'triangle', 'line'], colors: [[165,104,246],[230,61,135],[0,199,228],[253,214,126]], clock: 25, rotate: true,start_from_edge: true, respawn: true };

yesButton.style.display = "none";
noButton.style.display = "none";

var gif = document.getElementById("gif");
var header = document.getElementById("main");
header.style.display = "none";
gif.style.display = "none";

//change the style of the confetti canvas
confettiElement.style.position = "absolute";
confettiElement.style.top = "0";
confettiElement.style.left = "0";
confettiElement.style.width = "100%";
confettiElement.style.height = "100%";
confettiElement.style.zIndex = "1000";


var confetti = new ConfettiGenerator(confettiSettings);

confetti.render();

 // Save to Firebase Realtime Database
 if (!database) {
   console.error("❌ Database not initialized!");
   return;
 }
 
 console.log("🔄 Attempting to save to Firebase...");
 console.log("Database object:", database);
 
 const responsesRef = database.ref('responses');
 console.log("Responses ref:", responsesRef);
 
 responsesRef.push({
   answer: "Yes",
   Date: new Date(Date.now()).toISOString(),
 }).then(() => {
   console.log("✅ Response saved to Firebase!");
 }).catch((error) => {
   console.error("❌ Error saving response:", error);
   console.error("Error code:", error.code);
   console.error("Error message:", error.message);
 });

 let p = document.createElement("p");
 p.innerText = "Nice san mo gusto?";
  p.style.fontSize = "2rem";
  p.style.fontWeight = "bold";
  p.style.textAlign = "center";
  p.style.position = "absolute";
  p.style.top = "50%";
  p.style.left = "50%";
  p.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(p);
});