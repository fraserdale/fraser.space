var canvas = document.getElementById('rush');
var cont = canvas.getContext('2d');
cont.scale(20, 20);

var shapes =[
    [0,0,0],
    [1,1,1],
    [0,0,1]
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
            //console.log(shape[row][index]);
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
    },
};

function minwidth(shape){
    var first = false
    var count = 0
    while (first == false && count < (shape.length -1)){
        for(var row = 0; row < shape.length; row++){
            console.log("length " + shape[0].length)
            //console.log(row);
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
        for(var row = 0; row < shape.length; row++){
            console.log("length " + shape[0].length)
            //console.log(row);
            if(shape[row][shape.length -1 ] == 1){ //use - 1, i know the array will always be a square
                console.log("Last value filled.")
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
    if((current.position.x >= 11 - maxwidth(current.shape)) ){
        //console.log("edge found")
        return false;
    }
    else if ((current.position.x < 11 - maxwidth(current.shape)) ){
        return true
    }
}

function checkLHS(){
    console.log(current.position.x + minwidth(current.shape))
    if((current.position.x > 0 - minwidth(current.shape)) ){
        //console.log("edge found")
        return true;
    }
    else if ((current.position.x <= 0 - minwidth(current.shape)) ){
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


document.onkeypress = function(k){
    if(k.keyCode == 97){
        console.log("a");
        if (checkLHS()){
            current.position.x -= 1;
        };
        //current.position.x -= 1;
        console.log(current.position);
        fill();}
    else if(k.keyCode == 100){
        console.log("d");
        if (checkRHS()){
            current.position.x += 1;
        };
        //current.position.x += 1;
        console.log(current.position);
        fill()}
    else if(k.keyCode == 115){
        console.log("s");
        if(current.position.y - checkBottom() < 17){
            current.position.y += 1;
        }
        console.log(current.position);
        fill();}
    else if(k.keyCode == 119){
        console.log("w")}
};
fill();
//testing to make sure correct array is showin
//console.log(current.shape[0])
//console.log(current.shape[0][0])