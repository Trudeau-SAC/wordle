let gridTiles = document.querySelectorAll(
  '.grid__tile:not(.grid__tile--small)'
);
let gridLetters = document.querySelectorAll(
  '.grid__letter:not(.grid__letter--small)'
);
let keyboardKeys = document.querySelectorAll('.keyboard__key');
let playing = false;
let currentTile = 0;
let targetWord = ['w', 'o', 'm', 'e', 'n'];
let letters = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'a',
  's',
  'd',
  'f',
  'g',
  'h',
  'j',
  'k',
  'l',
  'z',
  'x',
  'c',
  'v',
  'b',
  'n',
  'm',
];
let words = ['adieu', 'lover', 'point', 'women'];
let canContinue = false;
let firstTile = 0;

const handleKey = (key) => {
  if (playing) {
    key = key.toLowerCase();
    let keyboardKey = document.querySelector(`[data-key="${key}"]`);
    if (keyboardKey) {
      keyboardKey.style.animation = 'keyboard-press .3s';
      setTimeout(function () {
        keyboardKey.style.animation = '';
      }, 300);
    }

    if (key === 'enter') {
      if (currentTile % 5 === 0 && currentTile !== 0) {
        let inputWord = `${gridLetters[currentTile - 5].textContent}${
          gridLetters[currentTile - 4].textContent
        }${gridLetters[currentTile - 3].textContent}${
          gridLetters[currentTile - 2].textContent
        }${gridLetters[currentTile - 1].textContent}`;
        let inputLetters = [
          gridLetters[currentTile - 5].textContent,
          gridLetters[currentTile - 4].textContent,
          gridLetters[currentTile - 3].textContent,
          gridLetters[currentTile - 2].textContent,
          gridLetters[currentTile - 1].textContent,
        ];
        if (words.includes(inputWord)) {
          canContinue = true;
          firstTile += 5;
          let correctPlace = 0;
          for (i = 0; i < inputLetters.length; i++) {
            if (targetWord.indexOf(inputLetters[i]) === i) {
              gridTiles[currentTile - 5 + i].classList.add(
                'grid__tile--correct-position'
              );
              correctPlace++;
            } else if (targetWord.includes(inputLetters[i])) {
              gridTiles[currentTile - 5 + i].classList.add(
                'grid__tile--incorrect-position'
              );
            } else {
              gridTiles[currentTile - 5 + i].classList.add(
                'grid__tile--incorrect'
              );
            }
          }
          if (correctPlace === 5) {
            handleWin();
          }
        }
        if (currentTile >= 30) {
          handleLoss();
        }
      }
    } else if (key === 'backspace') {
      if (currentTile !== firstTile) {
        gridLetters[currentTile - 1].textContent = '';
        currentTile--;
        canContinue = true;
      }
    } else if (letters.includes(key)) {
      if (currentTile % 5 !== 0 || currentTile === 0 || canContinue === true) {
        gridLetters[currentTile].textContent = key;
        currentTile++;
        canContinue = false;
      }
    }
  }
};

const handleWin = () => {
  playing = false;
};

const handleLoss = () => {
  playing = false;
};

keyboardKeys.forEach((keyboardKey) => {
  keyboardKey.addEventListener('click', function () {
    handleKey(keyboardKey.getAttribute('data-key'));
  });
});

document.addEventListener('keydown', function (e) {
  handleKey(e.key);
});

const modalInstructions = document.querySelector('.modal--instructions');
const closeModal = document.querySelector('.modal__close');
const startButton = document.querySelector('.modal__start');
const questionButton = document.querySelector('.question');
[closeModal, startButton].forEach((element) => {
  element.addEventListener('click', () => {
    modalInstructions.classList.add('hidden');
    playing = true;
  });
});

questionButton.addEventListener('click', function () {
  playing = false;
  modalInstructions.classList.remove('hidden');
});
