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

var globalPlayerNumber = 0;

function rollDice(){
  var dice = Math.random() * 6;
  dice = Math.floor(dice) + 1;
  var diceFace = document.getElementById("DF");
  diceFace.innerHTML = dice;
  return dice;
}

function tokenClicked(e,token){
  console.log(e.target.id);
  console.log(board);
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
  this.position = 0;
  this.path = getPath(this.color);
}

function Board(nOP){
  this.numberOfPlayers = nOP;
  this.colors = ["blue","red","yellow","green"];
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

  var tileNo = 1;
  for(var i = 0; i < 4; i++){
    var PF = this.listPF[i];
    for(var j = 0; j < 18; j++){
      var tile = document.createElement("div");
      tile.classList.add("tile");
      tile.setAttribute("id", tileNo);
      tileNo += 1;
      PF.appendChild(tile);
    }
  }
}

Board.prototype.initPlayers = function(){
  this.playerList = [];
  this.tokenList = {};
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
      tokenElem.addEventListener("click", function(e){
        tokenClicked(e);
      });
      tokenElem.setAttribute("id", j+"_"+i+"_"+player.color);
      tokenElem.style.backgroundColor = player.color;
      yard.appendChild(tokenElem);
      var tk = player.tokens[i];
      tk.DOMElem = tokenElem;
      tk.DOMParent = yard;
      this.tokenList[j+"_"+i+"_"+player.color] = tk;
    }
  }
}

var board = new Board(4);
board.drawBoard();
board.initPlayers();
board.initTokens();
