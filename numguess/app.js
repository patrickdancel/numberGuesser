// GAME FUNCTION 
// player must guess a number between a min and max
// player gets a certain amount of guesses
// notify player of guesses remaining
// notify the player of the correct answer if local
// let player choose to play again

// Game values
let min = 1,
    max = 10,
    winningNum = 2,
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // check if won
    if(guess === winningNum){
        // Game over  - won
        gameOver(true, `${winningNum} is correct, YOU WIN`)

    } else {
      // wrong number
      guessesLeft -=1;

      if(guessesLeft === 0){
          gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
      } else {
        // Game continues  - answer wrong

        // Change border color
        guessInput.style.borderColor = 'red';

        // Clear input
        guessInput.value = '';

        // Tell user its the wrong number

        setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`, 'red');

      }
    }
});

// Game Over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    // disable input
    guessInput.disabled = true;
    // change color
    guessInput.style.borderColor = color;
    // set text color
    message.style.color = color;
    // set message
    setMessage(msg);

    // Play Again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

// set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
