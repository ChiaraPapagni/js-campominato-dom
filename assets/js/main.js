// GRIGLIA CAMPO MINATO
/* L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: 
le bombe. 
I numeri nella lista delle bombe non possono essere duplicati.

In seguito l'utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare su altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve scoprire tutte le bombe e comunicare il punteggio, cioè il numero di volte che l'utente ha inserito un numero consentito. */



//Seleziono elementi dalla DOM
const containerDom = document.querySelector('.container');
const levelDom = document.getElementById('level');
const play = document.getElementById('play');
const messageDom = document.querySelector('.message');
const cells = document.getElementsByClassName('cell');

let bombs = [];
let grid = checkLevel(levelDom, containerDom);

let score = 0; //Inizializzo il punteggio

let busyCells = []; //Creo array celle occupate


/**
 * Questa funzione stabilisce le dimensioni della griglia in base al livello scelto
 * 
 * @param {HTMLElement} level elemento DOM che rappresenta il livello
 * @param {HTMLElement} container elemento DOM che rappresenta il container
 * 
 * @returns {number} griglia -> valore numerico che cambia in base al livello scelto
 *  */
function checkLevel(level, container) {

    let griglia = 0;

    //Controllo livello inserito dall'utente
    //in base a quello cambio il range massimo di griglia
    if (level.value == 'level_one') {
        griglia = 100;
        container.style.width = '800px';
    } else if (level.value == 'level_two') {
        griglia = 81;
        container.style.width = '720px';
    } else if (level.value == 'level_three') {
        griglia = 49;
        container.style.width = '560px';
    }

    return griglia;
}

/**
 * Questa funzione crea la griglia
 *
 * @param {HTMLElement} container elemento DOM che rappresenta il container
 * @param {HTMLElement} message elemento DOM che rappresenta il messaggio
 *
 *  */
function createGrid(container, message) {

    grid = checkLevel(levelDom, containerDom);
    bombs = generateBombs(grid);

    message.innerHTML = '';
    container.innerHTML = '';
    score = 0;
    busyCells = [];

    //Ciclo da 1 fino al range massimo scelto
    for (let i = 1; i <= grid; i++) {

        //Creo elemento DOM
        const div = document.createElement('div');
        div.className = 'cell';
        container.append(div);

        //Scrivo in ogni div l'indice
        div.innerHTML = i;
    }
    console.log(bombs);

    //Seleziono tutti gli elementi con classe cell
    const cells = document.getElementsByClassName('cell');
    //Scorro le celle
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        element.addEventListener('click', handelClick);
    }

}

/**
 * Questa funzione gestisce il click sulla cella
 *
 *  */
function handelClick() {
    const cellNumber = parseInt(this.innerText);

    if (isBomb(cellNumber, bombs)) {
        this.className += ' red';
        messageDom.innerHTML = `Hai calpestato una bomba! Il tuo punteggio è: ${score}`;
        endGame();
    } else if (!this.classList.contains('blue')) {
        this.className += ' blue';
        busyCells.push(cellNumber);
        score++;
    }
    if (grid - busyCells.length == bombs.length) {
        endGame();
        messageDom.innerHTML = `Hai Vinto! Non hai calpestato nessuna bomba! Il tuo punteggio è: ${score}`;
    }
}

/**
 * Questa funzione controlla se la cella contiene un elemento dell'array bombs[]
 *
 * @param {number} cellNumber valore numerico
 * @param {Array} bombs array numerico
 *
 * @returns {boolean} restituisce true o false
 *  */
function isBomb(cellNumber, bombs) {
    if (bombs.includes(cellNumber)) {
        console.log('Hai calpestato una bomba! Il tuo punteggio è: ' + score);
        return true;
    }
    return false;
}

/**
 * Questa funzione genera un numero casuale 
 *
 * @param {number} min valore numerico
 * @param {number} max valore numerico
 *
 * @returns {number} restituisce un numero random compreso tra un min e max
 *  */
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Questa funzione genera un array numerico
 *
 * @param {number} grid valore numerico
 *
 * @returns {array} restituisce un array numerico
 *  */
function generateBombs(grid) {
    const bombs = [];
    while (bombs.length < 16) {
        //generare un numero casuale tra un min e un max
        const randomNumber = generateRandomNumber(1, grid);
        //se il numero non è incluso nell'array bombs ce lo pusho
        if (!bombs.includes(randomNumber)) {
            bombs.push(randomNumber);
        }
    }
    return bombs;
}

/**
 * Questa funzione mostra la posizione delle bombe
 *
 *  */
function showBombs() {
    for (let i = 0; i < bombs.length; i++) {
        let bombIndex = bombs[i] - 1;
        cells[bombIndex].classList.add('red');
    }
}

/**
 * Questa funzione termina il gioco e rimuove l'evento in ascolto sul click
 *
 *  */
function endGame() {
    for (let i = 0; i < cells.length; i++) {
        const element = cells[i];
        element.removeEventListener('click', handelClick);
    }
    showBombs();
}

//Ascolto l'evento click sul button e genero la griglia
play.addEventListener('click', function () {
    createGrid(containerDom, messageDom);
});
