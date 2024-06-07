//** Variables **********
var numOfRipples;
var rainSprite = "images/environment/rain.png";
var rain;
var ripple2 = "images/environment/rain2.png";
var ripple3 = "images/environment/rain3.png";
var ripple4 = "images/environment/rain4.png";
var ripple5 = "images/environment/rain5.png";
var ripple6 = "images/environment/rain6.png";
var ripple7 = "images/environment/rain7.png";
var x = "images/environment/nothing.png";
var rainGroup;
var waterGradient = "images/environment/water.png";
var lilypad;
var lilypad1 = "images/environment/lilypad1.png";
var lilypad2 = "images/environment/lilypad2.png";
var emailMessageTimeout;

//** Preload *************
function preload() {
  waterBackground = loadImage(waterGradient);

  //Ripples
  rainAnimation = loadAnimation(rainSprite);
  rippleAnimation = loadAnimation(
    ripple2,
    ripple3,
    ripple4,
    ripple5,
    ripple6,
    ripple7,
    x,
    x,
    x
  );
  lilypadAnimation = loadAnimation(lilypad1, lilypad2);
}

//** Setup *************
function setup() {
  $(".loaderWrapper").fadeOut(400, "linear");

  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("mainMenuDiv");
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  document.getElementById("profilePic").setAttribute("draggable", false);
  document.getElementById("widgets").style.backgroundColor = "rgba(0,0,0,0.4)";
  document.getElementById("widgets").style.gridTemplateRows = "15px 30px 15px";

  // Ripples
  var numOfRipples = window.innerWidth / 25;
  rainGroup = new Group();
  rippleAnimation.frameDelay = 5;
  for (i = 0; i < numOfRipples; ++i) {
    let randomX = random(0, window.innerWidth * 1.2);
    let randomY = random(-400, 0);
    rain = createSprite(randomX, randomY, 300, 300);
    rain.rippleTimerOn = false;
    rain.rippleTimer = 0;
    rain.fallTimer = 0;
    rain.setVelocity(0, random(30, 40));
    rain.addAnimation("idle", rainAnimation);
    rain.scale = random(0.8, 0.9);
    rain.addAnimation("rippling", rippleAnimation);
    rainGroup.add(rain);
  }

  // Lilypads
  function createLilypads(num, startXRange, endXRange, startYRange, endYRange) {
    for (let i = 0; i < num; ++i) {
      let randomX = random(startXRange, endXRange);
      let randomY = random(startYRange, endYRange);
      let lilypad = createSprite(randomX, randomY, 550, 200);
      lilypad.scale = random(0.4, 0.5);
      lilypad.addAnimation("idle", lilypadAnimation);
    }
  }

  const numOfLilypadsBotLeft = window.innerWidth / 200;
  const numOfLilypadsBotRight = window.innerWidth / 200;
  const numOfLilypadsBot = window.innerWidth / 400;
  const numOfLilypadsTopLeft = window.innerWidth / 250;
  const numOfLilypadsTopRight = window.innerWidth / 250;
  const numOfLilypadsTop = window.innerWidth / 400;

  const leftXRange = [0, window.innerWidth / 6];
  const rightXRange = [(window.innerWidth * 5) / 6, window.innerWidth];
  const botYRange = [(window.innerHeight * 8) / 10, window.innerHeight];
  const centerXRange = [window.innerWidth / 6, (window.innerWidth * 5) / 6];
  const topSidesYRange = [-window.innerHeight / 10, window.innerHeight / 10];
  const topYRange = [-window.innerHeight / 10, window.innerHeight / 40];

  lilypadAnimation.frameDelay = 30;

  createLilypads(numOfLilypadsBotLeft, ...leftXRange, ...botYRange);
  createLilypads(numOfLilypadsBotRight, ...rightXRange, ...botYRange);
  createLilypads(numOfLilypadsBot, ...centerXRange, ...botYRange);

  createLilypads(numOfLilypadsTopLeft, ...leftXRange, ...topSidesYRange);
  createLilypads(numOfLilypadsTopRight, ...rightXRange, ...topSidesYRange);
  createLilypads(numOfLilypadsTop, ...centerXRange, ...topYRange);
} // function setup

//** Draw ****************
function draw() {
  background(waterBackground);

  // Ripples
  var numOfRipples = window.innerWidth / 25;
  for (i = 0; i < numOfRipples; ++i) {
    rainGroup[i].fallTimer += 1;
    if (rainGroup[i].fallTimer > random(0, window.innerHeight / 5)) {
      rainGroup[i].rippleTimerOn = true;
    }
    if (rainGroup[i].rippleTimerOn) {
      rainGroup[i].setVelocity(0, 0);
      rainGroup[i].changeAnimation("rippling");
      rainGroup[i].rippleTimer += 1;
    }
    if (
      rainGroup[i].rippleTimer > 35 ||
      rainGroup[i].position.y > window.innerHeight * 1.2
    ) {
      rainGroup[i].remove();
      let randomX = random(0, window.innerWidth * 1.2);
      let randomY = random(-400, 0);
      rain = createSprite(randomX, randomY, 300, 300);
      rain.rippleTimerOn = false;
      rain.rippleTimer = 0;
      rain.fallTimer = 0;
      rain.addAnimation("idle", rainAnimation);
      rain.scale = random(0.8, 0.9);
      rain.addAnimation("rippling", rippleAnimation);
      rain.setVelocity(0, random(30, 40));
      rainGroup.add(rain);
    }
  }

  drawSprites();
} // function draw

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function copyToClipboard(element) {
  const textToCopy = $(element).text();
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => {
      showEmailMessage();
    })
    .catch((err) => {
      console.error("Error copying text to clipboard:", err);
    });
}

function showEmailMessage() {
  document.getElementById("emailCopiedMessage").style.display = "block";
  clearTimeout(emailMessageTimeout);
  emailMessageTimeout = setTimeout(hideEmailMessage, 6000);
}

function hideEmailMessage() {
  document.getElementById("emailCopiedMessage").style.display = "none";
}

// reference: https://stackoverflow.com/questions/18032220/css-change-image-src-on-imghover
function hover(element) {
  element.setAttribute("src", "images/widgets/" + element.id + "2.png");
}

function unhover(element) {
  element.setAttribute("src", "images/widgets/" + element.id + "1.png");
}

function mainMenu() {
  window.location = "home.html";
}

function openResume() {
  window.open("../images/YanxinJiang_Resume.pdf");
}
