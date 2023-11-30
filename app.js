
let uiWindow = createRect(600,200,300,300);
 
const gamestate_start=0;
const gamestate_ingame=1;
const gamestate_gameover=2;
 
const ingamestate_start=0;
const ingamestate_roll=1
const ingamestate_end=0;
 
let boardPositionSize= 50;
let pawnPosition= [];
let boardPositions=[];
let playerAmountButtons = [];
 
let canvas = document.getElementById("canvas");
let g = canvas.getContext("2d");
 
function createRect(x,y,w,h)
{
    let rectangle = {
        x:x,
        y:y,
        x2:x+w,
        y2:y+h,
        w:w,
        h:h
    };
    return rectangle;
}
 function clearCanvas()
 {
    g.fillStyle = "lightgray";
    g.fillRect(0,0, canvas.width, canvas.height);
 
 }
 
 function draw()
{
    clearCanvas();
    for(let i =0 ; i<boardPositions.length;i++)
    {
        let pos = boardPositions[i];
 
        g.fillStyle  = "#004400";
        g.fillRect(pos.x,pos.y,pos.w,pos.h);
        g.fillStyle  = "#FFFFFF";
        g.fillText((i+1)+"",pos.x,pos.y+20);
    }
}
function createBoardPositions() {
    let x = 0;
    let y = canvas.height -boardPositionSize;
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
 function initGame()
 {
    
      
    createBoardPositions
 }

 function draw() {
    clearCanvas();
    for (let i = 0; i < boardPositions.length; i++) {
        let pos = boardPositions[i];

        g.fillStyle = "#004400";
        // Use the width and height properties of the rectangle object
        g.fillRect(pos.x, pos.y, pos.width, pos.height);
        
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", pos.x, pos.y + 20);
    }
}
function createBoardPositions() {
    let x = 0;
    let y = canvas.height - boardPositionSize;
    let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    for (let i = 0; i < path.length; i++) {
        if (path[i] == 1) {
            x += boardPositionSize; // Move right by the size of a board position
        } else if (path[i] == 3) {
            x -= boardPositionSize; // Move left by the size of a board position
        } else if (path[i] == 0) {
            y -= boardPositionSize; // Move up by the size of a board position
        }
        boardPositions.push(createRect(x, y, boardPositionSize, boardPositionSize));
    }
}
createBoardPositions();
draw();
