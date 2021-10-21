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
const container = document.querySelector('.container');
const levelDom = document.getElementById('level');
const play = document.getElementById('play');

//Funzione che controlla il livello scelto
function checkLevel(level) {

    let griglia = 0;

    //Controllo livello inserito dall'utente
    //in base a quello cambio il range massimo di griglia
    if (level.value == 'level_one') {
        griglia = 100;
    } else if (level.value == 'level_two') {
        griglia = 81;
        container.style.width = '720px';
    } else if (level.value == 'level_three') {
        griglia = 49;
        container.style.width = '560px';
    }

    return griglia;
}


let grid = checkLevel(levelDom);
const bombs = generateBombs(grid);


//Funzione che crea la griglia
function createGrid(containerDom) {

    grid = checkLevel(levelDom);
    containerDom.innerHTML = '';

    //Ciclo da 1 fino al range massimo scelto
    for (let i = 1; i <= grid; i++) {

        //Creo elemento DOM
        const div = document.createElement('div');
        div.className = 'cell';
        containerDom.append(div);

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

let score = 0;
//Funzione che prende il contenuto della cella
function handelClick() {
    const cell_number = parseInt(this.innerText);
    if (isBomb(cell_number, bombs)) {
        this.className += ' red';
    } else if (!this.classList.contains('blue')) {
        this.className += ' blue';
        score++;
    }
}

//Funzione che verifica se una cella è una bomba o no
function isBomb(cell_number, bombs) {
    if (bombs.includes(cell_number)) {
        console.log('Hai calpestato una bomba! Il tuo punteggio è: ' + score);
        return true;
    }
    return false;
}

//Funzione che genera numero casuale
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Funzione che genera l'array di bombe
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


//Ascolto l'evento click sul button e genero la griglia
play.addEventListener('click', function () {
    createGrid(container);
});



/* creare funzione endGame per terminare il gioco
creare una funzione showBombs per mostrare tutte le bombe
    se gli elementi hanno la classe bomba devo mostrarli

.removeEventListener('click', nameFunction) funziona solo con funzioni callback*/