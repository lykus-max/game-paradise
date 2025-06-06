
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkResult();
}

function checkResult() {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let combo of wins) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      return;
    }
  }

  if (!board.includes(null)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
