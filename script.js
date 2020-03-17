var myGamePiece, myGems, myTraps, myHealing, myMines, myWeapons, myObsactles, myPortal, myMonsters,dx;
function startGame() {
    // Variable declaration, the be made into object classes with keys & values in  v2.0
    myGameArea.start();
    myGamePiece = new component(60, 60, "images/sMaid.png", 10, 120, "image");
    myGems = new component(20, 20, "images/redGem.png", 480, 310, "image");
    myMonsters = new component(60, 60, "images/merWolf2.png", 650, 180, "image");
    // myAccests = new component(20, 20, "images/redGem.png", 480, 310, "image");
    // myObstacles = new component(20, 20, "images/redGem.png", 480, 310, "image");
    // myChallenges = new component(20, 20, "images/redGem.png", 480, 310, "image");
}
    var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960; //windows.innerwidth;
        this.canvas.height = 620; //windows.inner.height;

        //this.canvas.style.cursor = "none";                              // <----- This hides the Cursor
        this.context = this.canvas.getContext("2d");

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 1;
        this.interval = setInterval(updateGameArea,20);    

        /*window.addEventListener('mousemove', function (e) {            //<------- Listens for the Mouse
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
        })*/

        window.addEventListener('keydown', function (e) {               // Listens for the keyPress
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");        //  This Tests for truthness and pass it along
        })
        window.addEventListener('keyup', function (e) {               //   Listens for the keyRelease  
            myGameArea.keys[e.keyCode] = (e.type == "keydown");       //   This Tests for truthness and pass it along
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
    this.newPos = function() {  //Here: speedX/Y changes componentPosition
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
}


function updateGameArea() {
  // This accesses the arrow keys using thier key codes.
  if (myGameArea.keys && myGameArea.keys == [37]) {myGamePiece.speedX = -1; }           //Left Arrow   [<]
  if (myGameArea.keys && myGameArea.keys == [39]) {myGamePiece.speedX = 1; }            //Right Arrow  [>]
  if (myGameArea.keys && myGameArea.keys == [38]) {myGamePiece.speedY = -1; }           //Up Arrow  [^]
  if (myGameArea.keys && myGameArea.keys == [40]) {myGamePiece.speedY = 1; }            //Left Arrow  [v]
 
////   Drag/Control element by Mouse  
/*   if (myGameArea.x && myGameArea.y) {
     myGamePiece.x = myGameArea.x;
     myGamePiece.y = myGameArea.y;
   }   */

    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

  

    myGamePiece.newPos();          // Call new position              // myGamePiece.x+=1
    myGamePiece.update();         //  Updates and draws it to canvas

    myGems.newPos();
    myGems.update();
    
    myMonsters.newPos();         
    //myMonsters.x+=1   
    myMonsters.update();
    // myMonster.x+=1            Future updates includes monster object classes (aka: Mutliple monster types)  with the ability to move/chase mermaid.
    
    // redGem.newPos();
    // redGem.update();
   
    // myGamePiece.newPos();
    // myGamePiece.update();

  }
  
