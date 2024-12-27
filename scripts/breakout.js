// Inspired by: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript

const canvas = document.getElementById("breakoutCanvas");
const startMouseButton = document.getElementById('startMouse');
const startKeyboardButton = document.getElementById('startKeyboard');
const ctx = canvas.getContext("2d");
const paddleHeight = 12;
const paddleWidth = 75;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 15;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];
let ballRadius = 10;
let brickRowCount = 3;
let paddleX = (canvas.width - paddleWidth) / 2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let rightPressed;
let leftPressed;
let interval = 0;
let score = 0;
let level = 1;
let levelScore = 0;
let direction = "";
let oldx = 0;

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight * 2, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "lightgreen";
    ctx.fill();
    ctx.closePath();
}

function drawScoreAndLevel() {
    ctx.font = "16px Monospace";
    ctx.fillStyle = "lightgreen";
    ctx.fillText(`Score: ${score}`, 8, 20);
    ctx.fillText(`Level: ${level}`, 400, 20);
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status != 0) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                switch(bricks[c][r].status){
                    case 1:
                        ctx.fillStyle = "lightgreen";
                        break;
                    case 2:
                        ctx.fillStyle = "green";
                        break;
                    case 3:
                        ctx.fillStyle = "darkgreen";
                        break;
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status != 0){
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status--;
                    if (b.status === 0){
                        score++;
                        levelScore++;
                        if (levelScore === brickRowCount * brickColumnCount){
                            level++;
                            if (level < 11){
                                promptNextLevel();
                            }
                            else{
                                endGame(true);
                            }
                        }
                    }
                }
            }

        }
    }
}

function initializeBricks(brickResistance) {
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: brickResistance };
        }
    }
}

function promptNextLevel() {
    clearInterval(interval);
    var timeleft = 3;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    showSuccess();
    var timer = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(timeleft <= 0){
            clearInterval(timer);
            goToNextLevel();
        } else{
            showSuccess();
            ctx.fillText(`Level ${level} starts in: ${timeleft}`, 130, 230);
        }
        timeleft -= 1;
        }, 1000);
}

function showSuccess() {
    ctx.fillText(`Well done!`, 130, 180);
    ctx.fillText(`Current Score: ${score}`, 130, 200);
}

function goToNextLevel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    levelScore = 0;
    var brickResistance = level < 5 ? 1 : 2;
    if (level < 8) {
        ballRadius = ballRadius / 1.1;
        brickRowCount++;
    }
    else
        brickResistance = 3;
    initializeBricks(brickResistance);
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = Math.abs(dx) + 0.2;
    dy = -dx;
    interval = setInterval(draw, 10);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScoreAndLevel();
    collisionDetection();

    // Logic to bounce the ball if it hits left or right corners
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // Logic to bounce the ball if it hits the top corner
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    // Logic to bouce the ball if it hits the paddle or end the game if it hits the bottom
    else if (y + dy > canvas.height - paddleHeight - ballRadius){
        if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
                // Logic to change ball direction depending on the position of the paddle
                if(rightPressed || direction === "right"){
                    dx = Math.abs(dx);
                }
                else if((leftPressed || direction === "left") && dx > 0){
                    dx = -dx;
                }
            } else {
                endGame(false);
            }
    }

    if (rightPressed) {
        paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
    } else if (leftPressed) {
        paddleX = Math.max(paddleX - 7, 0);
    }

    x += dx;
    y += dy;
}

function endGame(success) {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timeleft = 3;
    showResult(success);
    var timer = setInterval(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(timeleft <= 0){
            document.location.reload();
            clearInterval(interval);
        } else{
            showResult(success);
            ctx.fillText(`Restarting in: ${timeleft}`, 160, 230);
        }
        timeleft -= 1;
        }, 1000);
}

function showResult(success){
    if(success){
        ctx.fillText(`YOU WIN!`, 195, 160);
        ctx.fillText(`Score: ${score}`, 160, 200);
    } else{
        ctx.fillText(`GAME OVER!`, 185, 210);
    }
}


function playWithKeyboard() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    startGame();
}

function playWithMouse() {
    document.addEventListener("mousemove", mouseMoveHandler, false);
    startGame();
}

function startGame() {
    initializeBricks(1);
    document.getElementById("gameMenu").style.display = "none";
    interval = setInterval(draw, 10);
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    // Determine if mouse is moving left or right
    if (e.pageX < oldx) {
        direction = "left"
    } else if (e.pageX > oldx) {
        direction = "right"
    }
    oldx = e.pageX;

    // Define paddle position
    const relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

startMouseButton.addEventListener("click", function () {
    playWithMouse();
});

startKeyboardButton.addEventListener("click", function () {
    playWithKeyboard();
});