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


let scores, roundScore, activePlayer, gameOnline, maxScore;

// Starting conditions
const init = () => {
  gameOnline = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  maxScore = 100;

  document.querySelector("#score-0").innerHTML = 0;
  document.querySelector("#score-1").innerHTML = 0;
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
};


// ROLL BUTTON
document.querySelector(".btn-roll").addEventListener("click", () => {

  if (gameOnline) {
  // random number
    let dice = Math.floor(Math.random() * 6) + 1;
    // display result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
    
    //update roundscore if rolled number != 1
    if (dice > 1) {
      roundScore += dice; 
      document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// HOLD BUTTOn
document.querySelector(".btn-hold").addEventListener("click", () => {

  if (gameOnline) {
    
    //score transfer to permanent and update view
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).innerHTML = scores[activePlayer];
    //victory condition
    if (scores[activePlayer] < maxScore) {
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
  //make roundscore 0
  roundScore = 0;
  document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
  //change player -  class="player-0-panel active"
  document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector(".player-" +activePlayer + "-panel").classList.add("active");
};

init();
