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

 let p = document.createElement("p");
 p.innerText = "TAMA KA NG DESISYON 🎉 \n CHAT MO KO KUNG ANO GUSTO MO 😉";
  p.style.fontSize = "2rem";
  p.style.fontWeight = "bold";
  p.style.textAlign = "center";
  p.style.position = "absolute";
  p.style.top = "50%";
  p.style.left = "50%";
  p.style.transform = "translate(-50%, -50%)";
  document.body.appendChild(p);


  // 1. Create the iframe element
const iframe = document.createElement("iframe");

// 2. Set the Google Form URL (Note: I fixed the closing quote and added embedded=true)
iframe.src = "https://docs.google.com/forms/d/e/1FAIpQLSe4rOBXd0n6uENLvonJnUKi1AjEjxfXi-gtUs7TBCWutn-kng/viewform?embedded=true";

// 3. Style it so it looks good
iframe.style.position = "absolute";
iframe.style.top = "60%"; // Adjusted so it doesn't cover your text
iframe.style.left = "50%";
iframe.style.transform = "translateX(-50%)";
iframe.style.width = "80%";
iframe.style.height = "400px";
iframe.style.border = "none";
iframe.style.zIndex = "1001"; // Put it above the confetti

// 4. Add it to the page
document.body.appendChild(iframe);

});
