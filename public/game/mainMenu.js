//** Variables **********
//Background
var bubble;
var bubbleSprite = "images/environment/bubble.png";
var bubblePop2 = "images/environment/bubble2.png";
var bubblePop3 = "images/environment/bubble3.png";
var bubbleGroup;
var userMouse;

//** Preload *************
function preload() {
  //Bubbles
  bubbleIdle = loadAnimation(bubbleSprite);
  bubblePop = loadAnimation(bubblePop2, bubblePop3);
}

//** Setup *************
function setup() {
  $(".loaderWrapper").fadeOut(50, "linear");

  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("mainMenuDiv");
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  //Bubbles
  var numOfBubbles = window.innerWidth / 80;
  bubbleGroup = new Group();
  bubblePop.frameDelay = 5;
  for (i = 0; i < numOfBubbles; ++i) {
    let randomX = random(0, window.innerWidth * 1.2);
    let randomY = random(0, window.innerHeight);
    let bubbleY = random(-1, -3);
    let scaleX = random(0.3, 1.5);
    bubble = createSprite(randomX, randomY, 70, 70);
    bubble.timerOn = false;
    bubble.timer = 0;
    bubble.addAnimation("idle", bubbleIdle);
    bubble.addAnimation("pop", bubblePop);
    bubble.changeAnimation("idle");
    bubble.setVelocity(0, bubbleY);
    bubble.scale = scaleX;
    bubbleGroup.add(bubble);
  }
  userMouse = createSprite(0, 0, 0, 0);
} // function setup

//** Draw ****************
function draw() {
  background(color(144, 199, 247));

  userMouse.position.x = mouseX;
  userMouse.position.y = mouseY;

  // Bubbles
  var numOfBubbles = window.innerWidth / 80;
  for (i = 0; i < numOfBubbles; ++i) {
    if (bubbleGroup[i].timerOn) {
      bubbleGroup[i].timer += 1;
    }
    if (bubbleGroup[i].position.y < -300 || bubbleGroup[i].overlap(userMouse)) {
      bubbleGroup[i].timerOn = true;
      bubbleGroup[i].changeAnimation("pop");
    }
    if (bubbleGroup[i].timerOn && bubbleGroup[i].timer > 8) {
      bubbleGroup[i].remove();
      let randomX = random(0, window.innerWidth * 1.2);
      let randomY = random(window.innerHeight * 1.3, window.innerHeight);
      let bubbleY = random(-1, -3);
      let scaleX = random(0.3, 1.5);
      bubble = createSprite(randomX, randomY, 70, 70);
      bubble.timerOn = false;
      bubble.timer = 0;
      bubble.addAnimation("idle", bubbleIdle);
      bubble.addAnimation("pop", bubblePop);
      bubble.setVelocity(0, bubbleY);
      bubble.scale = scaleX;
      bubbleGroup.add(bubble);
    }
  }

  drawSprites();
} // function draw

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function play() {
  window.location = "play.html";
}

function aboutMe() {
  window.location = "aboutMe.html";
}

// Reference: https://codepen.io/shaikmaqsood/pen/XmydxJ
function copyToClipboard(element) {
  var $temp = $("<input>");
  var message = document.getElementById("emailCopiedMessage");
  message.style.display = "block";
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
