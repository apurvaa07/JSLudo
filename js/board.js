function getPath(color){
  switch (color) {
    case "blue":
      return [2, 3, 4, 5, 6, 34, 31, 28, 25, 22, 19, 20, 21, 24, 27, 30, 33, 36, 37, 38, 39, 40, 41, 42, 48, 54, 53, 52, 51, 50, 49, 57, 60, 63, 66, 69, 72, 71, 70, 67, 64, 61, 58, 55, 18, 17, 16, 15, 14, 13, 7, 8, 9, 10, 11, 12];

    case "red":
      return [24, 27, 30, 33, 36, 37, 38, 39, 40, 41, 42, 48, 54, 53, 52, 51, 50, 49, 57, 60, 63, 66, 69, 72, 71, 70, 67, 64, 61, 58, 55, 18, 17, 16, 15, 14, 13, 7, 1, 2, 3, 4, 5, 6, 34, 31, 28, 25, 22, 19, 20, 23, 26, 29, 32, 35];

    case "yellow":
      return [53, 52, 51, 50, 49, 57, 60, 63, 66, 69, 72, 71, 70, 67, 64, 61, 58, 55, 18, 17, 16, 15, 14, 13, 7, 1, 2, 3, 4, 5, 6, 34, 31, 28, 25, 22, 19, 20, 21, 24, 27, 30, 33, 36, 37, 38, 39, 40, 41, 42, 48, 47, 46, 45, 44, 43];

    case "green":
      return [67, 64, 61, 58, 55, 18, 17, 16, 15, 14, 13, 7, 1, 2, 3, 4, 5, 6, 34, 31, 28, 25, 22, 19, 20, 21, 24, 27, 30, 33, 36, 37, 38, 39, 40, 41, 42, 48, 54, 53, 52, 51, 50, 49, 57, 60, 63, 66, 69, 72, 71, 68, 65, 62, 59, 56];
  }
}

var blueTiles = [2, 8, 9, 10, 11, 12];
var redTiles = [24, 23, 26, 29, 32, 35];
var yellowTiles = [53, 47, 46, 45, 44, 43];
var greenTiles = [67, 68, 65, 62, 59, 56];

var globalPlayerNumber = 0;
var diceValue = undefined;
var prevDiceValue = undefined;

function printLog(message){
  var logContainer = document.getElementById("lgCtr");
  var log = document.createElement("p");
  log.innerHTML = message;
  var br = document.createElement("hr");
  logContainer.appendChild(br);
  logContainer.appendChild(log);
  logContainer.appendChild(br);
  logContainer.scrollTop = logContainer.scrollHeight;
}

function clearDice(){
  var diceFace = document.getElementById("DF");
  diceFace.innerHTML = "";
  prevDiceValue = diceValue;
  diceValue = undefined;
  updatePrev();
}

function updatePrev(){
  var prevDiceFace = document.getElementById("PDF");
  prevDiceFace.innerHTML = prevDiceValue;
}

function rollDice(){
  var dice = Math.random() * 6;
  dice = Math.floor(dice) + 1;
  var diceFace = document.getElementById("DF");
  diceFace.innerHTML = dice;
  diceValue = dice;
  if(dice != 6 && atleastOneIsOut(board.playerList[board.currentPlayer]) == false){
    printLog("Player: "+(board.currentPlayer+1)+" rolled "+dice+" but cannot move any token.");
    changePlayer();
    clearDice();
  }
}

function startGame(){
  var nOP = document.getElementById("dashIP");
  if(nOP.value !== ""){
    printLog("Initializing " + nOP.value + " players.");
    board = new Board(parseInt(nOP.value));
    board.drawBoard();
    board.initPlayers();
    board.initTokens();
    var playerName = document.getElementById("PName");
    var diceFace = document.getElementById("DF");
    var diceButton = document.getElementById("DFB");
    var prevDiceFace = document.getElementById("PDF");
    var prevDiceHead = document.getElementById("prev");
    diceFace.style.display = "block";
    diceButton.style.display = "block";
    playerName.style.display = "block";
    prevDiceFace.style.display = "block";
    prevDiceHead.style.display = "block";
    playerName.innerHTML = "Player " + (board.currentPlayer + 1);
    var diceIP = document.getElementById("dashIP");
    var diceStart = document.getElementById("SB");
    diceIP.style.display = "none";
    diceStart.style.display = "none";
  }

}

function changePlayer(){
  board.currentPlayer = (board.currentPlayer + 1) % board.numberOfPlayers;
  var playerName = document.getElementById("PName");
  playerName.innerHTML = "Player " + (board.currentPlayer + 1);
}

function atleastOneIsOut(player){
  console.log("AtleastOnePlayerIsOut method for - ", player);
  var tokenList = player.tokens;
  for(var i = 0; i < tokenList.length; i++){
    if(tokenList[i].position !== -1){
      return true;
    }
  }
  return false;
}

function setColor(tile, tileNo){
  if(blueTiles.includes(tileNo)){
    tile.classList.add("blueTile");
  }else if(redTiles.includes(tileNo)){
    tile.classList.add("redTile");
  }else if(yellowTiles.includes(tileNo)){
    tile.classList.add("yellowTile");
  }else if(greenTiles.includes(tileNo)){
    tile.classList.add("greenTile");
  }else{
    tile.classList.add("whiteTile");
  }
  return tile;
}

function tokenClicked(e){
    //check if correct token is clicked
    if(diceValue === undefined)
      return;
    var token = board.tokenList[e.target.id];
    var currPlayer = board.playerList[board.currentPlayer];
    console.log("Token Clicked for token - ", token);
    if(currPlayer.color === token.color){
      //check if current position is 0
      var DOMParent = token.DOMParent;
      var DOMElem = token.DOMElem;

      console.log("current player  = token color");
      if(token.position === -1){
        console.log("Clicked token is inside yard");
        var newTileID = token.path[0];
        var newTile = board.tileList[newTileID];
        if(diceValue === 6){
          //Check if there is an enemy token on first tile in path
          console.log("Dice Value is 6");
          if(newTile.hasToken == false){
            console.log("No enemy token on the first tile of path");
            token.position = 0;
            DOMParent.removeChild(DOMElem);
            var newParent = document.getElementById(token.path[0]);
            newParent.appendChild(DOMElem);
            token.DOMParent = newParent;
            console.log("Tile Number:",token.path[0]);
            var currentTile = board.tileList[token.path[0]];
            currentTile.token = token;
            currentTile.hasToken = true;
            printLog("Player : " + (board.currentPlayer+1) + " introduced new token on the playfied.");
            changePlayer();
            clearDice();
          }else{
            if(newTile.tokenColor !== token.color){
              var tokenAtTile = newTile.token;
              console.log("token at location is: " , tokenAtTile);
              var DOMParent2 = tokenAtTile.DOMParent;
              var DOMElem2 = tokenAtTile.DOMElem;
              DOMParent2.removeChild(DOMElem2);

              var newParent = board.yards[board.colorMap[tokenAtTile.color]];
              newParent.appendChild(DOMElem2);
              tokenAtTile.DOMParent = newParent;
              tokenAtTile.position = -1;

              DOMParent.removeChild(DOMElem);
              var newParent = document.getElementById(newTile.tileNumber);
              newParent.appendChild(DOMElem);
              token.DOMParent = newParent;
              token.position = currPos + dv;

              newTile.hasToken = true;
              newTile.tokenColor = token.color;
              newTile.token = token;
              changePlayer();
              clearDice();
            }
          }
        }
      }else{
        console.log("current positino is not zero");
        var currPos = token.position;
        var dv = diceValue;
        if(currPos + dv < token.path.length && atleastOneIsOut(currPlayer)){
          console.log("New location not greater than path length");
          var newTileID = token.path[currPos + dv];
          var newTile = board.tileList[newTileID];

          var oldTileID = token.path[currPos];
          var oldTile = board.tileList[oldTileID];
          console.log(newTile);
          if(newTile.hasToken === false){
            console.log("new tile has no token");
            oldTile.hasToken = false;
            oldTile.tokenColor = null;
            oldTile.token = null;

            newTile.hasToken = true;
            newTile.tokenColor = token.color;
            newTile.token = token;
            DOMParent.removeChild(DOMElem);
            var newParent = document.getElementById(newTile.tileNumber);
            newParent.appendChild(DOMElem);
            token.DOMParent = newParent;
            token.position = currPos + dv;
            changePlayer();
            clearDice();
          }else{
            //if color is same dont move,
            //if not - current token returns home and add new child
            console.log("there is a token at new location");
            if(newTile.tokenColor !== token.color){
              var tokenAtTile = newTile.token;
              console.log("token at location is: " , tokenAtTile);
              var DOMParent2 = tokenAtTile.DOMParent;
              var DOMElem2 = tokenAtTile.DOMElem;
              DOMParent2.removeChild(DOMElem2);

              var newParent = board.yards[board.colorMap[tokenAtTile.color]];
              newParent.appendChild(DOMElem2);
              tokenAtTile.DOMParent = newParent;
              tokenAtTile.position = -1;

              DOMParent.removeChild(DOMElem);
              var newParent = document.getElementById(newTile.tileNumber);
              newParent.appendChild(DOMElem);
              token.DOMParent = newParent;
              token.position = currPos + dv;

              newTile.hasToken = true;
              newTile.tokenColor = token.color;
              newTile.token = token;

              changePlayer();
              clearDice();
            }
          }
        }
      }
    }

  }

function Player(color){
  this.tokens = [];
  this.color = color;
  for(var i = 0; i < 4; i++){
    var token = new Token(this.color, i);
    this.tokens.push(token);
  }
}

function Token(color, id){
  this.color = color;
  this.id = id;
  this.position = -1;
  this.path = getPath(this.color);
}

function Board(nOP){
  this.numberOfPlayers = nOP;
  this.colors = ["blue","red","yellow","green"];
  this.tokenList = {};
  this.currentPlayer = 0;
}

function Tile(tNo){
  this.tileNumber = tNo;
  this.hasToken = false;
  this.tokenColor = null;
  this.token = null;
}

Board.prototype.drawBoard = function(){
  var hPF1 = document.getElementById("h1");
  var hPF2 = document.getElementById("h2");
  var vPF1 = document.getElementById("v1");
  var vPF2 = document.getElementById("v2");

  var red = document.getElementById("red");
  var blue = document.getElementById("blue");
  var green = document.getElementById("green");
  var yellow = document.getElementById("yellow");

  this.yards = [blue,red,yellow,green];
  this.listPF = [hPF1, vPF1, hPF2, vPF2];
  this.tileList = {};
  this.colorMap = {
    "blue": 0,
    "red" : 1,
    "yellow" : 2,
    "green" : 3
  };

  var tileNo = 1;
  for(var i = 0; i < 4; i++){
    var PF = this.listPF[i];
    for(var j = 0; j < 18; j++){
      var tile = document.createElement("div");
      var tl = new Tile(tileNo);
      tile.classList.add("tile");
      tile.setAttribute("id", tileNo);
      tile = setColor(tile, tileNo);
      this.tileList[tileNo] = tl;
      tileNo += 1;
      PF.appendChild(tile);
    }
  }
}

Board.prototype.initPlayers = function(){
  this.playerList = [];
  for(var i = 0; i < this.numberOfPlayers; i++){
    var pl = new Player(this.colors[i]);
    this.playerList.push(pl);
  }
}

Board.prototype.initTokens = function(){
  for(var i = 0; i < this.numberOfPlayers; i++){
    var yard = this.yards[i];
    var player = this.playerList[i];
    for(var j = 0; j < 4; j++){
      var tokenElem = document.createElement("div");
      tokenElem.classList.add("token");
      tokenElem.setAttribute("id", j+"_"+i+"_"+player.color);
      tokenElem.style.backgroundColor = player.color;
      yard.appendChild(tokenElem);
      var tk = player.tokens[j];
      tk.DOMElem = tokenElem;
      tk.DOMParent = yard;
      this.tokenList[j+"_"+i+"_"+player.color] = tk;
      tokenElem.addEventListener("click", function(e){
        tokenClicked(e);
      });
    }
  }
}

var board = null;
