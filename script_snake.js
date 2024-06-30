const doc = document
const canvas = doc.createElement('canvas');
doc.body.appendChild(canvas);
const fillStyle = 'fillStyle'
const fillRect = 'fillRect'

const width = 800
const height = 600
const gridSize = 20

canvas.width = width;
canvas.height = height;

const bottom = height / gridSize
const right = width / gridSize

let dx = 0
let dy = 0
let snake = [{ x: right / 2, y: bottom / 2 }]
let fruit = {}

const flooredRandom = (max) => {
    return Math.floor(Math.random() * max)
}

const ctx = canvas.getContext('2d')
const interval = setInterval(() => {
    //Clear the screen
    ctx[fillStyle] = '#000'
    ctx[fillRect](0, 0, width, height)


    //Place the fruit
    if (!fruit.x) {
        fruit = {
            x: flooredRandom(right),
            y: flooredRandom(bottom)
        }
    }

    //Draw the fruit
    ctx[fillStyle] = 'red'
    ctx[fillRect](fruit.x * gridSize, fruit.y * gridSize, gridSize, gridSize)
    //Move the snake forward
    let head = snake[0]
    head = { x: head.x + dx, y: head.y + dy }
    snake = [head, ...snake]

    //Eat the fruit
    if (head.x == fruit.x && head.y == fruit.y) {
        fruit = {}
    } else {
        //Make the snake shrink
        snake.pop()
    }

    let dead = false
    //Draw the snake
    ctx[fillStyle] = '#FFF'
    ctx.font = "25px monospace";
    ctx.fillText(snake.length, 10, 30);
    for (const [i, snakeSquare] of snake.entries()) {
        //have we eater ourselves
        dead = dead || i && snakeSquare.x == head.x && snakeSquare.y == head.y
        ctx[fillRect](snakeSquare.x * gridSize, snakeSquare.y * gridSize, gridSize, gridSize)
    }

    //Are we dead
    if (dead || head.x < 0 || head.x >= right || head.y < 0 || head.y >= bottom) {
        clearInterval(interval)
        alert("💀")
        location.reload()
    }
}, 150)

addEventListener("keypress", (e) => {
    dx = 0
    dy = 0
    const k = e.key
    if (k == 'w') {
        dy = -1
    }
    if (k == 's') {
        dy = 1
    }
    if (k == 'a') {
        dx = - 1
    }
    if (k == 'd') {
        dx = 1
    }
});