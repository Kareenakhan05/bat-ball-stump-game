let playerScore = 0;
let computerScore = 0;
let timer;
let timeLeft = 60; // Initial time in seconds
let backgroundMusic; // Define the background music variable globally

function startGame() {
    // Show game buttons and hide the start button
    document.querySelectorAll('.game-button-image').forEach(button => button.parentElement.classList.remove('hidden'));
    document.getElementById('startButton').classList.add('hidden');
    
    // Start background music
    playBackgroundMusic();
    
    // Start the timer
    startTimer();
}

function playBackgroundMusic() {
    backgroundMusic = new Audio('sounds/wicket.mp3'); // Replace with your valid URL
    backgroundMusic.loop = true;
    backgroundMusic.play().catch(error => {
        console.error("Failed to play background music:", error);
    });
}

function playGame(playerChoice) {
    const choices = ['Bat', 'Ball', 'Stump'];
    const randomIndex = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomIndex];
    let resultMsg = '';

    // Clear previous animations
    document.getElementById('rainfallContainer').innerHTML = '';
    document.getElementById('bouncingBallContainer').innerHTML = '';

    if (playerChoice === computerChoice) {
        resultMsg = 'It is a tie!';
    } else if (
        (playerChoice === 'Bat' && computerChoice === 'Stump') ||
        (playerChoice === 'Ball' && computerChoice === 'Bat') ||
        (playerChoice === 'Stump' && computerChoice === 'Ball')
    ) {
        resultMsg = 'You won!';
        playerScore++;
    } else {
        resultMsg = 'Computer won!';
        computerScore++;
    }

    document.getElementById('resultMessage').innerHTML = `You chose <span class="chosen-text">${playerChoice}</span>. Computer chose <span class="computer-text">${computerChoice}</span>. <span class="result-text">${resultMsg}</span>`;
    updateScores();

    // Show animations based on player choice
    if (playerChoice === 'Bat') {
        showRainfall();
    } else if (playerChoice === 'Ball') {
        showBouncingBall();
    }
}

function updateScores() {
    document.getElementById('playerScore').innerHTML = `Player Score: ${playerScore}`;
    document.getElementById('computerScore').innerHTML = `Computer Score: ${computerScore}`;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    timeLeft = 60; // Reset timer
    document.getElementById('resultMessage').innerHTML = 'Game has been reset. Make your choice!';
    updateScores();
    document.getElementById('timer').innerText = `Time: ${timeLeft} sec`;
    clearInterval(timer);
    // Hide game buttons and show start button
    document.querySelectorAll('.game-button-image').forEach(button => button.parentElement.classList.add('hidden'));
    document.getElementById('startButton').classList.remove('hidden');
    // Stop background music
    if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    }
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('resultMessage').innerHTML = `Final Score - Player: ${playerScore} | Computer: ${computerScore}`;
            // Hide game buttons and show start button
            document.querySelectorAll('.game-button-image').forEach(button => button.parentElement.classList.add('hidden'));
            document.getElementById('startButton').classList.remove('hidden');
            // Stop background music
            if (backgroundMusic) {
                backgroundMusic.pause();
                backgroundMusic.currentTime = 0;
            }
        } else {
            timeLeft--;
            document.getElementById('timer').innerText = `Time: ${timeLeft} sec`;
        }
    }, 1000);
}

function showRainfall() {
    const container = document.getElementById('rainfallContainer');
    container.innerHTML = ''; // Clear previous content
    for (let i = 0; i < 20; i++) {
        const bat = document.createElement('div');
        bat.classList.add('rainfall');
        bat.style.left = `${Math.random() * 100}%`;
        bat.style.animationDuration = `${Math.random() * 2 + 2}s`; // Randomize fall speed
        container.appendChild(bat);
    }
    container.classList.remove('hidden');
}

function showBouncingBall() {
    const container = document.getElementById('bouncingBallContainer');
    container.innerHTML = ''; // Clear previous content
    for (let i = 0; i < 5; i++) {
        const ball = document.createElement('div');
        ball.classList.add('bouncing-ball');
        ball.style.left = `${Math.random() * 100}%`;
        ball.style.animationDuration = `${Math.random() * 1 + 1}s`; // Randomize bounce speed
        container.appendChild(ball);
    }
    container.classList.remove('hidden');
}
