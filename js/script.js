// Riferimenti agli elementi HTML dell'uccello e delle pipe
const bird = document.getElementById('bird');
const pipeTop = document.getElementById('pipe-top');
const pipeBottom = document.getElementById('pipe-bottom');
const playButton = document.getElementById('play-button');

// Variabili per gestire la posizione e il movimento dell'uccello
let birdTop = window.innerHeight / 2; // Posizione verticale iniziale dell'uccello
let birdVelocity = 0; // Velocità verticale dell'uccello
const gravity = 0.6; // Forza di gravità
const jump = -10; // Velocità di salto dell'uccello
let pipeX = window.innerWidth; // Posizione orizzontale iniziale delle pipe
const pipeGap = 150; // Spazio tra il tubo superiore e quello inferiore
const pipeWidth = 52; // Larghezza delle pipe
let isJumping = false; // Stato di salto dell'uccello
let gameStarted = false; // Stato del gioco

// Ascoltatore per l'evento 'keydown' per gestire il salto dell'uccello
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && gameStarted) { // Verifica se la barra spaziatrice è premuta e il gioco è avviato
        isJumping = true; // Imposta isJumping a true se si preme la barra spaziatrice
    }
});

// Funzione che aggiorna la posizione dell'uccello e delle pipe
function update() {
    if (!gameStarted) return; // Non eseguire l'aggiornamento se il gioco non è avviato

    // Gestione del movimento dell'uccello
    if (isJumping) {
        birdVelocity = jump; // Se l'uccello sta saltando, imposta la velocità di salto
        isJumping = false; // Resetta lo stato di salto
    } else {
        birdVelocity += gravity; // Altrimenti, applica la gravità per far scendere l'uccello
    }

    birdTop += birdVelocity; // Aggiorna la posizione verticale dell'uccello
    bird.style.top = birdTop + 'px'; // Applica la nuova posizione nel CSS

    // Gestione del movimento delle pipe
    pipeX -= 4; // Muove le pipe verso sinistra
    if (pipeX < -pipeWidth) { // Se la pipe è uscita dallo schermo
        pipeX = window.innerWidth; // Riposiziona la pipe all'estremità destra dello schermo
        // Genera un'altezza casuale per il tubo superiore
        const pipeTopHeight = Math.random() * (window.innerHeight - pipeGap - 200) + 100;
        const pipeBottomHeight = window.innerHeight - pipeTopHeight - pipeGap;
        
        // Imposta l'altezza dei tubi
        pipeTop.style.height = pipeTopHeight + 'px'; // Imposta l'altezza del tubo superiore
        pipeBottom.style.height = pipeBottomHeight + 'px'; // Imposta l'altezza del tubo inferiore
    }
    
    pipeTop.style.left = pipeX + 'px'; // Aggiorna la posizione orizzontale del tubo superiore
    pipeBottom.style.left = pipeX + 'px'; // Aggiorna la posizione orizzontale del tubo inferiore

    // Verifica le collisioni con le pipe
    if (pipeX < 90 && pipeX > 50) { // Controlla se l'uccello è vicino alla pipe
        if (birdTop < parseFloat(pipeTop.style.height) || birdTop + 44 > window.innerHeight - parseFloat(pipeBottom.style.height)) { // Verifica se l'uccello collide con le pipe
            alert('Game Over!'); // Mostra il messaggio di game over
            resetGame(); // Resetta il gioco
        }
    }

    // Verifica se l'uccello è fuori dallo schermo
    if (birdTop > window.innerHeight || birdTop < 0) { // Controlla se l'uccello è fuori dai confini verticali
        alert('Game Over!'); // Mostra il messaggio di game over
        resetGame(); // Resetta il gioco
    }

    requestAnimationFrame(update); // Richiama la funzione update per il prossimo frame
}

// Funzione per resettare il gioco
function resetGame() {
    birdTop = window.innerHeight / 2; // Ripristina la posizione verticale dell'uccello
    birdVelocity = 0; // Ripristina la velocità dell'uccello
    pipeX = window.innerWidth; // Ripristina la posizione orizzontale delle pipe
    gameStarted = false; // Imposta lo stato del gioco su non avviato
    playButton.style.display = 'block'; // Mostra il pulsante Play
}

// Funzione per avviare il gioco
function startGame() {
    gameStarted = true; // Imposta lo stato del gioco su avviato
    playButton.style.display = 'none'; // Nascondi il pulsante Play
    update(); // Avvia il loop di aggiornamento del gioco
}

// Aggiungi un evento click al pulsante Play per avviare il gioco
playButton.addEventListener('click', startGame);
