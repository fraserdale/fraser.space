var canvas = document.getElementById('rush');
var cont = canvas.getContext('2d');
cont.scale(20, 20);
var colours = ['orange','yellow','red','lime','blue','purple']
var shapes =[
    [
        [0,0,0],
        [0,0,1],
        [1,1,1]
    ],
    [
        [0,0,0],
        [0,1,1],
        [0,1,1]
    ],
    [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [
        [0,0,0],
        [1,0,0],
        [1,1,1]
    ],
    [
        [0,0,0],
        [0,1,0],
        [1,1,1]
    ]
];

var current ={
    shape: shapes[0],
    colour: colours[0],
    position: {
        x: 5,
        y: 0
    },
};

var score = 0

var backTable = [];
for (var x = 0; x < 20; x++){
    var inner = [];
    for (var y = 0; y < 12; y++){
        inner[y] = 0;
    }
    backTable[x] = inner;
}

function fill() {
    cont.fillStyle = '#232323';
    cont.fillRect(0,0,canvas.width,canvas.height);
    draw(current.shape, current.position.x, current.position.y);
    drawGrid(backTable)
}


//initialise
function draw(shape, posx, posy) {
    for(var row = 0; row < shape.length; row++){

        for(var index = 0; index < shape.length; index++){

            if(shape[row][index] == 1){
                cont.fillStyle = current.colour;
                cont.fillRect(index + posx ,row + posy,1,1)
            }
        }
    }
}

function drawBack(shape, posx, posy, backTable){
    for(var row = 0; row < shape.length; row++){

        for(var index = 0; index < shape.length; index++){

            if(shape[row][index] == 1){
                //console.log(backTable[row + posy][index + posx])
                backTable[row + posy][index + posx] = 1
                score += 1
                document.getElementById("score").innerHTML = "Score: " + score
            }
        }
    }
}

function drawGrid(backTable) {
    for (var y = 0; y < 20; y++) {
        for (var x = 0; x < 12; x++) {
            if (backTable[y][x] == 1) {
                cont.fillStyle = current.colour;
                cont.fillRect(x,y, 1, 1)
            }

        }
    }
}



var interval = setInterval(drop,1000);
var n = 0

function drop() {
    if(current.position.y - checkBottom() == 17){
        collision()
    }
    shape = current.shape
    posy = current.position.y
    posx = current.position.x
    for(var row = 0; row < shape.length; row++){

        for(var index = 0; index < shape.length; index++){
            if(shape[row][index] == 1){
                cont.fillStyle = current.colour;
                //console.log(row + posy + 1 + " " + (index + posx) )
                if(backTable[row + posy + 1][index + posx] == 1)
                    collision()
            }
        }
    }
    if(current.position.y - checkBottom() < 17){
        current.position.y += 1;
        fill()
    }
}


function collision() {
    drawBack(current.shape, current.position.x, current.position.y, backTable);
    current.position.y = 0
    current.position.x = 5
    var rand = Math.floor(Math.random()*6);
    console.log(rand)
    current.shape = shapes[rand]
    current.colour = colours[rand]
}


function minwidth(shape){
    var first = false
    var count = 0
    while (first == false && count < (shape.length -1)){
        for(var row = 0; row < shape.length; row++){
            if(shape[row][0] == 1){
                console.log("First value filled.")
                first = true
                return(0)
            }
        }
        count++
    }
    if (first == false){
        return(1)
    }
}

function maxwidth(shape){
    var last = false
    var count = 0
    while (last == false && count < (shape.length -1)){
        for(var row = 0; row < (shape.length - checkBottom()); row++){


            if(shape[row][shape.length -1 ] == 1){ //use - 1, i know the array will always be a square
                last = true
                return(shape.length -1)
            }
        }
        count++
    }
    if (last == false){
        return(shape.length - 2)
    }
}

function checkRHS(){
    console.log(current.position.x + maxwidth(current.shape))
    if((current.position.x >= 11 - maxwidth(current.shape)) || backTable[current.position.y + 2 - checkBottom()][current.position.x + 1 + maxwidth(current.shape)] == 1){

        //console.log("edge found")
        return false;
    }
    else if ((current.position.x < 11 - maxwidth(current.shape)) ){
        return true
    }
}

function checkLHS(){
    console.log(current.position.x + minwidth(current.shape))
    if ((current.position.x <= 0 - minwidth(current.shape))  || backTable[current.position.y + 2 - checkBottom()][current.position.x - 1 + minwidth(current.shape)] == 1){
        return false
    }else if((current.position.x > 0 - minwidth(current.shape)) ){
        //console.log("edge found")
        return true;
    }
}

function checkBottom(){
    total = 0
    for (var i = 0; i < current.shape.length; i++) {
        total += current.shape[current.shape.length - 1][i]
    }
    if (total == 0){
        return 1
    }
    else{
        return 0
    }

}


document.onkeypress = function(k){
    if(k.keyCode == 97){
        //console.log("a");
        if (checkLHS()){
            current.position.x -= 1;
        };
        //current.position.x -= 1;
        //console.log(current.position);
        fill();}
    else if(k.keyCode == 100){
        //console.log("d");
        if (checkRHS()){
            current.position.x += 1;
        };
        //current.position.x += 1;
        //console.log(current.position);
        fill()}
    else if(k.keyCode == 115){
        //console.log("s");
        if(current.position.y - checkBottom() < 17){
            drop()
        }
        //console.log(current.position);
        fill();}
    else if(k.keyCode == 119){
        console.log("w")}
};
fill();
//testing to make sure correct array is showin
//console.log(current.shape[0])
//console.log(current.shape[0][0])


