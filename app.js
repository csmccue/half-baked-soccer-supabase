import { getGames, createGame } from './fetch-utils.js';
import { renderGame } from './render-utils.js';

const currentGameEl = document.getElementById('current-game-container');
const pastGamesEl = document.getElementById('past-games-container');
const logoutButton = document.getElementById('logout');

const nameForm = document.getElementById('name-form');
const teamOneAddButton = document.getElementById('team-one-add-button');
const teamTwoAddButton = document.getElementById('team-two-add-button');
const teamOneSubtractButton = document.getElementById('team-one-subtract-button');
const teamTwoSubtractButton = document.getElementById('team-two-subtract-button');
const finishGameButton = document.getElementById('finish-game-button');
const teamOneLabel = document.getElementById('team-one-name');
const teamTwoLabel = document.getElementById('team-two-name');

const teamOneInputEl = document.getElementById('team-one');
const teamTwoInputEl = document.getElementById('team-two');

let name1 = '';
let name2 = '';
let score1 = 0;
let score2 = 0;

nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameOne = teamOneInputEl.value;
    const nameTwo = teamTwoInputEl.value;
    // console.log(nameOne);
    // console.log(nameTwo);
    // set the state to this data from the form
    name1 = nameOne;
    name2 = nameTwo;
    // reset the form values
    teamOneInputEl.value = '';
    teamTwoInputEl.value = '';
    displayCurrentGameEl();
});

teamOneAddButton.addEventListener('click', () => {
    // increment the current state for team one's score
    score1++;
    displayCurrentGameEl();
});

teamTwoAddButton.addEventListener('click', () => {
    // increment the current state for team two's score
    score2++;
    displayCurrentGameEl();
});

teamOneSubtractButton.addEventListener('click', () => {
    // decrement the current state for team one's score
    score1--;
    displayCurrentGameEl();
});

teamTwoSubtractButton.addEventListener('click', () => {
    // decrement the current state for team two's score
    score2--;
    displayCurrentGameEl();
});

finishGameButton.addEventListener('click', async () => {
    // create a new game using the current game state
    const newGame = {
        name1: name1,
        name2: name2,
        score1: score1,
        score2: score2,
    };
    pastGamesEl.textContent = '';
    await createGame(newGame);
    name1 = '';
    name2 = '';
    score1 = 0;
    score2 = 0;

    displayCurrentGameEl();
    displayAllGames();
});

window.addEventListener('load', async () => {
    await displayAllGames();
});

function displayCurrentGameEl() {
    currentGameEl.textContent = '';
    teamOneLabel.textContent = name1;
    teamTwoLabel.textContent = name2;
    const gameEl = renderGame({ name1, name2, score1, score2 });


    currentGameEl.append(gameEl);
}

async function displayAllGames() {
    currentGameEl.textContent = '';
    pastGamesEl.textContent = '';
    const allGames = await getGames();
    for (let game of allGames) {
        const gameEl = renderGame(game);
        pastGamesEl.append(gameEl);
    } 
}

// i forgot to checkout a branch from main, so i accidently coded on main
// adding this comment to make a dev branch

