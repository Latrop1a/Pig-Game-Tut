/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice1 as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

3 challenges
-player looses entire score after 2x6 - done
-input field to html to set score max (.value property in js) - done?
-add a second dice1 to the game. when one is "1" player looses his score

*/


// todo:  display violated rules... + maybe fading animation for dices
// todo:  + choosing rules at the beginning
// todo: make a list of rules to activate/deactive upon start...class probably

let scores, roundScore, activePlayer, gameOnline, scoreMax, lastDice1, lastDice2, timeOutDice, ruleBreakString;

// Starting conditions
const init = () => {
  gameOnline = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  lastDice1 = 0;

  domS.p1Panel.classList.remove("active");
  domS.p0Panel.classList.add("active");
  domS.scoreP0.innerHTML = 0;
  domS.scoreP1.innerHTML = 0;
  domS.dice1.style.display = "none";
  domS.dice2.style.display = "none";
  console.log(document.querySelector("#current-" + activePlayer).innerHTML);
  domS.roundScoreCurrentPlayer.innerHTML = roundScore;
  domS.p0Name.textContent = "Player 1";
  domS.p1Name.textContent = "Player 2";
  domS.p0Panel.classList.remove("winner");
  domS.p1Panel.classList.remove("winner");

};


// ROLL BUTTON
document.querySelector(".btn-roll").addEventListener("click", () => {
  
  if (gameOnline) {

    //make sure the remove dice timeout gets stopped for rapid clicking
    clearTimeout(timeOutDice);
    // random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    // display result
    domS.dice1.style.display = "block";
    domS.dice1.src = "dice-" + dice1 + ".png";
    domS.dice2.style.display = "block";
    domS.dice2.src = "dice-" + dice2 + ".png";
    
    //GAME RULES
    //if dice1 gets a 6 and had a 6 last throw its bye bye score
    if ((dice1 == 6 && lastDice1 == 6) || (dice2 == 6 && lastDice2 == 6)) {
      scoreChange("reset");
      console.log("whooosh!");
      nextPlayer();
    } else if (dice1 === 1 || dice2 === 1) {
      nextPlayer();
    } else {
      roundScore += dice1 + dice2; 
      domS.roundScoreCurrentPlayer.innerHTML = roundScore;
      lastDice1 = dice1;
      lastDice2 = dice2;
    }
  }
});

// HOLD BUTTOn
document.querySelector(".btn-hold").addEventListener("click", () => {

  if (gameOnline) {

    getScoreMax();
    
    //score transfer to permanent and update view
    scoreChange("add");
    //victory condition
    if (scores[activePlayer] < scoreMax) {
      //change player
      nextPlayer();
    } else {
      //VICTORY
      gameOnline = false;
      domS.winnerName.textContent = "WINNER";
      domS.activePanel.classList.remove("active");
      domS.activePanel.classList.add("winner");
    }  
  }
});

// NEW GAME BUTTOn
document.querySelector(".btn-new").addEventListener("click", init);


// On Player Change
const nextPlayer = () => {
  //reset lastDice
  lastDice1 = 0;
  lastDice2 = 0;
  //make roundscore 0
  roundScore = 0;
  domS.roundScoreCurrentPlayer.innerHTML = roundScore;
  //change active player -  class="player-0-panel active"
  activePanel.classList.remove("active");
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  activePanel.classList.add("active");
  //removes dice display after 1,5s
  timeOutDice = setTimeout(removeDiceView, 1500);
  
};


const scoreChange = action => {
  //either adds roundscore on top or resets to zero
  if (action === "add") {
    scores[activePlayer] += roundScore;
  } else if (action === "reset") {
    scores[activePlayer] = 0;
  }
  domS.scoreActive.innerHTML = scores[activePlayer];
};

//gets scoreMax or defaults to 300 if none was entered
const getScoreMax = () => {
  scoreMax = domS.scoreMaxInput.value;
  if (!scoreMax) {
    scoreMax = 150;
  }
};

const removeDiceView = () => {
  //remove dice --- really only works with a time In think..
  domS.dice1.style.display = "none";
  domS.dice2.style.display = "none";
};

// class for different rules that user can add or remove
class Rules { 
  constructor(name, message, checkFn) {
    this.name = name;         // for rule activation menu
    this.message = message;   // displayed after rule Break
    this.checkFn = checkFn;   // rule logic
  }
  displayMessage() {
    domS.ruleBreak.innerHTML = this.message;

  }

  checkRule(input) {
    dice1 = input[0];
    dice2 = input[1];
  }
}

rule1 = new Rules ("No Ones!", "You rolled a one!", function(input) {

});

rulesList = [rule1];





let domS = {
  dice1 : document.querySelector(".dice1"),
  dice2 : document.querySelector(".dice2"),
  scoreP0 : document.querySelector("#score-0"),
  scoreP1 : document.querySelector("#score-1"),
  scoreActive: document.querySelector("#score-" + activePlayer),
  roundScoreCurrentPlayer : document.querySelector("#current-" + activePlayer),
  scoreMaxInput: document.querySelector("#scoreMax"),
  p0Name : document.querySelector("#name-0"),
  p1Name : document.querySelector("#name-1"),
  p0Panel : document.querySelector(".player-0-panel"),
  p1Panel : document.querySelector(".player-1-panel"),
  activePanel: document.querySelector(".player-" + activePlayer + "-panel"),
  winnerName : document.querySelector("#name-" + activePlayer),
  ruleBreak: document.querySelector("#ruleBreak")
};






init();
