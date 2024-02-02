
let uiWindow = createRect(600, 200, 300, 300);
let images = {};
 
 
const gamestate_start = 0;
const gamestate_ingame = 1;
const gamestate_gameover = 2;
 
const ingamestate_start = 0;
const ingamestate_roll = 1
const ingamestate_end = 0;
 
let gameState = gamestate_start;
let ingameState = ingamestate_start
 
 
let boardPositionSize = 50;
let pawnPositions = [];
let boardPositions = [];
let playerAmountButtons = [];
 
let canvas = document.getElementById("canvas");
let g = canvas.getContext("2d");
 
function createRect(x, y, w, h) {
  let rectangle = {
    x: x,
    y: y,
    x2: x + w,
    y2: y + h,
    w: w,
    h: h
  };
  return rectangle;
}
function clearCanvas() {
  g.fillStyle = "lightgray";
  g.fillRect(0, 0, canvas.width, canvas.height);
 
}
 
function draw()
{
    clearCanvas();
   drawGameStart();
   drawIngame();
}
function createBoardPositions() {
  let x = 0;
  let y = canvas.height - boardPositionSize;
  let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
 
  for (let i = 0; i < path.length; i++) {
    if (path[i] == 1) {
 
      x += boardPositionSize;
    } else if (path[i] == 3) {
 
      x -= boardPositionSize;
    } else if (path[i] == 0) {
 
      y -= boardPositionSize;
    }
    boardPositions.push(createRect(x, y, boardPositionSize, boardPositionSize));
  }
}
function initGame() {
  createBoardPositions();
  for (let index = 0; index < 4; index++) {
    let button =
      createRect(uiWindow.x + 5 + (index * 50), uiWindow.y + 50, 50, 50)
    button.playerAmount = index + 1;
    playerAmountButtons.push(button);
  }
}
function drawIngame() {
  for (let i = 0; i < boardPositions.length; i++) {
    let pos = boardPositions[i];
    let boardI = pos.boardI;
 
    let boardpos = boardPositions[boardI];
    let pawnSize = boardPositionSize/2;
 
    g.fillStyle = "#004400";
    g.fillRect(pos.x, pos.y, pos.w, pos.h);
    g.fillStyle = "#FFFFFF"
    g.fillText((i + 1) + "", pos.x, pos.y + 20);
  }
}
function drawGameStart() {
  g.fillStyle = "#000";
  g.font = "20px Arial";
  g.fillText("Click the amount of players to start", canvas.width / 2 - 180, 50);
 
 
  for (let i = 0; i < playerAmountButtons.length; i++) {
    if (i % 2 === 0) {
      g.fillStyle = "#3498db";
    } else {
      g.fillStyle = "#e74c3c";
    }
 
    g.fillRect(playerAmountButtons[i].x, playerAmountButtons[i].y, playerAmountButtons[i].w, playerAmountButtons[i].h);
    g.fillStyle = "#fff";
    g.font = "16px Arial";
    const buttonText = playerAmountButtons[i].playerAmount.toString();
    const textX = playerAmountButtons[i].x + (playerAmountButtons[i].w / 2) - g.measureText(buttonText).width / 2;
    const textY = playerAmountButtons[i].y + (playerAmountButtons[i].h / 2) + 6;
    g.fillText(buttonText, textX, textY);
    g.drawImage(images["pawn" + i + ".png"], playerAmountButtons[i].x, playerAmountButtons[i].y);
  }
}
 
function loadImages() {
  let sources = [
    "img/dice1.png", "img/dice2.png", "img/dice3.png", "img/dice4.png", "img/dice5.png", "img/dice6.png",
    "img/pawn0.png", "img/pawn1.png", "img/pawn2.png", "img/pawn3.png",
    "img/snakes.png",
    "img/trophy.png",
    "img/window.png",
  ];
 
  let scope = this;
 
  let loaded = 0;
  for (let i = 0; i < sources.length; i++) {
    let img = new Image();
 
 
    img.onload = function () {
      loaded++;
      if (loaded == sources.length) {
        imagesLoaded();
      }
    };
    img.src = sources[i];
 
    images[sources[i].replace("img/", "")] = img;
 
  }
}
 
function imagesLoaded() {
  initGame();
 
  canvas.addEventListener("click", (e) => { canvasClicked(e); })
  g.drawImage(images["snakes.png"], 0, 55, 600, 600);
 
 
  draw();
}
function canvasClicked(MouseEvent) {
  let mX = MouseEvent.layerX;
  let mY = MouseEvent.layerY;
 
  if (gameState === gamestate_start) {
 
    for (let i = 0; i < playerAmountButtons.length; i++) {
 
      let button = playerAmountButtons[i];
 
      let hitButton = inRect(mX, mY, button);
 
      if (hitButton) {
        startGame(button.playerAmount);
        break;
 
      }
    }
  }
}
function inRect(px, py, rect) {
  let result = (px >= rect.x && px <= rect.x2 && py >= rect.y && py <= rect.y2)
  return result;
}
 
function createPawn(playerI) {
  return { boardI: 0, playerI: playerI };
}
 
function startGame(playerAmount)
 {
    gameState = gamestate_ingame;
    ingameState = ingamestate_start;
    pawnPosition=[];//maak een nieuwe pionnen lijst
    playerTurn= 0;
    winner=-1;
    console.log("playerAmount " + playerAmount);
    for(let i = 0; i < playerAmount; i++)
    {
      let newPawn = createPawn();
      pawnPositions.push(newPawn);
    }
 
    draw();
 
 }
 
loadImages();
draw();
 
 
 
 