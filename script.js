var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

myCanvas.width = width = 300;
myCanvas.height = height = 600;

var rows = 18;
var columns = 9;

var blockSize = height/rows;

var world = [];

var curPos = [1, 4];

var score = 0;

function sum(array){
	var sum = 0;
	for(var j = 0; j < array.length; j++){
		sum += array[j]
	}
	return sum
}

function buildArray(){
	for(var row = 0; row < rows; row++){
		world[row] = [];
		for(var column = 0; column < columns; column++){
			world[row][column] = 0;
		}
	}
}

function drawWorld(){
	ctx.beginPath();
	for(var row = 0; row < rows; row++){
		for(var column = 0; column < columns; column++){
			if(world[row][column] == 0){
				ctx.rect(column*blockSize, row*blockSize, blockSize, blockSize);
				ctx.stroke();
			}else if(world[row][column] == 1){
				ctx.rect(column*blockSize, row*blockSize, blockSize, blockSize);
				ctx.fillStyle = "#FF0000";
				ctx.fillRect((column*blockSize)+5, (row*blockSize)+5, blockSize-10, blockSize-10);
				ctx.stroke();
			}else if(world[row][column] == 2){
				ctx.rect(column*blockSize, row*blockSize, blockSize, blockSize);
				ctx.fillStyle = "#FF0000";
				ctx.fillRect((column*blockSize)+5, (row*blockSize)+5, blockSize-10, blockSize-10);
				ctx.stroke();
			}
		}
	}
}

function putObjs(){
	for(var i = 0; i < objects.length; i++){ 
		world[objects[i][1]][objects[i][0]] = 2;
	}
}

function move(e){
	console.log(e.keyCode);
	if(e.keyCode == 37){
		if(curPos[1]-1 >= 0){
			world[curPos[0]][curPos[1]] = 0;
			curPos[1]--;
			world[curPos[0]][curPos[1]] = 1;
		}
	}else if(e.keyCode == 39){
		if(curPos[1]+1 < columns){
			world[curPos[0]][curPos[1]] = 0;
			curPos[1]++;
			world[curPos[0]][curPos[1]] = 1;
		}
	}
}

function moveDown(){
	if(curPos[0]+1 < rows){
		if(world[curPos[0]+1][curPos[1]] == 0){
			world[curPos[0]][curPos[1]] = 0;
			curPos[0]++;
			world[curPos[0]][curPos[1]] = 1;
		}else{
			world[curPos[0]][curPos[1]] = 2;
			curPos = [1, 4];
			clearRow();
		}
	}else{
		world[curPos[0]][curPos[1]] = 2;
		curPos = [1, 4];
		clearRow();
	}
}

function clearRow(){
	for(var i = 0; i < world.length; i++){
		if(sum(world[i]) == columns*2){
			world.splice(i, 1);
			world.unshift([]);
			for(var column = 0; column < columns; column++){
				world[0][column] = 0;
			}
			score += 100;
		}
	}
}


//////PROGRAM\\\\\
buildArray();

addEventListener("keydown", move);

setInterval(loop, 200);

function loop(){
	ctx.clearRect(0, 0, width, height);
	drawWorld();
	moveDown();
	document.getElementById("score").innerHTML = score;
}

