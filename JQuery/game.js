
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var keyPressed = false;
var level = 0;

$(document).keypress(function(){
    if(!keyPressed){
        $("#level-title").text("Level " + level);
        nextSequence();
        keyPressed = true;
    }   
});

// after keypress, increase the level to 1, and change the h1 title.... then it generate the random color and store it in game pattern array..
function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
   
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).animate({opacity: 0.5}, 100).animate({opacity: "100%"},100);       
    playSound(randomChosenColour);    
}

$(".btn").on("click", function(){
    
    var userChosenColour = $(this).attr("id"); 
    userClickedPattern.push(userChosenColour); 
    
    playSound(userChosenColour);
    animatePress($(this));
    // we can add like.... animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else{
        console.log("Wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over")
        }, 200);
        playSound("wrong");
        startOver();
    }
}

function startOver(){
    
   level = 0;
   keyPressed = false;
   gamePattern = [];

}

function  playSound(name){
    
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){

    currentColour.addClass("pressed");
    setTimeout(() => {
        currentColour.removeClass("pressed");
    }, 100);  
    //instead of currentColour....use $("#" + currentColor).addClass("pressed");
}
























































