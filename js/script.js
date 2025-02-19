document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const score = document.querySelector('.score--value')
    const finalScore = document.querySelector(".final-score > span")
    const menu = document.querySelector(".menu-screen")
    const buttonPlay = document.querySelector(".btn-play")

    const audio = new Audio('../assets/audio.mp3')

    const size = 30;

    let snake =  [{x : 210, y : 210}];

    const incrementScore = () => {
        score.innerText = +score.innerText + 10
    }

    const randomNum = (min, max) => {
        return Math.round(Math.random() * (max - min) + min);
    }
    
    const randomPosition = () => {
        let number = randomNum(0, canvas.width - size);
        return Math.round(number / 30) * 30;
    }

    const randomColor = () => {
        const red = randomNum(0, 255)
        const green = randomNum(0, 255)
        const blue = randomNum(0, 255)

        return `rgb(${red}, ${green}, ${blue})`
    }

    const food = {
        x: randomPosition(),
        y: randomPosition(),
        color: randomColor()
    }

    const drawFood = () => {
        const {x, y, color} = food
 
        ctx.shadowColor = color
        ctx.shadowBlur = 8
        ctx.fillStyle = color;
        ctx.fillRect(x, y, size, size)
        ctx.shadowBlur = 0
    }
    
    let direction, loopId = "";

    const drawSnake = () => {
        ctx.fillStyle = '#ddd'
        
        snake.forEach((position, index) => {
            if(index == snake.length - 1){
                ctx.fillStyle = 'white'
            }

            ctx.fillRect(position.x, position.y, size, size);
        })
    }

    const moveSnake = () => {
        if(!direction) return

        const head = snake[snake.length - 1];

        snake.shift()

        if (direction == 'right'){
            snake.push({x: head.x + size, y: head.y})
        }

        if (direction == 'left'){
            snake.push({x: head.x - size, y: head.y})
        }
        if (direction == 'up'){
            snake.push({x: head.x, y: head.y - size})
        }
        if (direction == 'down'){
            snake.push({x: head.x, y: head.y + size})
        }
    }

    const drawGrid = () => {
        ctx.lineWidth = 1 //largura
        ctx.strokeStyle = '191919'

        for(i = 30; i < canvas.width; i += 30){
            ctx.beginPath()
            ctx.lineTo(i, 0)
            ctx.lineTo(i, 600)
            ctx.stroke()

            ctx.beginPath()
            ctx.lineTo(0, i)
            ctx.lineTo(600, i)
            ctx.stroke()
        }
    }

    const chackEat = () => {
        const head = snake[snake.length - 1]
        if(head.x == food.x && head.y == food.y){
            snake.push(head)
            audio.play()

            incrementScore()

            let x = randomPosition()
            let y = randomPosition()

            while (snake.find((position) => position.x == x & position.y == y)){
                x = randomPosition()
                y = randomPosition()
            }

            food.x = x
            food.y = y
            food.color = randomColor()
        }
    }

    const chackCollision = () => {
        const head = snake[snake.length - 1]
        const canvasLimit = canvas.width - size
        const neckIndex = snake.length - 2 // na hora do selfCollision tá passando que a cabeça tá na cabeça e buga, esse parametro faz analisar do da cabeça pra baixo

        const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head. y > canvasLimit
        const selfCollision = snake.find((position, index) => {
            return index < neckIndex && position.x == head.x && position.y == head.y
        })

        if(wallCollision || selfCollision){
            gameOver()
        }
    }

    const gameOver = () => {
        direction = undefined

        menu.style.display = 'flex'
        finalScore.innerText = score.innerText
        canvas.style.filter = "blur(2px)"
    }

    const gameLoop = () => {
        clearInterval(loopId);

        ctx.clearRect(0, 0, 600, 600)
        chackEat()
        drawFood()
        drawGrid()
        moveSnake()
        drawSnake()
        chackCollision()

        loopId = setInterval(() => {
            gameLoop()
        }, 200)
    }

    gameLoop()

    document.addEventListener("keydown", ({key}) => {
        if(key == 'ArrowRight' && direction != "left"){
            direction = 'right'
        }
        if(key == 'ArrowLeft' && direction != "right"){
            direction = 'left'
        }
        if(key == 'ArrowUp' && direction != "down"){
            direction = 'up'
        }
        if(key == 'ArrowDown' && direction != "up"){
            direction = 'down'
        }
    })

    buttonPlay.addEventListener("click", () => {
        score.innerText = '00'
        menu.style.display = 'none'
        canvas.style.filter = 'none'

        snake =  [{x : 210, y : 210}]
    })

});

