const qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let missed = 0;

const startButton = document.getElementsByClassName('btn__reset')[0];
const overlay = document.getElementById('overlay');

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Array phrases
const phrases = [
    'when pigs fly',
    'when in rome',
    'let them eat cake',
    'too many cooks',
    'The show must go on'
];



// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    let phraseNo = Math.floor(Math.random() * Math.floor(arr.length));
    const phraseArray = arr[phraseNo];
    return  phraseArray;   
}

// Runs the function 
let phraseArray = getRandomPhraseAsArray(phrases);//

// adds the letters of a string to the display
let addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i += 1) {

        const newElement = document.createElement('li');
        const newText = document.createTextNode(phraseArray[i]);
        const position = document.getElementsByTagName('ul')[0];
        newElement.appendChild(newText);
        position.appendChild(newElement);

        if (newElement.textContent !== ' ') {
            newElement.classList.add('letter');
        } else {
            newElement.classList.add('space');
        }
    }  
}

addPhraseToDisplay(phraseArray);


// check if a letter is in the phrase
const checkLetter = button => {
    let letters = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < letters.length; i += 1) {
        if (button === letters[i].textContent.toLowerCase()) {
            letters[i].style.transition = 'all 1s';
            letters[i].classList.add('show');
            match = true;
        }
    } 
    return match; 
}


// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    if (event.target.nodeName == 'BUTTON') {

        event.target.style.transition = 'all 1s';
        event.target.classList.add('chosen');
        event.target.setAttribute('disabled', true);

        selectedButton = event.target.textContent;
        let letter = checkLetter(selectedButton);

        if (letter === null) {
            missed += 1;
            let heartLives = document.getElementsByClassName('tries')[0];
            heartLives.className = 'usedHeart';
            heartLives.style.display = 'none';
        }
    }
    checkWin();
});

// Create reset function
const resetGame = () => {
    let btn = document.getElementsByClassName('btn__reset')[0]
    btn.innerHTML = 'Reset';
    // Reset Counter
    missed = 0

    // Reset Letterboard
    let lis = document.getElementById('phrase').getElementsByTagName('LI');
    while (lis.length > 0) {
        lis[0].parentNode.removeChild(lis[0]);
    }
    
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);


    // Reset Keyboard

    let btnKeyboard = document.getElementsByClassName('chosen');
    for (let i = 0; i < btnKeyboard.length; i += 1) {
        btnKeyboard[i].removeAttribute('disabled');
    }
    while (btnKeyboard.length > 0) {
        btnKeyboard[0].classList.remove('chosen');
    }

    // Reset Hearts
    let heartLives = document.getElementsByClassName('usedHeart');
    for (let i = 0; i < heartLives.length; i +=1) {
        heartLives[i].style.display = 'inline-block';
        heartLives[i].classList.add('tries');
    }
    while (heartLives.lengths > 0) {
        heartLives.classList.remove('usedHeart');
    }

}

// check if the game has been won or lost
const checkWin = () => {
    let letter = document.getElementsByClassName('letter');
    let show = document.getElementsByClassName('show');
    let message = document.getElementsByClassName('title')[0];

    if(letter.length === show.length) {
        overlay.removeAttribute('class');
        overlay.classList.add('win');
        overlay.style.display = 'flex';
        message.innerText = "Congratulations, you win!";
        resetGame();
    } else if (missed === 5) {
        overlay.removeAttribute('class');
        overlay.classList.add('lose');
        overlay.style.display = 'flex';
        message.innerText = "Sorry, you lose!";
        resetGame();
    }
}

