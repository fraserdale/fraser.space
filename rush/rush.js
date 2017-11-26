var canvas = document.getElementById('rush');
var cont = canvas.getContext('2d');
cont.scale(20, 20);

//initialise
function fill(){
    cont.fillStyle ="#000";
    cont.fillRect(0,0,canvas.width,canvas.height);
}