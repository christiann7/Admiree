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

let database;
if (typeof firebase !== "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
  console.log("✅ Firebase initialized successfully");
} else {
  console.error("❌ Firebase SDK not loaded!");
}

const noButton = document.getElementById("no-button");
const yesButton = document.getElementById("yes-button");
const formContainer = document.getElementById("details-form-container");
const detailsForm = document.getElementById("details-form");
const formMessage = document.getElementById("form-message");
const nameInput = document.getElementById("name");
const placeInput = document.getElementById("place");
const dateInput = document.getElementById("travel-date");

async function saveResponse(payload) {
  if (database) {
    const responsesRef = database.ref("responses");
    return responsesRef.push(payload);
  }

  const response = await fetch(`${firebaseConfig.databaseURL}/responses.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

if (noButton) {
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
}

if (detailsForm) {
  detailsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const place = placeInput.value.trim();
    const travelDate = dateInput ? dateInput.value : "";

    if (!name || !place || !travelDate) {
      formMessage.textContent = "Please enter your name, place, and preferred date.";
      formMessage.style.color = "#e74c3c";
      return;
    }

    if (!database) {
      formMessage.textContent = "Firebase is not ready yet.";
      formMessage.style.color = "#e74c3c";
      return;
    }

    saveResponse({
      answer: "Yes",
      name,
      place,
      travelDate,
      createdAt: Date.now()
    })
      .then(() => {
        formMessage.textContent = "Saved! Thank you.";
        formMessage.style.color = "#2ecc71";
        detailsForm.reset();
      })
      .catch((error) => {
        console.error("❌ Error saving response:", error);
        formMessage.textContent = "Something went wrong while saving.";
        formMessage.style.color = "#e74c3c";
      });
  });
}

if (yesButton) {
  yesButton.addEventListener("click", () => {
    const confettiElement = document.getElementById("confetti-canvas");
    const confettiSettings = {
      target: confettiElement,
      max: 729,
      size: 1,
      animate: true,
      props: ["circle", "square", "triangle", "line"],
      colors: [[165, 104, 246], [230, 61, 135], [0, 199, 228], [253, 214, 126]],
      clock: 25,
      rotate: true,
      start_from_edge: true,
      respawn: true
    };

    yesButton.style.display = "none";
    noButton.style.display = "none";

    const gif = document.getElementById("gif");
    const header = document.getElementById("main");
    if (header) header.style.display = "none";
    if (gif) gif.style.display = "none";

    if (confettiElement) {
      confettiElement.style.position = "fixed";
      confettiElement.style.top = "0";
      confettiElement.style.left = "0";
      confettiElement.style.width = "100%";
      confettiElement.style.height = "100%";
      confettiElement.style.zIndex = "0";
      confettiElement.style.pointerEvents = "none";
    }

    if (typeof ConfettiGenerator !== "undefined") {
      const confetti = new ConfettiGenerator(confettiSettings);
      confetti.render();
    }

    if (formContainer) {
      formContainer.classList.remove("hidden");
      formContainer.style.display = "block";
      formContainer.style.position = "relative";
      formContainer.style.zIndex = "20";
    }
  });
}