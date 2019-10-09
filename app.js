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


let scores, roundScore, activePlayer, gameOnline, scoreMax, lastDice1, lastDice2;

// Starting conditions
const init = () => {
  gameOnline = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  getScoreMax();
  console.log(scoreMax);
  lastDice1 = 0;

  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector("#score-0").innerHTML = 0;
  document.querySelector("#score-1").innerHTML = 0;
  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";
  document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
};


// ROLL BUTTON
document.querySelector(".btn-roll").addEventListener("click", () => {

  getScoreMax();

  if (gameOnline) {
  // random number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    // display result
    let dice1DOM = document.querySelector(".dice1");
    let dice2DOM = document.querySelector(".dice2");
    dice1DOM.style.display = "block";
    dice1DOM.src = "dice-" + dice1 + ".png";
    dice2DOM.style.display = "block";
    dice2DOM.src = "dice-" + dice2 + ".png";
    
    //game rules
    //if dice1 gets a 6 and had a 6 last throw its bye bye score
    if ((dice1 == 6 && lastDice1 == 6) || (dice2 == 6 && lastDice2 == 6)) {
      scoreChange("reset");
      console.log("whooosh!");
      nextPlayer();
    } else if (dice1 > 0 && dice2 > 0) {
      roundScore += dice1 + dice2; 
      document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
      lastDice1 = dice1;
      lastDice2 = dice2;
    } else {
      nextPlayer();
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
      //victory
      gameOnline = false;
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
  document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
  //change player -  class="player-0-panel active"
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector(".player-" +activePlayer + "-panel").classList.add("active");
};


const scoreChange = (action) => {
  //either adds roundscore on top or resets to zero
  if (action === "add") {
    scores[activePlayer] += roundScore;
  } else if (action === "reset") {
    scores[activePlayer] = 0;
  }
  document.querySelector("#score-" + activePlayer).innerHTML = scores[activePlayer];
};

//gets scoreMax or defaults to 100 if none was entered
const getScoreMax = () => {
  scoreMax = document.querySelector("#scoreMax").value;
  if (!scoreMax) {
    scoreMax = 100;
  }
}

init();
