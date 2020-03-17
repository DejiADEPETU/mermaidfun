var myGamePiece, myGems, myTraps, myHealing, myMines, myWeapons, myObsactles, myPortal, myMonsters;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(60, 60, "images/sMaid.png", 10, 120, "image");
    myGems = new component(20, 20, "images/redGem.png", 480, 310, "image");
    myMonsters = new component(60, 60, "images/merWolf2.png", 650, 180, "image");
    // myGems = new component(20, 20, "images/redGem.png", 480, 310, "image");
    // myGems = new component(20, 20, "images/redGem.png", 480, 310, "image");
    // myGems = new component(20, 20, "images/redGem.png", 480, 310, "image");

}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960; //windows.innerwidth;
        this.canvas.height = 620; //windows.inner.height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea,20);    
        
        window.addEventListener('keydown', function (e) {
        myGameArea.key = e.keyCode;
      })
        window.addEventListener('keyup', function (e) {
        myGameArea.key = false;
      })
   
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function(){
        clearInterval(this.interval);
    }
}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;         // Speed Indicators  speedX &  speedY
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {             // This exploite spedXY to change the component's position
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}


function updateGameArea() {
    
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    // This accesses the arrow keys using thier key codes.
    if (myGameArea.key && myGameArea.key == 37) {myGamePiece.speedX = -1; } //Left Arrow   [<]
    if (myGameArea.key && myGameArea.key == 39) {myGamePiece.speedX = 1; } //Right Arrow  [>]
    if (myGameArea.key && myGameArea.key == 38) {myGamePiece.speedY = -1; } //Up Arrow  [^]
    if (myGameArea.key && myGameArea.key == 40) {myGamePiece.speedY = 1; } //Left Arrow  [v]

    myGamePiece.newPos();                // Call new position
    // myGamePiece.x+=1
    myGamePiece.update();                //  Updates and draws it to canvas

    myGems.newPos();
    myGems.update();
    
    myMonsters.newPos();   
    myMonsters.update();
    // myMonster.x+=1            Future updates includes monster object classes (aka: Mutliple monster types)  with the ability to move/chase mermaid.
    
    // redGem.newPos();
    // redGem.update();


    
    
    myGamePiece.newPos();
    myGamePiece.update();



    
    
    
  }
  
