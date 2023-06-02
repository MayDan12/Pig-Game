'use strict';
// selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnhold = document.querySelector('.btn--hold');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');

// starting element

let scores, currentscore, activePlayer, playing;
const initialState = function () {
  scores = [0, 0];
  currentscore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  diceEl.classList.add('hidden');
};
initialState();

const switchplayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentscore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnroll.addEventListener('click', function () {
  if (playing) {
    // 1 generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    //   display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3 if 1 is rolled: move to the next player
    if (dice !== 1) {
      // Add dice to current score
      currentscore = currentscore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      //  move to next player
      switchplayer();
    }
  }
});

btnhold.addEventListener('click', function () {
  if (playing) {
    // 1 add current score to current player
    scores[activePlayer] = scores[activePlayer] + currentscore;
    //   scores[1] = scores[1] + currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2 check if player score is <100
    // finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      diceEl.classList.add('hidden');
      alert(` Player ${activePlayer + 1} Wins`);
    } else {
      //  swutch to the next player
      switchplayer();
    }
  }
});

btnnew.addEventListener('click', initialState);
