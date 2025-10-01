const board = document.getElementById("sudoku-board");
const numberButtons = document.querySelectorAll(".number-button");
const clearButton = document.getElementById("clear-button");
const solveButton = document.getElementById("solve-button");

let selectedCell = null;
let boardState = Array(9).fill().map(() => Array(9).fill(null));

function createBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", () => selectCell(cell));
            board.appendChild(cell);
        }
    }
}

function selectCell(cell) {
    if (selectedCell) {
        selectedCell.classList.remove("selected");
    }
    selectedCell = cell;
    selectedCell.classList.add("selected");
}

function updateCell(value) {
    if (selectedCell) {
        const row = selectedCell.dataset.row;
        const col = selectedCell.dataset.col;
        boardState[row][col] = value;
        selectedCell.textContent = value || "";
    }
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value === "clear" ? null : parseInt(button.dataset.value);
        updateCell(value);
    });
});

clearButton.addEventListener("click", () => {
    if (selectedCell) {
        updateCell(null);
    }
});

solveButton.addEventListener("click", () => {
    if (solveSudoku(boardState)) {
        renderBoard();
    } else {
        alert("No solution exists!");
    }
});

function renderBoard() {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = board.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            cell.textContent = boardState[row][col] || "";
        }
    }
}

function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === null) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = null;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

createBoard();

renderBoard();

