//** Variables **********
import * as variables from "./playVariables.js";

//Background
var gradientRange = 80;

// Player Animation
var player;
var playerIdle;
var playerRun;
var lastKeyMovement = "";
var defaultMoveSpeed = 6.5;
var moveSpeed = defaultMoveSpeed;
var jump = false;
var moved = false;
var keyPressDetected = false;
var lastKeyPress = "";
var mobileLeftDown = false;
var mobileRightDown = false;

// Characters
var yanxin;
var yanxinIdle;

// Text
var yanxinInteract = false;
var typeWriterComplete = false;
var yanxinScript = "";
var firstGreeting = true;
var greetingUsed = true;
var cursorIndex = 0;
var chatTimer = 0;
var teleporterHoverTimer = 0;
var hoverAmnt = 0;
var yanxinChatBoxLength;
var yanxinChatBoxHeight;
var yanxinChatBoxHover;
var yanxinTextLength;
var yanxinTextHover;
var yanxinTypeWriterHover;
var yanxinCustomX;

// Sounds
var snd_windyPetals;
var continueSound = false;
var soundInitialCheck = false;
var maxVolume = 0.6;
var currentVolume = 0;
var volumeIncrement = 0.1;

// Environment
var numOfPlatforms = 80;
var platformsGroup;
var middlePlatform; // where camera snaps to following player
var firstInteractionPlatform; // first interaction with yanxin
var endPlatform; // where world stops
var groundTopLeft;
var groundBottomLeft;
var groundTop;
var groundBot;
var grassBlockFrames;
var dirtBlockFrames;
var petal;
var petalsGroup;
var pinkPetalFrames;
var grassblade;
var grassBladeFrames;
// Teleporters
var teleporters = [];
var whiteTpFrames;
var beginningTp;
var beginningSection;
var threeDTp;
var threeDSection;
var uiUxTp;
var greenTpFrames;
var uiUxSection;
var gameTp;
var redTpFrames;
var gameSection;
var purpleTpFrames;
var tpLabelTextHeight = 80;
var tpLabelChatboxHover = tpLabelTextHeight + 8;
var tpInteractTextHover = 115;

// Slides
var currentSlideNum = 0;
var dotCount = 0;
var currentSlides = [];
var dotUpdated = false;
var newSlides = true;
var newSlide = true;

// Projects
var projects = [];
var pypelineFrames;
var floatItFrames;
var roomFrames;
var inertiaFrames;
var askAppsFrames;
// var acornStationFrames;
var outcastFrames;
var missileCommandFrames;
var wizardsJourneyFrames;
var tantrumFrames;
var studyRoomFrames;
var raygunFrames;

// Slideshow
var slideShowing = false;
var expandedImageShowing = false;

//** Preload *************
function preload() {
  // Player Animations
  playerIdle = loadAnimation(
    variables.playerIdle1,
    variables.playerIdle2,
    variables.playerIdle1,
    variables.playerIdle3,
    variables.playerIdle1,
    variables.playerIdle3
  );
  playerRun = loadAnimation(
    variables.playerRun1,
    variables.playerRun2,
    variables.playerRun3,
    variables.playerRun2,
    variables.playerRun1,
    variables.playerRun4,
    variables.playerRun3,
    variables.playerRun2
  );

  // Characters
  yanxinIdle = loadAnimation(
    variables.yanxinIdle1,
    variables.yanxinIdle2,
    variables.yanxinIdle1,
    variables.yanxinIdle3,
    variables.yanxinIdle1,
    variables.yanxinIdle3
  );

  // Sounds
  snd_windyPetals = loadSound(variables.snd_windyPetals);

  // Environment
  grassBlockFrames = loadImage(variables.grassBlock1);
  dirtBlockFrames = loadImage(variables.dirtBlock1);
  pinkPetalFrames = loadImage(variables.petal1);
  grassBladeFrames = loadAnimation(
    variables.grassBlade1,
    variables.grassBlade2,
    variables.grassBlade3,
    variables.grassBlade2
  );
  whiteTpFrames = loadAnimation(
    variables.whiteTp1,
    variables.whiteTp2,
    variables.whiteTp3
  );
  greenTpFrames = loadAnimation(
    variables.greenTp1,
    variables.greenTp2,
    variables.greenTp3
  );
  redTpFrames = loadAnimation(
    variables.redTp1,
    variables.redTp2,
    variables.redTp3
  );
  purpleTpFrames = loadAnimation(
    variables.purpleTp1,
    variables.purpleTp2,
    variables.purpleTp3
  );

  // UX/UI
  pypelineFrames = loadImage(variables.pypeline1);
  floatItFrames = loadAnimation(
    variables.floatIt1,
    variables.floatIt2,
    variables.floatIt3,
    variables.floatIt4
  );
  roomFrames = loadAnimation(
    variables.room1,
    variables.room2,
    variables.room3,
    variables.room2
  );
  inertiaFrames = loadAnimation(
    variables.inertia1,
    variables.inertia2,
    variables.inertia3,
    variables.inertia4
  );
  askAppsFrames = loadAnimation(
    variables.askApps1,
    variables.askApps2,
    variables.askApps3,
    variables.askApps4
  );
  // acornStationFrames = loadImage(variables.acorn1);

  // Game
  outcastFrames = loadAnimation(
    variables.outcast1,
    variables.outcast1,
    variables.outcast1,
    variables.outcast2
  );
  missileCommandFrames = loadAnimation(
    variables.missileCommand1,
    variables.missileCommand2,
    variables.missileCommand3
  );
  wizardsJourneyFrames = loadAnimation(
    variables.wizardsJourney1,
    variables.wizardsJourney2,
    variables.wizardsJourney3,
    variables.wizardsJourney4
  );

  // 3D Modeling + Animation
  tantrumFrames = loadImage(variables.tantrum1);
  studyRoomFrames = loadAnimation(variables.studyRoom1, variables.studyRoom2);
  raygunFrames = loadImage(variables.raygun1);
} // function preload

//** Setup *************
function setup() {
  $(".loaderWrapper").fadeOut(400, "linear");

  var canvas = createCanvas(window.innerWidth, window.innerHeight);
  canvas.parent("field-div");
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  document.getElementById("onIcon").setAttribute("draggable", false);
  document.getElementById("offIcon").setAttribute("draggable", false);
  document.getElementById("slides").setAttribute("draggable", false);
  document.getElementById("backToTeleportersLink").style.backgroundColor =
    "#0000004D";
  document.getElementById("widgets").style.backgroundColor = "#0000004D";
  document.getElementById("welcomeMessage").style.backgroundColor = "#0000004D";

  // Platforms
  platformsGroup = new Group();
  for (let i = 0; i < numOfPlatforms; ++i) {
    // top layer
    groundTop = createSprite(i * 99, window.innerHeight - 100, 100, 100);
    groundTop.addImage(grassBlockFrames);
    platformsGroup.add(groundTop);
  }
  for (let i = 0; i < 2; ++i) {
    // top layer left
    groundTopLeft = createSprite(i * -99, window.innerHeight - 100, 100, 100);
    groundTopLeft.addImage(grassBlockFrames);
  }
  for (let i = 0; i < numOfPlatforms; ++i) {
    // bottom layer
    groundBot = createSprite(i * 99, window.innerHeight, 100, 100);
    groundBot.addImage(dirtBlockFrames);
  }
  for (let i = 0; i < 2; ++i) {
    // top layer left
    groundBottomLeft = createSprite(i * -99, window.innerHeight, 100, 100);
    groundBottomLeft.addImage(dirtBlockFrames);
  }
  middlePlatform = floor(window.innerWidth / 2 / 100);

  // Characters
  yanxinIdle.frameDelay = 18;

  yanxin = createSprite(
    platformsGroup[firstInteractionPlatform].position.x,
    window.innerHeight - 200,
    100,
    100
  );
  yanxin.addAnimation("idle", yanxinIdle);

  // Text
  textSize(18);
  fill(255);
  textAlign(LEFT);
  textFont("silkscreennormal");

  // Teleporters
  beginningSection = platformsGroup[firstInteractionPlatform + 1].position.x;
  uiUxSection = platformsGroup[firstInteractionPlatform + 10].position.x;
  gameSection = platformsGroup[firstInteractionPlatform + 27].position.x;
  threeDSection = platformsGroup[firstInteractionPlatform + 37].position.x;

  beginningTp = createTp({
    frames: whiteTpFrames,
    positionIndex: firstInteractionPlatform + 49,
    destination: beginningSection + 40,
  });
  uiUxTp = createTp({
    frames: greenTpFrames,
    positionIndex: firstInteractionPlatform + 3,
    destination: uiUxSection + 80,
  });
  gameTp = createTp({
    frames: redTpFrames,
    positionIndex: firstInteractionPlatform + 5,
    additionalOffsetX: 10,
    destination: gameSection + 80,
  });
  threeDTp = createTp({
    frames: purpleTpFrames,
    positionIndex: firstInteractionPlatform + 7,
    additionalOffsetX: 30,
    destination: threeDSection + 80,
  });

  // Projects
  // UX/UI Design
  createProject({
    name: "Pypeline",
    groupSection: uiUxSection,
    groupOffsetX: 250,
    slides: variables.pypelineSlides,
    aboutTitles: variables.pypelineTitles,
    aboutDescriptions: variables.pypelineDescriptions,
    frames: pypelineFrames,
    frameDelay: 0,
    width: 183,
    height: 168,
  });
  createProject({
    name: "Float-it Notes",
    groupSection: uiUxSection,
    groupOffsetX: 560,
    slides: variables.floatItSlides,
    aboutTitles: variables.floatItTitles,
    aboutDescriptions: variables.floatItDescriptions,
    frames: floatItFrames,
    frameDelay: 15,
    width: 199,
    height: 136,
  });
  createProject({
    name: "Room",
    groupSection: uiUxSection,
    groupOffsetX: 850,
    slides: variables.roomSlides,
    aboutTitles: variables.roomTitles,
    aboutDescriptions: variables.roomDescriptions,
    frames: roomFrames,
    frameDelay: 20,
    width: 161,
    height: 141,
  });
  createProject({
    name: "Inertia",
    groupSection: uiUxSection,
    groupOffsetX: 1140,
    slides: variables.inertiaSlides,
    aboutTitles: variables.inertiaTitles,
    aboutDescriptions: variables.inertiaDescriptions,
    frames: inertiaFrames,
    frameDelay: 25,
    width: 176,
    height: 118,
  });
  createProject({
    name: "Ask Applications Web Design Internship",
    groupSection: uiUxSection,
    groupOffsetX: 1440,
    slides: variables.askAppsSlides,
    aboutTitles: variables.askAppsTitles,
    aboutDescriptions: variables.askAppsDescriptions,
    frames: askAppsFrames,
    frameDelay: 20,
    width: 154,
    height: 140,
  });
  // createProject({
  //   name: "Acorn",
  //   groupSection: uiUxSection,
  //   groupOffsetX: 1420,
  //   slides: variables.acornSlides,
  //   aboutTitles: variables.acornTitles,
  //   aboutDescriptions: variables.acornDescriptions,
  //   frames: acornStationFrames,
  //   frameDelay: 0,
  //   width: 267,
  //   height: 142,
  // });
  // Game
  createProject({
    name: "Outcast",
    groupSection: gameSection,
    groupOffsetX: 250,
    slides: variables.outcastSlides,
    aboutTitles: variables.outcastTitles,
    aboutDescriptions: variables.outcastDescriptions,
    frames: outcastFrames,
    frameDelay: 8,
    width: 99,
    height: 134,
  });
  createProject({
    name: "Missile Command Clone",
    groupSection: gameSection,
    groupOffsetX: 520,
    slides: variables.missileCommandSlides,
    aboutTitles: variables.missileCommandTitles,
    aboutDescriptions: variables.missileCommandCloneDescriptions,
    frames: missileCommandFrames,
    frameDelay: 8,
    width: 72,
    height: 113,
  });
  createProject({
    name: "Wizard's Journey",
    groupSection: gameSection,
    groupOffsetX: 790,
    slides: variables.wizardsJourneySlides,
    aboutTitles: variables.wizardsJourneyTitles,
    aboutDescriptions: variables.wizardsJourneyDescriptions,
    frames: wizardsJourneyFrames,
    frameDelay: 10,
    width: 90,
    height: 113,
  });
  // 3D Animation + Modeling
  createProject({
    name: "Tantrum",
    groupSection: threeDSection,
    groupOffsetX: 250,
    slides: variables.tantrumSlides,
    aboutTitles: variables.tantrumTitles,
    aboutDescriptions: variables.tantrumDescriptions,
    frames: tantrumFrames,
    frameDelay: 0,
    width: 83,
    height: 150,
  });
  createProject({
    name: "Home Office",
    groupSection: threeDSection,
    groupOffsetX: 520,
    slides: variables.studyRoomSlides,
    aboutTitles: variables.studyRoomTitles,
    aboutDescriptions: variables.studyRoomDescriptions,
    frames: studyRoomFrames,
    frameDelay: 25,
    width: 133,
    height: 212,
  });
  createProject({
    name: "Raygun",
    groupSection: threeDSection,
    groupOffsetX: 790,
    slides: variables.raygunSlides,
    aboutTitles: variables.raygunTitles,
    aboutDescriptions: variables.raygunDescriptions,
    frames: raygunFrames,
    frameDelay: 0,
    width: 204,
    height: 130,
  });

  // Player Animations
  playerIdle.frameDelay = 18;
  playerRun.frameDelay = 12;

  player = createSprite(
    platformsGroup[2].position.x,
    window.innerHeight - 200,
    100,
    100
  );
  player.addAnimation("idle", playerIdle);
  player.addAnimation("run", playerRun);

  // Environment
  // Petals
  var numOfPetals = window.innerWidth / 80;
  petalsGroup = new Group();
  for (let i = 0; i < numOfPetals; ++i) {
    let randomX = random(0, window.innerWidth * 1.2);
    let randomY = random(0, window.innerHeight);
    let petalX = random(-0.2, -1);
    let petalY = random(1.5, 3.5);
    let petalRotation = random(0, 4);
    let scaleX = random(0.8, 1);
    petal = createSprite(randomX, randomY, 14, 14);
    petal.addImage(pinkPetalFrames);
    petal.rotation = random(0, 360);
    petal.setVelocity(petalX, petalY);
    petal.rotationSpeed = petalRotation;
    petal.scale = scaleX;
    petalsGroup.add(petal);
  }

  // Grassblades
  grassBladeFrames.frameDelay = 18;
  var numOfGrassblades = floor(numOfPlatforms / 1.85);
  for (let i = 0; i < numOfGrassblades; ++i) {
    let randomX = random(0, numOfPlatforms * 100);
    grassblade = createSprite(randomX, window.innerHeight - 162);
    grassblade.addAnimation("idle", grassBladeFrames);
  }
} // function setup

//** Draw ****************
function draw() {
  background(color(134, 193, 239));
  teleporterHoverTimer++;

  if (deviceType() == "desktop") {
    // Desktop
    // Welcome/movement for desktop
    document.getElementById("welcomeMessageMobile").style.display = "none";
  } else {
    // Mobile
    // Welcome/movement for mobile
    document.getElementById("welcomeMessageDesktop").style.display = "none";
  }
  // Positioning of ground for different heights
  if (window.innerHeight < 300) {
    camera.position.y = 25;
  } else if (window.innerHeight < 400) {
    camera.position.y = 90;
  } else if (window.innerHeight < 450) {
    camera.position.y = 150;
  }

  // Player Movements
  player.velocity.x = 0;
  player.velocity.y += 0.85;
  player.changeAnimation("idle");
  if (lastKeyMovement == "right") {
    if (moved == false) {
      moved = true;
    }
    player.mirrorX(1);
  } else if (lastKeyMovement == "left") {
    if (moved == false) {
      moved = true;
    }
    player.mirrorX(-1);
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68) || mobileRightDown) {
    if (moved == false) {
      moved = true;
    }
    lastKeyMovement = "right";
    player.changeAnimation("run");
    player.velocity.x = moveSpeed;
  } else if (keyIsDown(LEFT_ARROW) || keyIsDown(65) || mobileLeftDown) {
    if (moved == false) {
      moved = true;
    }
    lastKeyMovement = "left";
    player.changeAnimation("run");
    player.velocity.x = -moveSpeed;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87) || keyIsDown(32)) {
    if (moved == false) {
      moved = true;
    }
    if (!jump) {
      player.changeAnimation("idle");
      player.velocity.y = -16;
      jump = true;
    }
    lastKeyMovement = "up";
  }
  if (moved == true) {
    welcomeMessageFade();
  }

  // Mobile Keys
  // Movement
  document.getElementById("mobileLeft").addEventListener("touchstart", () => {
    mobileLeftDown = true;
    if (yanxinInteract) {
      yanxinInteract = false;
    }
  });
  document.getElementById("mobileLeft").addEventListener("touchend", () => {
    mobileLeftDown = false;
  });
  document.getElementById("mobileRight").addEventListener("touchstart", () => {
    mobileRightDown = true;
    if (yanxinInteract) {
      yanxinInteract = false;
    }
  });
  document.getElementById("mobileRight").addEventListener("touchend", () => {
    mobileRightDown = false;
  });

  // Camera
  if (player.position.x >= platformsGroup[middlePlatform].position.x) {
    // snaps camera onto player
    camera.position.x = player.position.x;
  }
  if (player.position.x >= platformsGroup[endPlatform].position.x) {
    // camera stops moving player at end
    camera.position.x = platformsGroup[endPlatform].position.x;
  }

  // Characters
  yanxin.changeAnimation("idle");
  yanxin.mirrorX(-1);

  if (player.position.x > yanxin.position.x) {
    // Faces player at all times)
    yanxin.mirrorX(1);
  }
  if (abs(yanxin.position.x - player.position.x) <= 130) {
    handleYanxinInteraction();
  }

  if (
    player.position.x <
      platformsGroup[firstInteractionPlatform + 3].position.x ||
    slideShowing
  ) {
    // Hide "Back to Teleporters" button when user hasn't passed it yet or in slideshow mode
    document.getElementById("backToTeleportersLink").style.visibility =
      "hidden";
    document.getElementById("backToTeleportersLink").style.opacity = "0";
  } else {
    document.getElementById("backToTeleportersLink").style.visibility =
      "visible";
    document.getElementById("backToTeleportersLink").style.opacity = "1";
  }

  if (slideShowing) {
    // Hide widgets + location labels in slideshow mode
    document.getElementById("widgets").style.visibility = "hidden";
    document.getElementById("widgets").style.opacity = "0";
    document.getElementById("locationMessage").style.visibility = "hidden";
    document.getElementById("locationMessage").style.opacity = "0";
  } else {
    // Else, show widgets and location messages
    document.getElementById("widgets").style.visibility = "visible";
    document.getElementById("widgets").style.opacity = "1";
    if (player.position.x >= uiUxSection) {
      document.getElementById("locationMessage").style.visibility = "visible";
      document.getElementById("locationMessage").style.opacity = "1";
      document.getElementById("locationMessage").style.backgroundColor =
        "#5A89AD";
    }
  }

  if (player.position.x >= threeDSection) {
    document.getElementById("locationMessage").innerHTML =
      "3D Modeling + Animation";
    document.getElementById("locationMessage").style.backgroundColor =
      "#D3D1FF";
    let startColor = color(148, 193, 234);
    let endColor = color(158, 187, 230);
    background(
      lerpColor(
        startColor,
        endColor,
        map(
          player.position.x - threeDSection,
          -gradientRange,
          gradientRange,
          0,
          1
        )
      )
    );
  } else if (player.position.x >= gameSection) {
    document.getElementById("locationMessage").innerHTML = "Game Design";
    document.getElementById("locationMessage").style.backgroundColor =
      "#FFD0CC";
    let startColor = color(135, 198, 221);
    let endColor = color(148, 193, 234);
    background(
      lerpColor(
        startColor,
        endColor,
        map(
          player.position.x - gameSection,
          -gradientRange,
          gradientRange,
          0,
          1
        )
      )
    );
  } else if (player.position.x >= uiUxSection) {
    document.getElementById("locationMessage").innerHTML = "UX/UI Design";
    document.getElementById("locationMessage").style.backgroundColor =
      "#BEE8CC";
    let startColor = color(134, 193, 239);
    let endColor = color(135, 198, 221);
    background(
      lerpColor(
        startColor,
        endColor,
        map(
          player.position.x - uiUxSection,
          -gradientRange,
          gradientRange,
          0,
          1
        )
      )
    );
  } else {
    document.getElementById("locationMessage").style.visibility = "hidden";
    document.getElementById("locationMessage").style.opacity = "0";
  }

  // Teleporters
  if (teleporterHoverTimer >= 20) {
    // hover effect for teleporter text
    hoverAmnt = 4;
    if (teleporterHoverTimer >= 60) {
      hoverAmnt = -4;
      teleporterHoverTimer = -20;
    }
  }
  // Teleporter Interactions
  handleTpInteraction({ targetTp: beginningTp });
  handleTpInteraction({ targetTp: uiUxTp });
  handleTpInteraction({ targetTp: gameTp });
  handleTpInteraction({ targetTp: threeDTp });

  // Back to Teleporters teleporter message
  chatBox({
    target: beginningTp,
    hover: tpLabelChatboxHover,
    length: 170,
    height: 60,
    alpha: 255,
    clr: "#DCDCDC",
    hoveramnt: hoverAmnt,
  });
  displayText({
    textContent: "Back to Teleporters",
    target: beginningTp,
    hover: tpLabelTextHeight,
    length: 120,
    custom: 5,
    color: 95,
    fontSize: 20,
    hoveramnt: hoverAmnt,
  });

  // Top banners for sections
  // UX/UI Design
  chatBox({
    target: uiUxTp,
    hover: tpLabelChatboxHover,
    length: 115,
    height: 60,
    alpha: 255,
    clr: "#BEE8CC",
    hoveramnt: hoverAmnt,
  });
  displayText({
    textContent: "UX/UI Design",
    target: uiUxTp,
    hover: tpLabelTextHeight,
    length: 160,
    custom: 5,
    color: "#0000008F",
    fontSize: 20,
    hoveramnt: hoverAmnt,
  });
  // Game
  chatBox({
    target: gameTp,
    hover: tpLabelChatboxHover,
    length: 115,
    height: 60,
    alpha: 255,
    clr: "#FFD0CC",
    hoveramnt: hoverAmnt,
  });
  displayText({
    textContent: "Game Design",
    target: gameTp,
    hover: tpLabelTextHeight,
    length: 150,
    custom: 5,
    color: "#0000008F",
    fontSize: 20,
    hoveramnt: hoverAmnt,
  });
  // 3D Modeling + Animation
  chatBox({
    target: threeDTp,
    hover: tpLabelChatboxHover,
    length: 180,
    height: 60,
    alpha: 255,
    clr: "#D3D1FF",
    hoveramnt: hoverAmnt,
  });
  displayText({
    textContent: "3D Modeling + Animation",
    target: threeDTp,
    hover: tpLabelTextHeight,
    length: 180,
    custom: 5,
    color: "#0000008F",
    fontSize: 20,
    hoveramnt: hoverAmnt,
  });

  // Project Interactions
  for (let i = 0; i < projects.length; i++) {
    handleProjectInteraction({ project: projects[i] });
  }

  // Platforms
  for (let i = 0; i < numOfPlatforms; i++) {
    if (
      platformsGroup[i].overlapPixel(player.position.x, player.position.y + 50)
    ) {
      player.position.y -= 1;
      player.velocity.y = 0;
      jump = false;
    }
  }
  if (player.position.x < 24) {
    // keeps player in screen
    player.position.x = 24;
  }
  if (player.position.x >= platformsGroup[endPlatform].position.x + 1) {
    // keeps player in screen
    player.position.x -= 6.5;
  }

  // Petals
  for (let i = 0; i < petalsGroup.length; ++i) {
    if (
      petalsGroup[i].position.x < player.position.x - window.innerWidth / 2 ||
      petalsGroup[i].position.y > window.innerHeight
    ) {
      petalsGroup[i].remove();
      let randomX = random(
        player.position.x - window.innerWidth / 2,
        player.position.x + window.innerWidth / 2 + 100
      );
      let randomY = random(-100, 0);
      let petalX = random(-0.75, -1.8);
      let petalY = random(1.5, 3.5);
      let petalRotation = random(0, 4);
      let scaleX = random(0.8, 1);
      petal = createSprite(randomX, randomY, 14, 14);
      petal.addImage(pinkPetalFrames);
      petal.rotation = random(0, 360);
      petal.setVelocity(petalX, petalY);
      petal.rotationSpeed = petalRotation;
      petal.scale = scaleX;
      petalsGroup.add(petal);
    }
  }
  drawSprites();
} // function draw

window.preload = preload;
window.setup = setup;
window.draw = draw;

// Widgets
// Home widget
document.getElementById("homeIcon").addEventListener("click", () => mainMenu());

function mainMenu() {
  window.location = "home.html";
}

// Sound widget
document
  .getElementById("soundIcon")
  .addEventListener("click", () => toggleSound());

function toggleSound() {
  var sound = document.getElementById("sound");
  if (sound.checked) {
    snd_windyPetals.play();
    snd_windyPetals.loop = true;
    fadeInSound();
  } else {
    snd_windyPetals.stop();
    currentVolume = 0;
  }
}

function fadeInSound() {
  if (currentVolume < maxVolume) {
    currentVolume += volumeIncrement;
    snd_windyPetals.setVolume(currentVolume);
    setTimeout(fadeInSound, 200); // Adjust the time interval as needed
  }
}

function welcomeMessageFade() {
  document.getElementById("welcomeMessage").style.opacity = "0";
}

// Text
function interactText({ textContent, target, hover }) {
  let TEXT_HEIGHT = 12;
  let PADDING = 12;
  let TEXT_SPACING = textWidth(" ");
  let KEY_SPACING_X = 8;
  let KEY_SPACING_Y = 6;

  // text height is wonky, we want it to be 18px
  textSize(TEXT_HEIGHT * 1.5);
  textAlign(LEFT);
  noStroke();

  let before = "Press";
  let key = "E";
  let after = textContent;

  let beforeWidth = textWidth(before);
  let keyWidth = textWidth(key);
  let afterWidth = textWidth(after);

  let totalWidth =
    PADDING +
    beforeWidth +
    TEXT_SPACING +
    KEY_SPACING_X +
    keyWidth +
    KEY_SPACING_X +
    TEXT_SPACING +
    afterWidth +
    PADDING;

  let totalHeight = PADDING + TEXT_HEIGHT + PADDING;

  let rectX = target.position.x - totalWidth / 2;
  let rectY = target.position.y - hover - totalHeight;

  // speech bubble
  fill(0, 0, 0, 50);
  rect(rectX, rectY, totalWidth, totalHeight, 4);

  let cursorX = rectX + PADDING;
  let textY = target.position.y - hover - PADDING;

  // "Press" text
  fill(255, 255, 255);
  text(before, cursorX, textY);
  cursorX += beforeWidth + TEXT_SPACING;

  // E Key
  fill(0, 0, 0, 96);
  rect(
    cursorX,
    rectY + PADDING - KEY_SPACING_Y,
    KEY_SPACING_X + keyWidth + KEY_SPACING_X,
    TEXT_HEIGHT + KEY_SPACING_Y * 2,
    4
  );
  fill(255, 255, 255);
  text(key, cursorX + KEY_SPACING_X, textY);
  cursorX += KEY_SPACING_X + keyWidth + KEY_SPACING_X + TEXT_SPACING;

  // "to interact" text
  text(after, cursorX, textY);
}

function displayText({
  textContent,
  target,
  hover,
  length,
  custom,
  color,
  fontSize,
  align = CENTER,
  hoveramnt = 0,
}) {
  textSize(fontSize);
  textAlign(align);
  fill(color);
  text(
    textContent,
    target.position.x - length / 2 + custom,
    target.position.y - hover + hoveramnt,
    length
  );
}

function typeWriter({
  textContent,
  target,
  hover,
  length,
  timer,
  customX = 0,
  color = 255,
}) {
  textSize(18);
  fill(color);
  textAlign(LEFT);
  if (cursorIndex < textContent.length) {
    chatTimer++;
    text(
      textContent.substring(0, cursorIndex),
      target.position.x - length / 2 + customX,
      target.position.y - hover,
      length
    );
    if (timer % 2 == 0) {
      cursorIndex++;
    }
  } else {
    text(
      textContent,
      target.position.x - length / 2 + customX,
      target.position.y - hover,
      length
    );
    typeWriterComplete = true;
  }
}

function chatBox({
  target,
  hover,
  length,
  height,
  alpha = 50,
  clr = "#000000",
  hoveramnt = 0,
}) {
  var boxColor = color(clr);
  boxColor.setAlpha(alpha);
  fill(boxColor);
  noStroke();
  rect(
    target.position.x - length / 2,
    target.position.y - hover + hoveramnt,
    length,
    height,
    5
  );
}

function handleYanxinInteraction() {
  // Show interaction script
  if (yanxinInteract) {
    if (greetingUsed) {
      greetingUsed = false;
      if (firstGreeting) {
        // First time interaction welcome
        yanxinScript = variables.yanxinTexts[0];
        firstGreeting = false;
      } else {
        // Random blurbs after welcome
        yanxinScript = random(variables.yanxinTexts);
      }
    }
    chatBox({
      target: yanxin,
      hover: yanxinChatBoxHover,
      length: yanxinChatBoxLength,
      height: yanxinChatBoxHeight,
      alpha: 80,
    });
    displayText({
      textContent: "Yanxin",
      target: yanxin,
      hover: yanxinChatBoxHeight + yanxinTextHover,
      length: yanxinTextLength,
      custom: yanxinCustomX,
      color: color("#FFBEBE"),
      align: LEFT,
      fontSize: 18,
    });
    typeWriter({
      textContent: yanxinScript,
      target: yanxin,
      hover: yanxinChatBoxHover - yanxinTypeWriterHover,
      length: yanxinTextLength,
      timer: chatTimer,
      customX: yanxinCustomX,
    });
  } else {
    // Show interact instructions
    interactText({
      textContent: "to talk",
      target: yanxin,
      hover: 55,
    });
    cursorIndex = 0;
    chatTimer = 0;
    typeWriterComplete = false;
    greetingUsed = true;
  }
}

function handleTpInteraction({ targetTp }) {
  if (abs(targetTp.position.x - player.position.x) <= 100) {
    interactText({
      textContent: "to teleport",
      target: targetTp,
      hover: tpInteractTextHover,
    });
  }
}

function handleProjectInteraction({ project }) {
  var sound = document.getElementById("sound");
  if (abs(project.sprite.position.x - player.position.x) <= 130) {
    if (slideShowing) {
      slideShow(project);
      noMoving();
      // When first opening up project, save state of sound playing
      if (!soundInitialCheck) {
        if (sound.checked) {
          toggleSound();
          continueSound = sound.checked;
        } else {
          continueSound = false;
        }
        soundInitialCheck = true;
      }
    } else {
      interactText({
        textContent: "to view",
        target: project.sprite,
        hover: project.height / 2 + 30,
      });
      noSlideShow();
      // Continue playing sound if it was playing before opening project
      if (sound.checked && continueSound) {
        currentVolume = 0;
        toggleSound();
        continueSound = false;
      }
      soundInitialCheck = false;
    }
  }
}

function createTp({
  frames,
  positionIndex,
  additionalOffsetX = 0,
  destination,
}) {
  frames.frameDelay = 12;
  let tpSprite = createSprite(
    platformsGroup[positionIndex].position.x + additionalOffsetX,
    window.innerHeight - 190,
    86,
    80
  );
  tpSprite.addAnimation("static", frames);

  // Adds to teleporters array
  const teleporter = {
    position: platformsGroup[positionIndex].position.x + additionalOffsetX,
    destination: destination,
  };
  teleporters.push(teleporter);
  return tpSprite;
}

function createProject({
  name,
  groupSection,
  groupOffsetX,
  slides,
  aboutTitles,
  aboutDescriptions,
  frames,
  frameDelay,
  width,
  height,
  sprite,
}) {
  // Sprite
  var projectSprite = createSprite(
    groupSection + groupOffsetX,
    windowHeight - (150 + height / 2),
    width,
    height
  );
  projectSprite.addAnimation("static", frames);
  projectSprite.animation.frameDelay = frameDelay;

  // Adds to projects array
  const project = {
    name: name,
    groupSection: groupSection,
    groupOffsetX: groupOffsetX,
    frames: frames,
    slides: slides,
    aboutTitles: aboutTitles,
    aboutDescriptions: aboutDescriptions,
    frameDelay: frameDelay,
    width: width,
    height: height,
    sprite: projectSprite,
  };
  projects.push(project);
  return projectSprite;
}

function slideShow(project) {
  snd_windyPetals.pause();
  moveSpeed = 0;
  player.changeAnimation("idle");

  document.getElementById("slideshowContainer").style.visibility = "visible";
  document.getElementById("slideshowContainer").style.opacity = "1";
  document.getElementById("slidesTitle").innerHTML = project.name;
  currentSlides = project.slides;

  if (newSlides == true) {
    // new set of slides
    document.getElementById("aboutSection").scrollTop = 0;
    while (dotCount < currentSlides.length) {
      // creates dots based on amount of slides
      var child = document.createElement("div");
      child.setAttribute("class", "dots");
      document.getElementById("dotsLayout").appendChild(child);
      dotCount++;
    }
    let dotsList = document.getElementsByClassName("dots");
    for (let i = 0; i < dotCount; i++) {
      // navigating using dots
      dotsList[i].addEventListener("click", () => showSlide(i));
    }
    dotsList[currentSlideNum].className += " active"; // shows initial active dot
    newSlides = false;
  }
  if (newSlide == true) {
    // same set of slides, new slide showing
    if (document.getElementById("slides").firstChild) {
      // refreshes showing slide image
      document
        .getElementById("slides")
        .removeChild(document.getElementById("slides").firstChild);
    }
    var imageName = currentSlides[currentSlideNum];
    if (imageName.endsWith("jpg") || imageName.endsWith("png")) {
      var currentSlide = document.createElement("img");
      document.getElementById("expandSlideImageButton").style.visibility =
        "visible"; // hides expand image button since video has prebuilt expand
      document.getElementById("expandSlideImageButton").style.opacity = 1;

      // Prepare a space for a new expanded image for new slide
      if (document.getElementById("expandedSlideImage").firstChild) {
        document
          .getElementById("expandedSlideImage")
          .removeChild(
            document.getElementById("expandedSlideImage").firstChild
          );
      }
    } else if (imageName.endsWith("mov")) {
      var currentSlide = document.createElement("video");
      currentSlide.controls = true;
      currentSlide.disablePictureInPicture = true;
      currentSlide.controlsList = "nodownload";
      currentSlide.setAttribute("webkit-playsinline", "webkit-playsinline");
      currentSlide.setAttribute("playsinline", "playsinline");
      currentSlide.autoplay = true;
      currentSlide.volume = 0.2;
      currentSlide.loop = true;
      document.getElementById("expandSlideImageButton").style.visibility =
        "hidden"; // hides expand image button since video has built-in expand
      document.getElementById("expandSlideImageButton").style.opacity = 0;
    }
    currentSlide.src = currentSlides[currentSlideNum]; //shows slide or video
    document.getElementById("slides").appendChild(currentSlide);
    newSlide = false;
  }
  if (!dotUpdated) {
    updateSlideDots();
    updateSlideAbout(project);
    dotUpdated = true;
  }
}

function updateSlideDots() {
  let dotsList = document.getElementsByClassName("dots");
  for (let i = 0; i < dotsList.length; i++) {
    // refreshes dots
    $(dotsList[i]).removeClass("active");
  }
  dotsList[currentSlideNum].className += " active";
}

function updateSlideAbout(project) {
  let currentAboutTitle = document.getElementById("aboutSectionHeader");
  currentAboutTitle.innerHTML = project.aboutTitles[currentSlideNum];

  let currentAboutDescription = document.getElementById("descriptions");
  currentAboutDescription.innerHTML =
    project.aboutDescriptions[currentSlideNum];

  // Scroll back of descriptions on new slide
  if (
    project.aboutDescriptions[currentSlideNum].split(" ")[0] != "Pypeline" && // Pypeline - slide 1+2
    project.aboutDescriptions[currentSlideNum].split(" ")[5] != "landing" // Ask Apps - slides 3+4+5+6
  ) {
    console.log(project.aboutDescriptions[currentSlideNum].split(" ")[5]);
    document.getElementById("aboutSection").scrollTop = 0;
  }
}

function showSlide(n) {
  currentSlideNum = n;
  dotUpdated = false;
  newSlide = true;
}

// Next and previous slide buttons
document
  .getElementById("nextSlideButton")
  .addEventListener("click", () => nextSlide(1));

document
  .getElementById("prevSlideButton")
  .addEventListener("click", () => nextSlide(-1));

function nextSlide(n) {
  currentSlideNum += n;
  if (currentSlides.length <= currentSlideNum) {
    currentSlideNum = 0;
  }
  if (currentSlideNum < 0) {
    currentSlideNum = currentSlides.length - 1;
  }
  dotUpdated = false;
  newSlide = true;
}

// Expand and compress slide image
document
  .getElementById("expandSlideImageButton")
  .addEventListener("click", () => expandCurrentImage());

function expandCurrentImage() {
  document.getElementById("expandedSlideScreen").style.visibility = "visible";
  document.getElementById("expandedSlideScreen").style.opacity = "1";
  expandedImageShowing = true;

  var currentSlide = document.getElementById("slides").firstChild;
  if (document.getElementById("expandedSlideImage").firstChild) {
    // If coming from expanded image view (an expanded image is already prepared), keep same image if on same slide
    return;
  }
  // Otherwise, ready a new expanded image for new slide
  var expandedImage = document.createElement("img");
  expandedImage.src = currentSlide.getAttribute("src");
  expandedImage.style.maxWidth = window.innerWidth;
  expandedImage.style.maxHeight = window.innerHeight;
  expandedImage.style.objectFit = "scale-down";
  document.getElementById("expandedSlideImage").appendChild(expandedImage);
}

document
  .getElementById("compressSlideImageButton")
  .addEventListener("click", () => compressCurrentImage());

function compressCurrentImage() {
  document.getElementById("expandedSlideScreen").style.visibility = "hidden";
  document.getElementById("expandedSlideScreen").style.opacity = "0";
  expandedImageShowing = false;
}

document
  .getElementById("closeSlidesButton")
  .addEventListener("click", function () {
    // Trigger the action associated with the "escape" key press
    slideShowing = false;
  });

function noSlideShow() {
  if (document.getElementById("slides").firstChild) {
    // refreshes showing slide
    document
      .getElementById("slides")
      .removeChild(document.getElementById("slides").firstChild);
  }
  if (document.getElementById("expandedSlideImage").firstChild) {
    // refreshes expanded slide image space and hides it
    document
      .getElementById("expandedSlideImage")
      .removeChild(document.getElementById("expandedSlideImage").firstChild);
  }
  compressCurrentImage();

  document.getElementById("slideshowContainer").style.visibility = "hidden";
  document.getElementById("slideshowContainer").style.opacity = "0";
  moveSpeed = defaultMoveSpeed;
  currentSlideNum = 0;
  dotCount = 0;
  dotUpdated = false;
  var parent = document.getElementById("dotsLayout");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  newSlides = true;
  newSlide = true;
  currentSlides = [];
}

function noMoving() {
  moveSpeed = 0;
  player.changeAnimation("idle");
  player.velocity.y = 0;
}

function fadeInEffect() {
  $(".bouncingDaisies").remove();
  $(".loaderWrapper").fadeIn(0);
  $(".loaderWrapper").delay(200).fadeOut(400, "linear");
}

// Back to Teleporters top button
document
  .getElementById("backToTeleportersLink")
  .addEventListener("click", () => backToTeleporters());

function backToTeleporters() {
  player.position.x = beginningSection + 40;
  fadeInEffect();
  noSlideShow();
}

//  Reference: https://attacomsian.com/blog/javascript-detect-mobile-device
const deviceType = () => {
  const ua = navigator.userAgent;
  if (/iPad|iPod|iPhone/.test(ua)) {
    return "mobile";
  } else if (/Windows NT|Macintosh|Linux x86_64|Linux i686/.test(ua)) {
    return "desktop";
  }
  return "mobile";
};

document.addEventListener("DOMContentLoaded", function () {
  // World size based on screen size
  if (window.innerWidth < 500) {
    firstInteractionPlatform = 6;
    endPlatform = 57;
  } else if (window.innerWidth < 1200) {
    firstInteractionPlatform = 8;
    endPlatform = 59;
  } else {
    firstInteractionPlatform = 12;
    endPlatform = 63;
  }
  // Yanxin chatbox based on screen size
  if (window.innerWidth < 500) {
    yanxinChatBoxLength = 230;
    yanxinChatBoxHeight = 170;
    yanxinChatBoxHover = yanxinChatBoxHeight + 55;
    yanxinTextLength = 210;
    yanxinTextHover = 40;
    yanxinTypeWriterHover = 45;
    yanxinCustomX = 5;
  } else {
    yanxinChatBoxLength = 430;
    yanxinChatBoxHeight = 125;
    yanxinChatBoxHover = yanxinChatBoxHeight + 55;
    yanxinTextLength = 400;
    yanxinTextHover = 30;
    yanxinTypeWriterHover = 58;
    yanxinCustomX = 10;
  }

  // Sound control via tabbing
  document
    .getElementById("soundIcon")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter" && document.activeElement === this) {
        document.getElementById("sound").checked =
          !document.getElementById("sound").checked; // Toggle checkbox state
        toggleSound();
      }
    });

  // // Player movement with scrollwheel
  // let wheelTimeout;
  // document.addEventListener("wheel", function (event) {
  //   console.log(event);
  //   clearTimeout(wheelTimeout);

  //   if (event.deltaY < 0) {
  //     mobileLeftDown = true;
  //   } else {
  //     mobileRightDown = true;
  //   }

  //   wheelTimeout = setTimeout(() => {
  //     mobileLeftDown = false;
  //     mobileRightDown = false;
  //   }, 300);
  // });

  // Desktop
  if (deviceType() == "desktop") {
    // Hide mobile movement keys for desktop
    let mobileKeys = document.getElementsByClassName("mobileKey");
    for (let i = 0; i < mobileKeys.length; i++) {
      mobileKeys[i].style.display = "none";
    }
    // Location message for desktop
    if (window.innerWidth < 700) {
      document.getElementById("locationMessage").style.top = "4.5rem";
      document.getElementById("locationMessage").style.padding =
        "0.5rem 1.5rem";
    }
  }

  // Mobile
  if (deviceType() != "desktop") {
    // "Back to Teleporters" button top placement for mobile
    document.getElementById("backToTeleportersLink").style.top = "1.25rem";
    document.getElementById("backToTeleportersLink").style.left = "5.625rem";
    // Hide back to teleporters "B" icon for mobile
    let backKeyIcon = document.getElementById("backKeyIcon");
    backKeyIcon.style.display = "none";

    // Location message top placement for mobile
    document.getElementById("locationMessage").style.right = "1.25rem";
    document.getElementById("locationMessage").style.top = "1.25rem";
    if (window.innerWidth < 700) {
      document.getElementById("locationMessage").style.right = "0";
      if (window.innerWidth < 500) {
        document.getElementById("locationMessage").style.top = "5.625rem";
      }
    }

    // Slideshow for mobile
    document.getElementById("exitSlideshowMessage").style.display = "none";
    document.getElementById("slideshowContainer").style.backgroundColor =
      "#1c1c1c";
  }

  // Detect single key presses
  document.addEventListener("keydown", function (event) {
    if (!keyPressDetected) {
      keyPressDetected = true;
      lastKeyPress = event.key.toUpperCase();
      if (lastKeyPress == "ARROWRIGHT" || lastKeyPress == "D") {
        if (slideShowing && !expandedImageShowing) {
          nextSlide(1);
        } else {
          // Close chat if player moves away
          if (abs(yanxin.position.x - player.position.x) <= 130) {
            yanxinInteract = false;
          }
        }
      }

      if (lastKeyPress == "ARROWLEFT" || lastKeyPress == "A") {
        if (slideShowing && !expandedImageShowing) {
          nextSlide(-1);
        } else {
          // Close chat if player moves away
          if (abs(yanxin.position.x - player.position.x) <= 130) {
            yanxinInteract = false;
          }
        }
      }

      if (lastKeyPress == "ESCAPE" || lastKeyPress == "Q") {
        if (slideShowing && expandedImageShowing) {
          compressCurrentImage();
        } else if (slideShowing) {
          slideShowing = false;
        }
      }

      if (lastKeyPress == "E") {
        // Talk to Yanxin
        if (abs(yanxin.position.x - player.position.x) <= 130) {
          if (typeWriterComplete) {
            yanxinInteract = false;
          } else {
            yanxinInteract = true;
          }
        }
        // Interact with project
        for (let i = 0; i < projects.length; i++) {
          if (abs(projects[i].sprite.position.x - player.position.x) <= 130) {
            slideShowing = true;
          }
        }
        // Interact with teleporter
        for (let i = 0; i < teleporters.length; i++) {
          if (abs(teleporters[i].position - player.position.x) <= 100) {
            fadeInEffect();
            player.position.x = teleporters[i].destination;
          }
        }
      }

      if (lastKeyPress == "B") {
        // Back to Teleporters Hotkey
        if (
          player.position.x >
            platformsGroup[firstInteractionPlatform + 3].position.x &&
          !slideShowing
        ) {
          backToTeleporters();
        }
      }
    }
  });

  // Reset keyPressDetected after key release
  document.addEventListener("keyup", function (event) {
    if (keyPressDetected) {
      lastKeyPress = "";
      keyPressDetected = false;
    }
  });
});

// Action
// Simulate key press event for "E" key
document.getElementById("mobileInteract").addEventListener("touchstart", () => {
  let event = new KeyboardEvent("keydown", { key: "E" });
  document.dispatchEvent(event);
});
document.getElementById("mobileInteract").addEventListener("touchend", () => {
  let event = new KeyboardEvent("keyup", { key: "E" });
  document.dispatchEvent(event);
});
