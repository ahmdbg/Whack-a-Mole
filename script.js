let score = 0;
const holes = 9;
let gameGrid = document.getElementById('gameGrid');
let scoreDisplay = document.getElementById('score');
let startButton = document.getElementById('startButton');
let gameActive = false;
let timeLeft = 20;
let timerInterval;
const timerDisplay = document.getElementById('timer');
const hitSound = document.getElementById('hitSound');
const missSound = document.getElementById('missSound');

// Membuat grid lubang
for (let i = 0; i < holes; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    const mole = document.createElement('div');
    mole.classList.add('mole');
    hole.appendChild(mole);
    gameGrid.appendChild(hole);
}

function startGame() {
    // Hide start button and show game elements
    startButton.style.display = 'none';
    gameGrid.style.display = 'grid';
    scoreDisplay.style.display = 'block';
    
    // Reset score
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    
    // Reset and show timer
    timeLeft = 20;
    timerDisplay.style.display = 'block';
    
    // Start timer countdown
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
    
    // Start game
    gameActive = true;
    showRandomMole();
}

function endGame() {
    gameActive = false;
    clearInterval(timerInterval);
    const modal = document.getElementById('gameOverModal');
    const finalScore = document.getElementById('finalScore');
    finalScore.textContent = `Your score: ${score}`;
    modal.style.display = 'block';
}

function restartGame() {
    document.getElementById('gameOverModal').style.display = 'none';
    startButton.style.display = 'block';
    gameGrid.style.display = 'none';
    scoreDisplay.style.display = 'none';
    timerDisplay.style.display = 'none';
    gameActive = false;
    clearInterval(timerInterval);
}

// Event listener untuk tombol start
startButton.addEventListener('click', startGame);

// Fungsi untuk memunculkan tikus secara random
function showRandomMole() {
    if (!gameActive) return; // Cek apakah game masih aktif
    
    const moles = document.querySelectorAll('.mole');
    const randomMole = moles[Math.floor(Math.random() * moles.length)];
    
    randomMole.classList.add('show');
    
    setTimeout(() => {
        randomMole.classList.remove('show');
        if (gameActive) { // Cek lagi sebelum memanggil fungsi berikutnya
            showRandomMole();
        }
    }, 1000);
}

// Update event listener untuk menangkap klik
gameGrid.addEventListener('click', (e) => {
    if (gameActive) {
        if (e.target.classList.contains('mole') && e.target.classList.contains('show')) {
            // Hit successful
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            
            // Play hit sound
            hitSound.currentTime = 0;
            hitSound.play();
            
            // Add hit animation
            e.target.classList.add('hit');
            setTimeout(() => {
                e.target.classList.remove('hit');
            }, 200);
            
            // Add hit effect (flash effect)
            const hitEffect = document.createElement('div');
            hitEffect.classList.add('hit-effect');
            hitEffect.style.left = e.pageX + 'px';
            hitEffect.style.top = e.pageY + 'px';
            document.body.appendChild(hitEffect);
            
            setTimeout(() => {
                hitEffect.remove();
            }, 300);

            e.target.classList.remove('show');
        } else if (e.target.classList.contains('hole')) {
            // Miss
            missSound.currentTime = 0;
            missSound.play();
        }
    }
});
