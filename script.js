
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const grid = 20;
let count = 0;
let snake = [{ x: 160, y: 160 }];
let dx = grid;
let dy = 0;
let food = { x: 320, y: 320 };

function gameLoop() {
  requestAnimationFrame(gameLoop);

  if (++count < 4) return;
  count = 0;

  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food.x = Math.floor(Math.random() * 20) * grid;
    food.y = Math.floor(Math.random() * 20) * grid;
  } else {
    snake.pop();
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  snake.forEach(part => ctx.fillRect(part.x, part.y, grid - 1, grid - 1));

  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    resetGame();
  }

  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      resetGame();
    }
  }
}

function resetGame() {
  snake = [{ x: 160, y: 160 }];
  dx = grid;
  dy = 0;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && dx === 0) {
    dx = -grid;
    dy = 0;
  } else if (e.key === "ArrowUp" && dy === 0) {
    dy = -grid;
    dx = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = grid;
    dy = 0;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dy = grid;
    dx = 0;
  }
});

requestAnimationFrame(gameLoop);
