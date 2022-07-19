/*
GAME FUNCTION
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct anwser if loose
- Let player choose to play again
*/

// Game value
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max ),
    guessesLeft = 3;

    // UI Element
    const game = document.querySelector('#game'),
          minNum = document.querySelector('.min-num'),
          maxNum = document.querySelector('.max-num'),
          guessBtn = document.querySelector('#guess-btn'),
          guessInput = document.querySelector('#guess-input'),
          message = document.querySelector('.message');

       // Assign UI min and max 
       minNum.textContent = min;
       maxNum.textContent = max;

      //  Play again event listiner 
      game.addEventListener('mousedown', function(e){
        if (e.target.className === 'play-again') {
           window.location.reload();
        }
      });

      //  listen for guess eventlistener
      guessBtn.addEventListener('click', function(){
        let guess = parseInt(guessInput.value);

        // validate
        if (isNaN(guess) || guess < min || guess > max){
          setMessage(`please enter a number between ${min} and ${max}`, 'red')
        }

        // check if won 
        if (guess === winningNum) {
          //  Game over won 
          gameOver(true, `${winningNum} is correct, YOU WIN!`);

        } else {
          // wrong number 
          // guessesLeft = guessesLeft - 1
          guessesLeft -= 1;
          
          if (guessesLeft === 0) {
            // Game over - lost 
           
          gameOver(false,`Game Over, you lost. the correct number was ${winningNum}` )
          } else {
            // Game continue - answer wrong

            // change border color 
            guessInput.style.color = 'red';

            // clear input 
            guessInput.value = '';

            // Tell user its the wrong message 
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
          }
        }
      });

      // Game over 
      function gameOver(won, msg) {
           let color; 
           won === true ? color = 'green' : color = 'red';

        // Disable input 
        guessInput.disabled = true;
        // change border color 
        guessInput.style.borderColor = color;
        // set text color 
        message.style.color = color;
        // set message
        setMessage(msg);

        // play again 
        guessBtn.value = 'Play Again';
        guessBtn.className += 'play-again'; 

      }

      // get winning Number 
      function getRandomNum(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
      }

      // set message 
      function setMessage(msg, color){
        message.style.color = color;
        message.textContent = msg;
      }