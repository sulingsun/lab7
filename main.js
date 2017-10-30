//Element nodes
const buttons = document.getElementsByClassName('btn-choice');
const playerScoreText = document.getElementById('playerScoreText');
const computerScoreText = document.getElementById('computerScoreText');
const resetBtn = document.getElementById('resetBtn');
const roundResultText = document.getElementById('roundResultText');
const roundResultPlays = document.getElementById('roundResultPlays');


//Event Listeners
for (let i = 0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', function(event){
        let playerChoice = event.currentTarget.getAttribute('data-option');
        playRound(playerChoice);
    });
}

resetBtn.addEventListener('click', function(event){
    resetGame();
});


//Variables for the game
const choices = ["Rock", "Paper", "Scissors"];
var playerScore = 0;
var computerScore = 0;
const winningScore = 10;


//Play a round of Rock, Paper, Scissors
function playRound(playerChoice) {
    let randomIndex = Math.floor(Math.random() * (choices.length));
    var computerChoice = choices[randomIndex];

    window.computerChoice = computerChoice;
    window.playerChoice = playerChoice;

    if(playerChoice == computerChoice) {
        resultText("tie");
        return;
    }

    if(playerChoice == "Rock") {
        if(computerChoice == "Scissors") {
            playerScore++;
            resultText("won");
        } else if(computerChoice == "Paper") {
            computerScore++;
            resultText("lost");
        }
    } else if (playerChoice == "Paper") {
        if(computerChoice == "Rock") {
            playerScore++;
            resultText("won");
        } else if(computerChoice == "Scissors") {
            computerScore++;
            resultText("lost");
        }
    } else if(playerChoice == "Scissors") {
        if(computerChoice == "Rock") {
            computerScore++;
            resultText("lost");
        } else if(computerChoice == "Paper") {
            playerScore++;
            resultText("won");
        }
    } else {
        alert("Uh-oh. You didn't make a valid choice. We don't allow " + playerChoice);
    }

    playerScoreText.innerHTML = playerScore;
    computerScoreText.innerHTML = computerScore;

    if(playerScore == winningScore || computerScore == winningScore) {
        setTimeout(function(){
            gameOver(playerScore, computerScore);
        },0);
    }
}


//Update the text between the scores with the result of the round and with what each player played
function resultText(result) {
    switch(result) {
        case "tie":
            roundResultText.innerHTML = "It's a Tie!";
            roundResultPlays.innerHTML = "You both played " + playerChoice;
            break;

        case "won":
            roundResultText.innerHTML = "You won!";
            roundResultPlays.innerHTML = playerChoice + " beats " + computerChoice;
            break;
            
        case "lost":
            roundResultText.innerHTML = "You lost!";
            roundResultPlays.innerHTML = computerChoice + " beat your " + playerChoice;
            break;

        default:
            console.log("Unexpected result status");
    }
}


//Reset scores to 0
function resetGame() {
    playerScore = 0;
    computerScore = 0;

    playerScoreText.innerHTML = playerScore;
    computerScoreText.innerHTML = computerScore;

    roundResultText.innerHTML = "";
    roundResultPlays.innerHTML = "";
}


//Alert the player whether they won or not after someone reaches 10 points
function gameOver(playerScore, computerScore) {
    if(playerScore > computerScore) {
        alert("Congratulations, player! You have won! Play again?");
    } else {
        alert("Dearest apologies, but it seems you did not win this time. Shall we give it another go?");
    }

    resetGame();
}