var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level=0;
var gamePattern = [];
var started=false;



$("body").on("keypress",function(){
  if(!started){
  $("h1").html("Level"+ level);
  started=true;
  nextSequence();
  }
})



function nextSequence() {
  userClickedPattern=[];//agar ye nahi karoge to current color correct click karne waala game ban jaayega

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
  level=level+1;
  $("h1").html("Level" + " "+level);
  
}
function playSound(name) {

  //3. Take the code we used to play sound in the nextSequence() function and add it to playSound().
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
console.log(userClickedPattern);
playSound(userChosenColor);
animatePress(userChosenColor);
gameProcedure(userClickedPattern.length-1);
});



function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");

  setTimeout(function(){
    $("#"+ currentColour).removeClass("pressed");

  },100)
}
  
  

  function gameProcedure(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
      console.log("success");
      if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000)
        
      }
    
    }
    else{
      
      var wrongSound=new Audio("./sounds/wrong.mp3");
      wrongSound.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200)
      $("h1").html("Wrong key pressed!!! GAME OVER!! PRESS any KEY to start again");
      $("body").on("keypress",function(){
        startOver();
      });
    }
    }


    function startOver(){
      level=0;
      gamePattern=[];
      started=false;
      
    }
  
  



