const startScreen = document.getElementById('start-screen');
const triviaArea = document.querySelector('.trivia-area');
const startButton = document.getElementById('start-btn');
const clockBox = document.getElementById('clock-box');
const gameOver = document.getElementById('end-game');
const submitInitials = document.getElementById('submit');

let timeLeft = 30;
var timerInt;

let currentIndex = 0;
var choices;
var userChoices;
var answer;






//Need a timer
//Timer should appear in the game-clock
var timerEl = document.getElementsByClassName('game-clock');
//timer function
function gameTimer() {
    timeLeft--;
    clockBox.textContent = timeLeft;
//Stop the timer when it reaches 0
    if(timeLeft === 0){
        clearInterval(gameTimer);
        displayEndGameMessage();
    };
}

//Display a message when time runs out
var endGameMsg = 'Time is up! Thank you for playing!'

function displayEndGameMessage() {
    alert(endGameMsg);
}
//Need a start game function
function gameStart() {
    startScreen.setAttribute("class", "hidden");
    timerInt = setInterval(gameTimer, 1000);
    triviaArea.removeAttribute('class', 'hidden');
    //call showQuestion function
    showQuestion();
}

function showQuestion() {
    //innerHTML clears element that is targeted and replaces with something else
    //clears the triviaArea for a new question
    triviaArea.innerHTML = "";
    //This var holds the entire questions array and can be called by it's sections
    var currentQuestion = quiz[currentIndex];
    var questionsH2 = document.createElement('h2');
    questionsH2.textContent = currentQuestion.title;
    triviaArea.append(questionsH2);
//create multiple choice buttons and call the choices array
    for (let i = 0; i < currentQuestion.choices.length; i++) {
        //created automatically and can be changed
        const element = currentQuestion.choices[i];
        var choicesButton= document.createElement('button');
        choicesButton.textContent = element;
        choicesButton.setAttribute('class', "user-choice");
        //add a value to the button for comparison
        choicesButton.setAttribute('value', element);
        triviaArea.append(choicesButton);
        //create an onclick for answer comparison
        choicesButton.addEventListener('click', compareAnswer);
    }
    

}//End showQuestion function definition

function compareAnswer() {
   const answer = quiz[currentIndex].answer;
        if(this.value != answer){
            timeLeft -= 6;
        }
    currentIndex++;

    if (currentIndex === quiz.length) {
        //call end quiz function
        endGame();
    }
    else showQuestion();
}

function endGame() {
    clearInterval(timerInt);
    //hide triviaArea
    //display end-game
    triviaArea.setAttribute('class', 'hidden');
    gameOver.removeAttribute('class', 'hidden');
}

 //Either grabs something from localStorage or store something into localStorage
var highScoreArray = JSON.parse(localStorage.getItem('highscore')) || []

function highScore() {
    var initialsEl = document.getElementById('initials').value;
    //grab the id and put a .value on it
    var newScore = {
        intials:initialsEl,
        score:timeLeft,
    }
   
    
    //adds an item to the beginning of an array
    highScoreArray.push(newScore);

    //TODO: write sort and ranking helper fct 
    //var top5ScoresArr = rankScores(highScoresArray)
    //renderScores(topScoresArr);

    renderScores(highScoreArray);
    //stores the array locally
    localStorage.setItem('highscore', JSON.stringify(highScoreArray))
}

//loop through array and display the highscores
function renderScores(scoresArray) {
    var scoreEl = document.createElement("ol");
    
    for (let i = 0; i < scoresArray.length; i++) {
        const score = scoresArray[i].intials + '- ' + scoresArray[i].score;
        //create li elements
        var scoreListEl = document.createElement('li');
        //set innerText to the const score in the loop
        scoreListEl.innerText = score;
        //append the li to the list
        scoreEl.appendChild(scoreListEl);   
    }
    document.querySelector('.game-area').innerHTML = "";
    document.querySelector('.game-area').appendChild(scoreEl);
    localStorage.getItem('highscore');
}

//ToDo: Build a new array of highest scores?
//


startButton.addEventListener('click', gameStart);
submitInitials.addEventListener('click', highScore);
