$(document).ready(function() {

  // Define global variables
  const buttonColours = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userClickedPattern = [];
  let started = false;
  let level = 0;


  // Call next sequence function
  $(".playBtn").click(function() {

    if (started === false) {
      nextSequence();
      started = true;
    }

  });

  // Button click function
  $(".btn").click(function() {

    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // Play clicked button
    playSound(userChosenColour);
    animatePress(userChosenColour);

    setTimeout(function() {
      animatePress(userChosenColour);
    }, 100);

    checkAnswer(userClickedPattern.length-1);

  });

  // Check Answer function

  function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {

      playSound("wrong");
      $("body").toggleClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").toggleClass("game-over");
      }, 200);

      startOver();
    }
  }

  // Next sequence function
  function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // FLASH BUTTON
    $("#" + randomChosenColour).fadeTo(100, 0.2, function() {
      $(this).fadeTo(100, 1.0);
    });

    // PLAY SOUND
    playSound(randomChosenColour);
  }

  // Play sound function
  function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

  }

  // Animate press function
  function animatePress(currentColour) {

    $("#" + currentColour).toggleClass("pressed");

  }

  function startOver() {

      level = 0;
      gamePattern = [];
      started = false;

  }

});
