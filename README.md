# Jogo da Cobrinha

## Visão Geral

O **Jogo da Cobrinha** é uma implementação moderna do clássico jogo "Snake", utilizando tecnologias web – HTML5, CSS3 e JavaScript. O jogo é renderizado em um elemento `<canvas>` e apresenta uma série de funcionalidades interativas, como movimentação dinâmica da cobra, geração aleatória de alimentos com cores vibrantes e detecção de colisões (tanto com as paredes quanto com o próprio corpo). Além disso, conta com um sistema de pontuação, uma tela de menu para início/reinício e efeitos sonoros que enriquecem a experiência do usuário.

Este projeto foi desenvolvido com foco na aplicação de conceitos fundamentais de manipulação do DOM, uso do Canvas e gerenciamento de eventos, evidenciando boas práticas de programação e design de interfaces interativas.

## Funcionalidades

- **Movimentação da Cobra:**  
  A cobra se move pelo grid de forma fluida e intuitiva, respondendo aos eventos de teclado (setas direcionais) e evitando movimentos diretos de inversão.

- **Geração de Alimentos:**  
  Os alimentos são gerados em posições aleatórias e possuem cores aleatórias, criando uma dinâmica visual agradável e estimulante.

- **Sistema de Pontuação:**  
  A pontuação é incrementada a cada alimento ingerido, proporcionando feedback imediato ao jogador.

- **Detecção de Colisões:**  
  O jogo termina se a cobra colidir com as bordas do canvas ou se bater em si mesma, acionando uma tela de Game Over que exibe a pontuação final.

- **Interface de Menu:**  
  Um menu intuitivo permite ao jogador iniciar ou reiniciar o jogo. Ao final de uma partida, a pontuação final é exibida com um efeito visual de blur aplicado ao canvas.

- **Efeitos Sonoros e Visuais:**  
  Utilização de áudio para incrementar a experiência durante a alimentação e efeitos de sombra para realçar os elementos gráficos.

## Tecnologias Utilizadas

- **HTML5:** Estrutura básica da aplicação e o elemento `<canvas>` para renderização.
- **CSS3:** Estilização do layout, menu e elementos interativos.
- **JavaScript:** Lógica do jogo, manipulação do canvas, eventos de teclado e controle do fluxo do jogo.

## Estrutura do Projeto

```
/Snake
├── index.html
├── /css
    └── style.css
├── /js
    └── script.js
└── /assets
    └── audio3.mp3
```

> **Observação:** Caso seja necessário, os arquivos `index.html` e `style.css` podem ser consultados para uma compreensão completa do layout e da interface do jogo.

## Como Executar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/AkyLast/Snake.git
   ```
2. **Acesse a pasta do projeto:**
   ```bash
   cd Snake
   ```
3. **Abra o arquivo `index.html` em um navegador moderno:**
   - Utilize Chrome, Firefox, Edge ou outro de sua preferência.

## Detalhamento do Código (script.js)

O arquivo `script.js` contém toda a lógica do jogo. A seguir, destacamos e explicamos os principais trechos do código:

### Inicialização e Seleção de Elementos
```js
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const score = document.querySelector('.score--value');
    const finalScore = document.querySelector(".final-score > span");
    const menu = document.querySelector(".menu-screen");
    const buttonPlay = document.querySelector(".btn-play");

    const audio = new Audio('../assets/audio.mp3');
    const size = 30;
    let snake = [{ x: 210, y: 210 }];
```
*Explicação:*  
Após o carregamento do DOM, os elementos essenciais são selecionados: o canvas para renderização, elementos de pontuação e menu, além do áudio que acompanha a ação do jogo.

### Funções Auxiliares

- **Incremento de Pontuação:**
  ```js
  const incrementScore = () => {
      score.innerText = +score.innerText + 10;
  }
  ```
  Atualiza a pontuação do jogador a cada alimento ingerido.

- **Geração de Números e Posições Aleatórias:**
  ```js
  const randomNum = (min, max) => {
      return Math.round(Math.random() * (max - min) + min);
  }
  const randomPosition = () => {
      let number = randomNum(0, canvas.width - size);
      return Math.round(number / 30) * 30;
  }
  ```
  Gera valores aleatórios para posicionar os alimentos de forma alinhada com o grid.

- **Geração de Cores Aleatórias:**
  ```js
  const randomColor = () => {
      const red = randomNum(0, 255);
      const green = randomNum(0, 255);
      const blue = randomNum(0, 255);
      return `rgb(${red}, ${green}, ${blue})`;
  }
  ```
  Gera cores aleatórias para os alimentos, aumentando a dinâmica visual.

### Manipulação dos Elementos do Jogo

- **Definição do Alimento:**
  ```js
  const food = {
      x: randomPosition(),
      y: randomPosition(),
      color: randomColor()
  }
  const drawFood = () => {
      const { x, y, color } = food;
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, size, size);
      ctx.shadowBlur = 0;
  }
  ```
  Define um objeto `food` com propriedades geradas aleatoriamente e uma função para desenhá-lo no canvas com efeitos de sombra.

- **Desenho da Cobra:**
  ```js
  const drawSnake = () => {
      ctx.fillStyle = '#ddd';
      snake.forEach((position, index) => {
          if (index == snake.length - 1) {
              ctx.fillStyle = 'white'; // Destaca a cabeça da cobra
          }
          ctx.fillRect(position.x, position.y, size, size);
      });
  }
  ```
  Desenha cada segmento da cobra, diferenciando a cabeça para facilitar a visualização.

- **Movimentação da Cobra:**
  ```js
  const moveSnake = () => {
      if (!direction) return;
      const head = snake[snake.length - 1];
      snake.shift(); // Remove o segmento mais antigo

      if (direction == 'right'){
          snake.push({ x: head.x + size, y: head.y });
      }
      if (direction == 'left'){
          snake.push({ x: head.x - size, y: head.y });
      }
      if (direction == 'up'){
          snake.push({ x: head.x, y: head.y - size });
      }
      if (direction == 'down'){
          snake.push({ x: head.x, y: head.y + size });
      }
  }
  ```
  Atualiza a posição da cobra com base na direção definida pelo usuário.

- **Desenho do Grid:**
  ```js
  const drawGrid = () => {
      ctx.lineWidth = 1;
      ctx.strokeStyle = '191919';
      for (i = 30; i < canvas.width; i += 30) {
          ctx.beginPath();
          ctx.lineTo(i, 0);
          ctx.lineTo(i, 600);
          ctx.stroke();

          ctx.beginPath();
          ctx.lineTo(0, i);
          ctx.lineTo(600, i);
          ctx.stroke();
      }
  }
  ```
  Desenha linhas que formam um grid no canvas, auxiliando na visualização do espaço de jogo.

### Lógica do Jogo

- **Verificação de Consumo de Alimento:**
  ```js
  const chackEat = () => {
      const head = snake[snake.length - 1];
      if (head.x == food.x && head.y == food.y) {
          snake.push(head); // Cresce a cobra
          audio.play();
          incrementScore();

          let x = randomPosition();
          let y = randomPosition();
          while (snake.find((position) => position.x == x && position.y == y)) {
              x = randomPosition();
              y = randomPosition();
          }
          food.x = x;
          food.y = y;
          food.color = randomColor();
      }
  }
  ```
  Detecta se a cobra consumiu o alimento, aumentando seu tamanho e a pontuação, além de reposicionar o alimento.

- **Verificação de Colisões:**
  ```js
  const chackCollision = () => {
      const head = snake[snake.length - 1];
      const canvasLimit = canvas.width - size;
      const neckIndex = snake.length - 2;
      const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;
      const selfCollision = snake.find((position, index) => {
          return index < neckIndex && position.x == head.x && position.y == head.y;
      });
      if (wallCollision || selfCollision) {
          gameOver();
      }
  }
  ```
  Detecta colisões com as bordas do canvas ou consigo mesma, finalizando o jogo.

- **Finalização do Jogo:**
  ```js
  const gameOver = () => {
      direction = undefined;
      menu.style.display = 'flex';
      finalScore.innerText = score.innerText;
      canvas.style.filter = "blur(2px)";
  }
  ```
  Encerra o jogo, exibe a tela de menu e mostra a pontuação final.

- **Loop Principal do Jogo:**
  ```js
  const gameLoop = () => {
      clearInterval(loopId);
      ctx.clearRect(0, 0, 600, 600);
      chackEat();
      drawFood();
      drawGrid();
      moveSnake();
      drawSnake();
      chackCollision();
      loopId = setInterval(() => {
          gameLoop();
      }, 200);
  }
  gameLoop();
  ```
  O loop principal atualiza o canvas a cada 200 milissegundos, mantendo o fluxo do jogo.

### Controle e Interatividade

- **Eventos de Teclado:**
  ```js
  document.addEventListener("keydown", ({ key }) => {
      if (key == 'ArrowRight' && direction != "left"){
          direction = 'right';
      }
      if (key == 'ArrowLeft' && direction != "right"){
          direction = 'left';
      }
      if (key == 'ArrowUp' && direction != "down"){
          direction = 'up';
      }
      if (key == 'ArrowDown' && direction != "up"){
          direction = 'down';
      }
  });
  ```
  Captura os eventos de teclado para controlar a direção da cobra, garantindo que não haja inversão direta.

- **Reinício do Jogo:**
  ```js
  buttonPlay.addEventListener("click", () => {
      score.innerText = '00';
      menu.style.display = 'none';
      canvas.style.filter = 'none';
      snake = [{ x: 210, y: 210 }];
  });
  ```
  Ao clicar no botão "Play", o jogo é reiniciado e a tela de menu é ocultada.

## Conclusão

Este projeto demonstra a implementação de um clássico jogo da cobrinha utilizando tecnologias web modernas. Através de uma estrutura modular e código bem documentado, foram aplicados conceitos essenciais de manipulação do DOM, renderização gráfica com Canvas e gerenciamento de eventos. Este projeto não só evidencia habilidades em JavaScript, HTML e CSS, mas também destaca a capacidade de criar aplicações interativas e responsivas, aspectos altamente valorizados no mercado de desenvolvimento web.

## Autor

- Luis Fernando Ribeiro Curvelo 
[98 99613-5456 / [LinkedIn](www.linkedin.com/in/luisfernandoribeirocurvelo) / [GitHub](https://github.com/AkyLast)]

