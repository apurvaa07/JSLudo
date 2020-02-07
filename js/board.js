console.log(document);
var hPlayField1 = document.getElementById("v1");
console.log(hPlayField1);
for(var i=0; i<18; i++){
  var tile = document.createElement("div");
  tile.classList.add("tile");
  hPlayField1.appendChild(tile);
}
