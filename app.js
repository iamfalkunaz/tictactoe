let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // Player O starts the game

// 2D array of win patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Reset the game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

// Add click listeners to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box was clicked");

        if (turnO) {
            box.innerText = "O";
            box.classList.add("player-one"); // Add Player One (O) color class
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("player-two"); // Add Player Two (X) color class
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and reset their state
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("player-one", "player-two"); // Remove any player-specific classes
    }
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is : ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Check for a winner or a draw
const checkWinner = () => {
    let isDraw = true; // Assume it's a draw until proven otherwise

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner", pos1Val);
                showWinner(pos1Val);
                return; // Exit the function as we have a winner
            }
        }
    }

    // Check if all boxes are filled
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false; // Not a draw if any box is still empty
            break;
        }
    }

    if (isDraw) {
        // If no winner and all boxes are filled, it's a draw
        showDraw();
    }
};

// Show draw message
const showDraw = () => {
    msg.innerText = `It's a draw! Try again.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// Attach event listeners to the buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
