var canvas = document.getElementById('rush');
var cont = canvas.getContext('2d');
cont.scale(20, 20);

var shapes =[
    [1,1,0],
    [0,1,1],
    [0,0,0]
];

function fill() {
    cont.fillStyle = '#232323';
    cont.fillRect(0,0,canvas.width,canvas.height);
    draw(current.shape, current.position.x, current.position.y);
}


//initialise
function draw(shape, posx, posy) {
    for(var row = 0; row < shape.length; row++){
        //console.log(row);
        for(var index = 0; index < shape.length; index++){
            console.log(shape[row][index]);
            if(shape[row][index] == 1){
                cont.fillStyle = "#FFEE00";
                cont.fillRect(index + posx ,row + posy,1,1)
            }
        }
    }
}

var current ={
    shape: shapes,
    position: {
        x: 5,
        y: 0
    }
};

document.onkeypress = function(k){
    if(k.keyCode == 97){
        console.log("a");
        current.position.x -= 1;
        console.log(current.position);
        fill();}
    else if(k.keyCode == 100){
        console.log("d");
        current.position.x += 1;
        console.log(current.position);
        fill()}
    else if(k.keyCode == 115){
        console.log("s");
        current.position.y += 1;
        console.log(current.position);
        fill();}
    else if(k.keyCode == 119){
        console.log("w")}
};
fill();
//testing to make sure correct array is showing
//console.log(current.shape[0]);
//console.log(current.shape[0][0]);