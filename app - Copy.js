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

let scores, roundScore, activePlayer, gamePlaying, scoreMax, diceOld;

init();

//ROLL button
document.querySelector(".btn-roll").addEventListener("click", function() {

  if (gamePlaying) {  //checks if game is on
    //1. Random Number
    let dice1 = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;
    //2. Display result
    let diceDom1 = document.querySelector(".dice1");
    let diceDom2 = document.querySelector(".dice2");
    diceDom1.style.display = "block";
    diceDom1.src = "dice-" + dice1 + ".png";
    diceDom2.style.display = "block";
    diceDom2.src = "dice-" + dice2 + ".png";
    //if 2x6 then score gone and next player
    if (dice1 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
      nextPlayer();
    //3. update round score IF the rolled number was NOT 1  -- Game Logic
    } else if (dice1 !== 1 && dice2 !== 1) {
      //Add Score
      roundScore += (dice1 + dice2);
      diceOld = dice1;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    }
  }
});

//HOLD button
document.querySelector(".btn-hold").addEventListener("click", function() {
  
  if (gamePlaying) {
    //Add current score to global
    scores[activePlayer] += roundScore;
    roundScore = 0;
    inputScore();
    
    //Update UI
    document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
    //Check if Win Condition
    if (scores[activePlayer] >= scoreMax) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer(); //go to next player
    }
  }

});


//NEW button
document.querySelector(".btn-new").addEventListener("click", init)

//at page load and for a new game
function init() {
  gamePlaying = true;
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0

  document.querySelector(".dice1").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  
  inputScore();
  //scoreMax = prompt("Max Score")
}

function nextPlayer() {
  activePlayer === 1 ? (activePlayer = 0) : (activePlayer = 1); //ternary op because much cleaner
  roundScore = 0;
  diceOld = 0;
  
  document.getElementById("current-0").textContent = roundScore; //resets both roundscores
  document.getElementById("current-1").textContent = roundScore;
  
  //Change active player visuals
  document.querySelector(".player-0-panel").classList.toggle("active"); //Toggle so we dont have to do an if
  document.querySelector(".player-1-panel").classList.toggle("active");
  
  //document.querySelector(".dice1").style.display = "none";
  console.log(scoreMax);
}

function inputScore() {
  var input = document.querySelector("#scoreMax").value;
  if (input) {
    scoreMax = input;
  }
  else {
    scoreMax = 50;
  }
}

