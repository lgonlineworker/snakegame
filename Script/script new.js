let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 16;
let snake = [];
snake[0] = {
    x: 16 * box,
    y: 16 * box
}
let direction = "up";
let food = {
    x: Math.floor(Math.random() * 31 + 1) * box,
    y: Math.floor(Math.random() * 31 + 1) * box
}

let colors = ["red", "darkcyan", "yellow", "rebeccapurple", "orangered", "deeppink", "darkblue", "gray", "aqua", "indigo", "black"];
let colorFood = colors[0];

let score = 0;
let point = 0;
let speed = 1000;


//Botões

var easyBt = document.getElementById("easy");
var mediumBt = document.getElementById("medium");
var hardBt = document.getElementById("hard");
var specialBt = document.getElementById("special");
var restartBt = document.getElementById("restart");
var points = document.getElementById("numberScore");

restartBt.hidden = true;
easyBt.addEventListener('click', easyLevel);
mediumBt.addEventListener('click', mediumLevel);
hardBt.addEventListener('click', hardLevel);
//specialBt.addEventListener('click', specialLevel);

// Funçoes do jogo

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 32 * box, 32 * box);
}

function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
   
    context.fillStyle = colorFood;
    context.fillRect(food.x, food.y, box, box);
}

function backToCanvas(){
    if(snake[0].x > 32 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 32 * box;
    if(snake[0].y > 32 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 32 * box;
}

function shockYourself(){
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake [i].y){
            endGame()
        }
    }
}

document.addEventListener('keydown', update);
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
    
}

function makePoint(){
    if (speed >= 500) point = 1
    if (speed <= 500 && speed >= 300) point = 3
    if (speed <= 300 && speed >= 200) point = 5
    if (speed <= 200 && speed >= 0) point = 7
    if (speed <= 100 && speed >= -100) point = 10
    if (speed <= -100 && speed >= -300) point = 20
    if (speed <= -500) point = 50
    score +=point;    
    points.innerHTML = score;
}

function increaseSpeed(){
    clearInterval(playGame);
    speed -=5;
    playGame = setInterval(iniciarJogo, speed);
}

function endGame(){
    clearInterval(playGame);
    restartBt.hidden = false;
    restartBt.addEventListener('click', restart);
}

function restart(){
    snake.splice(1,snake.length);
    snake[0] = {
        x: 16 * box,
        y: 16 * box
    }
    score = 0;
    points.innerHTML = score;
    point = 0;
    speed = 1000;
    playGame = setInterval(iniciarJogo, speed);
    easyBt.hidden = false;
    mediumBt.hidden = false;
    hardBt.hidden = false;
    specialBt.hidden = false;
    restartBt.hidden = true;
}

//Níveis
function easyLevel(){
    clearInterval(playGame);
    speed -= 400;
 //   point +=1;
    playGame = setInterval(iniciarJogo, speed);
    easyBt.hidden = true;
    mediumBt.hidden = true;
    hardBt.hidden = true;
    specialBt.hidden = true;
    canvas.focus();
}

function mediumLevel(){
    clearInterval(playGame);
    speed -= 700;
 //   point +=3;
    playGame = setInterval(iniciarJogo, speed);
    easyBt.hidden = true;
    mediumBt.hidden = true;
    hardBt.hidden = true;
    specialBt.hidden = true;
    canvas.focus();
}

function hardLevel(){
    clearInterval(playGame);
    speed -= 850;
  //  point +=7;
    playGame = setInterval(iniciarJogo, speed);
    easyBt.hidden = true;
    mediumBt.hidden = true;
    hardBt.hidden = true;
    specialBt.hidden = true;
    canvas.focus();
}

/*function specialLevel(){
    clearInterval(playGame);
    speed += 200;
    setInterval(iniciarJogo, speed)
    easyBt.hidden = true;
    mediumBt.hidden = true;
    hardBt.hidden = true;
    specialBt.hidden = true;
    canvas.focus();
}*/



//Iniciar jogo

function iniciarJogo(){

    backToCanvas();
    shockYourself();
    
    criarBG();
    criarCobrinha();
    drawFood();
   

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    //Function eatFood
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{food.x = Math.floor(Math.random() * 31 + 1) * box;
        food.y = Math.floor(Math.random() * 31 + 1) * box;
        colorFood = colors[Math.floor(Math.random() * 10 + 1)];
        makePoint();
        increaseSpeed();
    } 
        
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

}

let playGame = setInterval(iniciarJogo, speed);
