// ----- Grab the things we need from the page -----
const audio     = document.getElementById("audio");
const welcome   = document.getElementById("welcome");
const letter    = document.getElementById("letter");
const yesScreen = document.getElementById("yes");
const openBtn   = document.getElementById("openBtn");
const backBtn   = document.getElementById("backBtn");
const yesBtn    = document.getElementById("yesBtn");
const noBtn     = document.getElementById("noBtn");
const noReply   = document.getElementById("noReply");
const musicBtn  = document.getElementById("musicBtn");

// ----- Show one screen and hide the others -----
function showScreen(screen){
  const all = [welcome, letter, yesScreen];
  all.forEach(function(s){ s.classList.remove("active"); });
  screen.classList.add("active");
  window.scrollTo(0, 0);
}

// ----- Open the letter (this click also starts the music) -----
openBtn.addEventListener("click", function(){
  audio.play().catch(function(){ /* browser blocked it, ignore */ });
  musicBtn.classList.add("show");
  showScreen(letter);
});

// ----- Back to the welcome screen -----
backBtn.addEventListener("click", function(){
  showScreen(welcome);
});

// ----- "Let me think" gets a gentle reply, and Yes grows a little -----
let thinkCount = 0;
noBtn.addEventListener("click", function(){
  thinkCount++;
  noReply.textContent = "Take all the time you need. I will be right here.";
  yesBtn.style.transform = "scale(" + (1 + thinkCount * 0.12) + ")";
});

// ----- She said yes! -----
yesBtn.addEventListener("click", function(){
  showScreen(yesScreen);
  musicBtn.classList.add("show");
  for (let i = 0; i < 30; i++){
    setTimeout(makeHeart, i * 150);
  }
});

function makeHeart(){
  const heart = document.createElement("span");
  heart.className = "heart";
  heart.textContent = "❦";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 20) + "px";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  document.body.appendChild(heart);
  setTimeout(function(){ heart.remove(); }, 9000);
}

// ----- Music button: pause / play -----
musicBtn.addEventListener("click", function(){
  if (audio.paused){
    audio.play();
    musicBtn.classList.remove("paused");
  } else {
    audio.pause();
    musicBtn.classList.add("paused");
  }
});
