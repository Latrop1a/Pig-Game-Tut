/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

3 challenges
-player looses entire score after 2x6 - done
-input field to html to set score max (.value property in js) - done?
-add a second dice to the game. when one is "1" player looses his score

*/

//todo: make slight delay on UIchangeDice
//todo: get notification window on ruleBreak

let gameOnline = false;
let gameList = [],
  ruleList = [];
let gameCurrent, roundScore, ruleBreak, timeOut;

// all document shortcuts
const doms = {
  dice1: document.querySelector(".dice1"),
  dice2: document.querySelector(".dice2"),
  newGame: document.querySelector(".btn-new"),
  diceRoll: document.querySelector(".btn-roll"),
  maxScore: document.getElementById("scoreMax"),
  name0: document.getElementById("name-0"),
  currentScore0: document.getElementById("current-0"),
  score0: document.getElementById("score-0"),
  name1: document.getElementById("name-1"),
  currentScore1: document.getElementById("current-1"),
  score1: document.getElementById("score-1"),
  hold: document.querySelector(".btn-hold"),
};
console.log(doms.diceRoll);

// class for game, added into gameList array
// maybe for easy switching or history later on
class Game {
  constructor(name, maxScore = 100, diceNumber = 2) {
    this.name = name;
    this.maxScore = maxScore;
    this.diceNumber = diceNumber;
    this.player1Score = 0;
    this.player2Score = 0;
    this.restart();
    this.last5Throws = [];
  }
  //generate dice for game AND saves the last 5 throws in an array for rules or maybe a little history display
  rollDice() {
    this.dice1 = Math.ceil(Math.random() * 6);
    this.dice2 = Math.ceil(Math.random() * 6);
    if (this.last5Throws.length >= 5) {
      this.last5Throws.pop();
      this.last5Throws.unshift([this.dice1, this.dice2]);
    } else {
      this.last5Throws.unshift([this.dice1, this.dice2]);
    }
    console.log(this.last5Throws);
  }
  //changes Player in Game and in UI
  changePlayer() {
    this.activePlayer === 0 ? (this.activePlayer = 1) : (this.activePlayer = 0);
  }
  //restarts game
  restart() {
    this.activePlayer = 0;
    roundScore = 0;
    gameOnline = true;
    ruleBreak = false;
    doms.score0.innerHTML = "0";
    doms.score1.innerHTML = "0";
    doms.currentScore0.innerHTML = "0";
    doms.currentScore1.innerHTML = "0";
    toggleDiceView(false, 1500);
  }
}

//class for rules
//maybe later utilized for dropdown menu or something
class Rule {
  constructor(id, name, description, active) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.active = active;
  }
  getRuleName() {
    return this.name;
  }
  getRuleText() {
    return this.description;
  }
}

//set up rules
const Rule0 = new Rule(0, "Double One", "Throwing two ones ends the go", true);
const Rule1 = new Rule(
  1,
  "Double Six",
  "Throwing two sixes ends the go without adding round score but doubles your score",
  true
);
const Rule2 = new Rule(
  2,
  "Two Double Digits in a row",
  "Getting two double digit throws in a row sets ends your turn but you get to keep the score",
  true
);
ruleList.push(Rule0);
ruleList.push(Rule1);
ruleList.push(Rule2);

//checks all rules
const checkRules = () => {
  checkRule0();
  checkRule1();
  //reset ruleBreak
  ruleBreak = false;
};

//all rules
const checkRule0 = () => {
  //check if Rule is active and if no other rule was broken beforehand
  if (Rule0.active && !ruleBreak) {
    if (gameCurrent.dice1 == 1 && gameCurrent.dice2 == 1) {
      console.log("trigger rule0");
      ruleBrokenDefault(0);
    }
  }
};

const checkRule1 = () => {
  if (Rule1.active && !ruleBreak) {
    if (gameCurrent.dice1 == 6 && gameCurrent.dice2 == 6) {
      console.log("trigger rule1");
      gameCurrent.activePlayer === 0
        ? (gameCurrent.player1Score *= 2)
        : (gameCurrent.player2Score *= 2);
      //afterwards default rule execute
      ruleBrokenDefault(1);
    }
  }
};

//When rules are broken this gets executed
//Maybe add for later a description what rules was broken with delay or something
const ruleBrokenDefault = (ruleID) => {
  //boolean stops further rule checks
  ruleBreak = true;
  // show broken rule on UI
  displayRuleBrokenText(ruleID);
  // change player on UI
  uiUpdateOnPlayerChange(gameCurrent.activePlayer);
  //checks if endcondition is reached
  endCheck();
  //changes over to other player
  gameCurrent.changePlayer();
};

// shows on UI what rule was broken
const displayRuleBrokenText = (ruleID) => {
  ruleName = ruleList[ruleID].getRuleName();
  ruleText = ruleList[ruleID].getRuleText();
  console.log(ruleName);
  console.log(ruleText);
  //need to create nice looking window
};

//creates new game object, changes gameCurrent var to it and pushes it into gameList array
const newGame = () => {
  gameName = window.prompt("Spielname", "heinblöd");
  let maxScore = doms.maxScore.value;
  if (maxScore < 1) maxScore = 150;
  gameCurrent = new Game(gameName, maxScore);
  gameList.push(gameCurrent);
};

//Updates ui to change dice to number from current game (dice1&2)
const uiChangeDice = (dice1, dice2) => {
  doms.dice1.setAttribute("src", `dice-${dice1}.png`);
  if (gameCurrent.diceNumber === 2) {
    doms.dice2.setAttribute("src", `dice-${dice2}.png`);
  }
};

//updates round score in view and model
const updateRoundScore = (activePlayer) => {
  roundScore += gameCurrent.dice1 + gameCurrent.dice2;
  document.getElementById(`current-${activePlayer}`).innerHTML = roundScore;
};

const uiUpdateOnPlayerChange = (activePlayer) => {
  //resets roundScore
  roundScore = 0;
  doms.score0.innerHTML = gameCurrent.player1Score;
  doms.score1.innerHTML = gameCurrent.player2Score;
  //changes active player flag on UI
  document.getElementById(`current-${activePlayer}`).innerHTML = roundScore;
  console.log(document.querySelector(`.player-${activePlayer}-panel`));
  document
    .querySelector(`.player-${activePlayer}-panel`)
    .classList.remove("active");
  if (activePlayer == 0) {
    document.querySelector(`.player-1-panel`).classList.add("active");
  } else {
    document.querySelector(`.player-0-panel`).classList.add("active");
  }
};

// endgame UI modification
const endGame = (winner) => {
  //deactivates logic
  gameOnline = false;
  //changes UI
  document.querySelector(`.player-${winner}-panel`).classList.remove("active");
  document.querySelector(`.player-${winner}-panel`).classList.add("winner");
  document.getElementById(`name-${winner}`).innerHTML = "Winner!";
};

// checks if maxScore was reached by either player
const endCheck = () => {
  if (
    gameCurrent.player1Score > gameCurrent.maxScore ||
    gameCurrent.player2Score > gameCurrent.maxScore
  ) {
    endGame(gameCurrent.activePlayer);
    return;
  }
};

// show or hide dice with delay
const toggleDiceView = (show, timeInMs) => {
  timOut = window.setTimeout(() => {
    console.log("callback");
    if (show) {
      doms.dice1.style.display = "block";
      doms.dice2.style.display = "block";
    } else {
      doms.dice1.style.display = "none";
      doms.dice2.style.display = "none";
    }
  }, timeInMs);
};

//initialize dummy game
gameCurrent = new Game("bla", 150, 2);
gameOnline = 0;

// game logic what happens on roll
function rolling() {
  if (gameOnline) {
    //roll the dice
    gameCurrent.rollDice();
    //display dice throw
    uiChangeDice(gameCurrent.dice1, gameCurrent.dice2);
    toggleDiceView(true, 1500);
    //checking rules
    checkRules();
    //do scoring
    updateRoundScore(gameCurrent.activePlayer);
  }
}

//button press to transfer round score to score
//checks for win condition
function holding() {
  if (gameOnline === false) {
    return;
  }
  //transfer current score to score and reset round
  if (gameCurrent.activePlayer === 0) {
    gameCurrent.player1Score += roundScore;
  } else {
    gameCurrent.player2Score += roundScore;
  }
  //update ui
  uiUpdateOnPlayerChange(gameCurrent.activePlayer);
  //check for max score and possible end game
  endCheck();
  //changeplayer
  gameCurrent.changePlayer();
}

//Event Listeners
doms.newGame.addEventListener("click", newGame);
doms.diceRoll.addEventListener("click", rolling);
doms.hold.addEventListener("click", holding);
