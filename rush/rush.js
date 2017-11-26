var canvas = document.getElementById('rush');
var cont = canvas.getContext('2d');
cont.scale(20, 20);

var shapes =
    [
        [1,1],
        [1,1]
    ];

//initialise
function fill(){
    cont.fillStyle ="#000";
    cont.fillRect(0,0,canvas.width,canvas.height);
}

function draw(shape) {
    for(var row = 0; row = shape.rows[row]; row++){
        for(var index = 0; index = shape.cells[index]; index++){
            if(index == 1){
                cont.fillStyle = "#FFEE00";
                cont.fillRect(row,index,1,1)
            }
        }
    }

}



var current ={
    shape: shapes[0]
};

draw(current.shape)