let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 16;
let snake = [];
snake[0] = {
    x: 16 * box,
    y: 16 * box
}
let direction = "" 
let food = {
    x: Math.floor(Math.random() * 31 + 1) * box,
    y: Math.floor(Math.random() * 31 + 1) * box
}


let colors = ["red", "darkcyan", "yellow", "rebeccapurple", "orangered", "deeppink", "chartreuse", "gray", "aqua", "indigo", "black"]
let colorFood = colors[0]

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

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
    
}


//Iniciar jogo

function iniciarJogo(){
    if(snake[0].x > 32 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 32 * box;
    if(snake[0].y > 32 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 32 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake [i].y){
            clearInterval(jogo)
            alert ('Game Over :( ')
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "down") snakeY += box;
    if(direction == "up") snakeY -= box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{food.x = Math.floor(Math.random() * 31 + 1) * box;
        food.y = Math.floor(Math.random() * 31 + 1) * box;
        colorFood = colors[Math.floor(Math.random() * 10 + 1)]
    } 
    
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)

}

let jogo = setInterval(iniciarJogo, 100)
