document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const turnIndicator = document.getElementById("turnIndicator");
    const resetButton = document.getElementById("resetButton");
    const winnerAlert = document.getElementById("winnerAlert");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Winning combinations
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    // Handle cell click
    function handleCellClick(event) {
        const index = event.target.getAttribute("data-index");

        if (board[index] || !gameActive) return; // Prevents overwriting

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner(currentPlayer)) {
            winnerAlert.textContent = `Player ${currentPlayer} Wins! 🎉`;
            winnerAlert.classList.add("show");
            winnerAlert.style.display = "block";
            gameActive = false;
            return;
        }

        if (!board.includes("")) {
            winnerAlert.textContent = "It's a Draw! 🤝";
            winnerAlert.classList.add("show");
            winnerAlert.style.display = "block";
            gameActive = false;
            return;
        }

        // Switch turns
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnIndicator.textContent = `Player ${currentPlayer}'s Turn`;
    }

    // Check winner function
    function checkWinner(player) {
        return winPatterns.some(pattern => 
            pattern.every(index => board[index] === player)
        );
    }

    // Reset game function
    function resetGame() {
        board.fill("");
        gameActive = true;
        currentPlayer = "X";
        turnIndicator.textContent = "Player X's Turn";
        winnerAlert.style.display = "none";
        cells.forEach(cell => cell.textContent = "");
    }

    // Event listeners
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
