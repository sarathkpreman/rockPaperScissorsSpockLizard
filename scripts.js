const level1Choices = ['rock', 'paper', 'scissors'];
const level2Choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const level3Choices = ['rock', 'paper', 'scissors', 'fire', 'water'];
const choiceElements = document.querySelectorAll('.choice-button');
const playerChoiceElement = document.getElementById('player-choice');
const computerChoiceElement = document.getElementById('computer-choice');
const playerScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const resetButton = document.getElementById('reset-button');
const resultElement = document.getElementById('result');
const layers = document.querySelectorAll('.background-layer');
const gameTitleElement = document.getElementById('game-title');

const rulesLevel1 = {
    rock: ['scissors'],
    paper: ['rock'],
    scissors: ['paper']
};

const rulesLevel2 = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock']
};

const rulesLevel3 = {
    rock: ['scissors', 'fire'],
    paper: ['rock', 'water'],
    scissors: ['paper', 'water'],
    fire: ['paper', 'rock'],
    water: ['fire', 'scissors']
};

let playerScore = 0;
let computerScore = 0;
let level = 1;
let rules = rulesLevel1;


document.addEventListener('DOMContentLoaded', function() {
    resultElement.textContent = 'Start Play';
    setInitialBackground();
    updateLevel();
    // preLoad();
});

// function preLoad(){
//     document.addEventListener('DOMContentLoaded',function(){
//         const initialTitle = document.getElementById('game-title')
//     });
//     document.write(initialTitle)
// }

choiceElements.forEach(button => button.addEventListener('click', () => {
    const playerChoice = button.id;
    const computerChoice = (level === 1 ? level1Choices : level === 2 ? level2Choices : level3Choices)[Math.floor(Math.random() * (level === 1 ? level1Choices : level === 2 ? level2Choices : level3Choices).length)];
    playerChoiceElement.textContent = getEmoji(playerChoice);
    computerChoiceElement.textContent = getEmoji(computerChoice);
    const result = getResult(playerChoice, computerChoice);
    resultElement.textContent = result;
    updateScores(result);
    updateBackground(result);
    checkScoreMilestone();
}));

function getResult(player, computer) {
    if (player === computer) {
        return 'It\'s a tie! Try again.';
    } else if (rules[player].includes(computer)) {
        return 'YOU WON! 🎉';
    } else {
        return 'You lost! Try again.';
    }
}

function updateScores(result) {
    if (result === 'YOU WON! 🎉') {
        playerScore++;
    } else if (result === 'You lost! Try again.') {
        computerScore++;
    }
    playerScoreElement.textContent = `Score: ${playerScore}`;
    computerScoreElement.textContent = `Score: ${computerScore}`;
}

function getEmoji(choice) {
    switch (choice) {
        case 'rock': return '🪨';
        case 'paper': return '📄';
        case 'scissors': return '✂️';
        case 'lizard': return '🦎';
        case 'spock': return '🖖';
        case 'fire': return '🔥';
        case 'water': return '💧';
    }
}

function updateBackground(result) {
    layers.forEach(layer => {
        layer.classList.remove('win', 'loss', 'tie');
    });

    if (result === 'YOU WON! 🎉') {
        layers.forEach(layer => {
            layer.classList.add('win');
            layer.style.background = '#4CAF50';
        });
    } else if (result === 'You lost! Try again.') {
        layers.forEach(layer => {
            layer.classList.add('loss');
            layer.style.background = '#D71313';
        });
    } else {
        layers.forEach(layer => {
            layer.classList.add('tie');
            layer.style.background = '#92A9BD';
        });
    }
}

function setInitialBackground() {
    layers.forEach(layer => {
        layer.style.background = '#050C9C';
    });
}

function checkScoreMilestone() {
    if (playerScore >= 10 && level === 1) {
        level++;
        alert('Yay! 😀 You\'ve Successfully Completed Level 1');
        switchToLevel2();
    } else if (computerScore >= 10 && level === 1) {
        alert('Bad Luck 🥲 Try again');
        resetGame(false);
    } else if (playerScore >= 20 && level === 2) {
        level++;
        alert('Yay! 😀 You\'ve Successfully Completed Level 2');
        switchToLevel3();
    } else if (computerScore >= 20 && level === 2) {
        alert('Bad Luck 🥲 Try again');
        resetGame(false);
    } else if (playerScore >= 30 && level === 3) {
        alert('Congratulations! 🎉 You are the ultimate winner!');
        resetGame(true, true);
    } else if (computerScore >= 30 && level === 3) {
        alert('Bad Luck 🥲 Try again');
        resetGame(false, true);
    }
}

function updateLevel() {
    if (level === 1) {
        gameTitleElement.textContent = 'Rock Paper Scissors';
        rules = rulesLevel1;
        document.getElementById('rock').style.display = 'inline-block';
        document.getElementById('paper').style.display = 'inline-block';
        document.getElementById('scissors').style.display = 'inline-block';
        document.getElementById('lizard').style.display = 'none';
        document.getElementById('spock').style.display = 'none';
        document.getElementById('fire').style.display = 'none';
        document.getElementById('water').style.display = 'none';
    } else if (level === 2) {
        gameTitleElement.textContent = 'Rock Paper Scissors Lizard Spock';
        rules = rulesLevel2;
        document.getElementById('rock').style.display = 'inline-block';
        document.getElementById('paper').style.display = 'inline-block';
        document.getElementById('scissors').style.display = 'inline-block';
        document.getElementById('lizard').style.display = 'inline-block';
        document.getElementById('spock').style.display = 'inline-block';
        document.getElementById('fire').style.display = 'none';
        document.getElementById('water').style.display = 'none';
    } else if (level === 3) {
        gameTitleElement.textContent = 'Rock Paper Scissors Fire Water';
        rules = rulesLevel3;
        document.getElementById('rock').style.display = 'inline-block';
        document.getElementById('paper').style.display = 'inline-block';
        document.getElementById('scissors').style.display = 'inline-block';
        document.getElementById('lizard').style.display = 'none';
        document.getElementById('spock').style.display = 'none';
        document.getElementById('fire').style.display = 'inline-block';
        document.getElementById('water').style.display = 'inline-block';
    }
}

function switchToLevel2() {
    level = 2;
    updateLevel();
    setInitialBackground();
}

function switchToLevel3() {
    level = 3;
    updateLevel();
    setInitialBackground();
}

function resetGame(isPlayerWin, isFinalReset) {
    playerScore = 0;
    computerScore = 0;
    playerScoreElement.textContent = `Score: ${playerScore}`;
    computerScoreElement.textContent = `Score: ${computerScore}`;
    resultElement.textContent = isPlayerWin ? (isFinalReset ? 'Start Play' : `Welcome to Level ${level}!`) : 'Start Play';
    layers.forEach(layer => {
        layer.classList.remove('win', 'loss', 'tie');
        layer.style.transition = 'background 1s ease';
        layer.style.background = '#050C9C';
    });

    if (isFinalReset || !isPlayerWin) {
        level = 1; // Reset level to 1 if the player loses or after final reset
        updateLevel();
    }
}

resetButton.addEventListener('click', () => {
    resetGame(false, true);
});
