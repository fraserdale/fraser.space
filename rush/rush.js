//declare canvas and link with page
var canvas = document.getElementById('rush');
var cont = canvas.getContext('2d');
//scale by 20x
cont.scale(20, 20);
//declare the colours that correspond with the appropriate shapes
var colours = ['orange','yellow','red','lime','blue','purple','cyan']
//declare the shapes and their rotations
var shapes =[
    [
        [0,0,0],
        [0,0,1],
        [1,1,1]
    ],
    [
        [1,0,0],
        [1,0,0],
        [1,1,0]
    ],
    [
        [1,1,1],
        [1,0,0],
        [0,0,0]
    ],
    [
        [0,1,1],
        [0,0,1],
        [0,0,1]
    ],

    [
        [0,0,0],
        [0,1,1],
        [0,1,1]
    ],
    [
        [0,0,0],
        [0,1,1],
        [0,1,1]
    ],
    [
        [0,0,0],
        [0,1,1],
        [0,1,1]
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
        [0,0,1],
        [0,1,1],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,0,1],
        [0,1,1],
        [0,1,0]
    ],

    [
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [
        [1,0,0],
        [1,1,0],
        [0,1,0]
    ],
    [
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [
        [1,0,0],
        [1,1,0],
        [0,1,0]
    ],

    [
        [0,0,0],
        [1,0,0],
        [1,1,1]
    ],
    [
        [1,1,0],
        [1,0,0],
        [1,0,0]
    ],
    [
        [1,1,1],
        [0,0,1],
        [0,0,0]
    ],
    [
        [0,0,1],
        [0,0,1],
        [0,1,1]
    ],


    [
        [0,0,0],
            [0,1,0],
            [1,1,1]
        ],
    [
        [1,0,0],
        [1,1,0],
        [1,0,0]
    ],
    [
        [1,1,1],
        [0,1,0],
        [0,0,0]
    ],
    [
        [0,0,1],
        [0,1,1],
        [0,0,1]
    ],

    [
        [0,1,0],
        [0,1,0],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,0,0]
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,0,0]
    ]


];

//set rotation counter and shape counter to 0
var n = 0
var counter = 0

//declare the first shape that drops and its colour and its position x and y positions
var current ={
    shape: shapes[n],
    colour: colours[0],
    position: {
        x: 5,
        y: -2
    },
};

//reads in stored cookie and splits from the = sign, this seperates the name of the cookie and the data
var totalCookie = document.cookie.split("=");
var scoresCookie = totalCookie[1];
//splits the stored scores cookie into an array
var scores = scoresCookie.split(",");
//turns the scores into integers from strings
for(var e=0; e<scores.length; e++){
    scores[e] = parseInt(scores[e])
}

//initialises score as 0
score = 0

//creates the 'backTable' used to store all previous moves
var backTable = [];
//loops through each row
for (var x = 0; x < 20; x++){
    var inner = [];
    //loops through each collumn
    for (var y = 0; y < 12; y++){
        //fills each cell with a 0, a blank canvas
        inner[y] = 0;
    }
    backTable[x] = inner;
}

//function to fill the canvas
function fill() {
    //colours the canvas content to match rest of the screen
    cont.fillStyle = '#232323';
    //sets canvas content to same size as canvas
    cont.fillRect(0,0,canvas.width,canvas.height);
    //draws the current tile
    draw(current.shape, current.position.x, current.position.y);
    //draws the back table, all previously placed tiles
    drawGrid(backTable)

}


function draw(shape, posx, posy) {
    //for each row of the shape
    for(var row = 0; row < shape.length; row++){
        //for each collumn in that row
        for(var index = 0; index < shape.length; index++){
            //if that location is filled (equals one)
            if(shape[row][index] == 1){
                //on the canvas content draw a 1x1 square of the current colour
                cont.fillStyle = current.colour;
                cont.fillRect(index + posx ,row + posy,1,1)
            }
        }
    }
}

//function to draw a shape to the back table
function drawBack(shape, posx, posy, backTable){
    //for each row of the shape
    for(var row = 0; row < shape.length; row++){
        //for each collumn in that row
        for(var index = 0; index < shape.length; index++){
            //if that location is filled (equals 1)
            if(shape[row][index] == 1){
                //draw that position to the backboard
                backTable[row + posy][index + posx] = 1
                //increase the score by 1
                score += 1
            }
        }
    }
}


//draws the entire back table
function drawGrid(backTable) {
    //for each row in the backtable
    for (var y = 0; y < 20; y++) {
        //for each item in the row
        for (var x = 0; x < 12; x++) {
            //if in that location onthe back table = 1
            if (backTable[y][x] == 1) {
                //on the canvas content draw a 1x1 square of the current colour
                cont.fillStyle = current.colour;
                cont.fillRect(x,y, 1, 1)
            }

        }
    }
    //Fill the score in the side bar
    document.getElementById("score").innerHTML = "Score: " + score
}


//drop counter that ticks every 1000ms/ every second
var interval = setInterval(drop,1000);

//function to drop tile down
function drop() {
    fill()
    //checks if game should be over by checking the top row to see if filled
    if(backTable[0][6] == 1 || backTable[0][5] == 1 || backTable[0][7] == 1){
        //if game is over then sort the scores
        sortScores()
        //stop the drop clock
        clearInterval(interval)
        console.log("Game over")
        //redirect to the scores page
        window.open("scores.html","_self")
    }
    //checks if tile is on the bottom row
    if(current.position.y - checkBottom() == 17){
        //if it is then call collision function
        collision()
    }
    shape = current.shape
    posy = current.position.y
    posx = current.position.x
    //loop through each row in the shape
    for(var row = 0; row < shape.length; row++){
        //loop through each element in the row
        for(var index = 0; index < shape.length; index++){
            //if that element equals 1
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
    }

}



function sortScores() {
    scores.push(score)
    do {
        var swap = false;
        for(var x = 0; x < scores.length-1; x++) {
            if (scores[x] > scores[x+1]) {
                var temp = scores[x];
                scores[x] = scores[x+1];
                scores[x+1] = temp;
                swap = true;
            }
        }
    }
    while(swap);
    scores.shift()
    console.log(scores)
    document.cookie="scores=" + scores + "; expires=Thu, 12 Mar 2020 12:00:00 GMT"

}

function collision() {
    drawBack(current.shape, current.position.x, current.position.y, backTable);
    current.position.y = -2
    current.position.x = 5
    var rand = Math.floor(Math.random()*7);
    //console.log(n)
    n = [rand*4]
    current.shape = shapes[n]
    current.colour = colours[rand]
    counter = 0
}


function minwidth(shape){
    var first = false
    var count = 0
    while (first == false && count < (shape.length -1)){
        for(var row = 0; row < shape.length; row++){
            if(shape[row][0] == 1){
                //console.log("First value filled.")
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
    //(current.position.x + maxwidth(current.shape))
    if(current.position.x >= 11 - maxwidth(current.shape)){
        //console.log("edge found")
        return false;
    }
    shape = current.shape
    right = true
    for(var row = 0; row < shape.length; row++){
        //for each collumn in that row
        for(var index = 0; index < shape.length; index++){
            //if that location is filled (equals 1)
            if(shape[row][index] == 1 && backTable[row + current.position.y][index + current.position.x +1] == 1){
                //draw that position to the backboard
                console.log("CANT MOVE ")
                right = false
            }else{
                console.log("MOVE")
            }
        }
    }
    if(right == true){
        return true
    }else{
        return false
    }
}

function checkLHS(){
    //console.log(current.position.x + minwidth(current.shape))
    if((current.position.x <= 0 - minwidth(current.shape)) ){
        //console.log("edge found")
        return false;
    }
    shape = current.shape
    left = true
    for(var row = 0; row < shape.length; row++){
        //for each collumn in that row
        for(var index = 0; index < shape.length; index++){
            //if that location is filled (equals 1)
            if(shape[row][index] == 1 && backTable[row + current.position.y][index + current.position.x -1] == 1){
                //draw that position to the backboard
                console.log("CANT MOVE ")
                left = false
            }else{
                console.log("MOVE")
            }
        }
    }
    if(left == true){
        return true
    }else{
        return false
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

function checkRotate(){
    if(current.position.y <= 0){
        return false
    }

    //if it can rotate then return true, if it cant rotate return false
    //shapes[(parseInt(n))]
    console.log("-------------------------")
    //nextShape = shapes[(parseInt(n)+1)]
    if (counter < 3) {
        nextShape = shapes[(parseInt(n)+1)]
    } else {
        nextShape = shapes[(parseInt(n)-3)]
    }
    turn = true
    for(var row = 0; row < nextShape.length; row++){
        //for each collumn in that row
        for(var index = 0; index < nextShape.length; index++){
            //if that location is filled (equals 1)
            console.log("row/index" + row + " , " + index)
            console.log("next - " + nextShape[row][index])
            console.log("back - " + backTable[row + current.position.y][index + current.position.x])
            if(nextShape[row][index] == 1 && backTable[row + current.position.y][index + current.position.x] == 1 || nextShape[row][0] == 1 && (index + current.position.x - 1) <= -2 ){
                //draw that position to the backboard
                console.log("CANT TURN")
                turn = false
            }else{
                console.log("TURN")
            }
        }
    }
    if(turn == true){
        return true
    }else{
        return false
    }
}


document.onkeypress = function(key) {
    if (key.keyCode == 97) {
        if (checkLHS()) {
            current.position.x -= 1;
        }
        ;
        fill();
    }
    else if (key.keyCode == 100) {
        if (checkRHS()) {
            current.position.x += 1;
        }
        ;
        fill()
    }
    else if (key.keyCode == 115) {
        drop()
        fill();
    }
    else if (key.keyCode == 119) {
        if (checkRotate()){
            if (counter < 3) {
                n++;
                counter++
            } else {
                counter = 0;
                n -= 3
            }
            current.shape = shapes[n]
            fill()
        }
    };
};
fill();


