var gamePattern=[];
var userClickedPattern=[];
var randomColours=["red","blue","green","yellow"];
var level=0;


$(document).keypress(function(){
    if (level===0){
      $("#level-title").text("Level "+level);
      nextSequence();
    }
});

$(".btn").click(function handler(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour); 
    checkAnswer(userClickedPattern.length-1);
    if(userClickedPattern.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=randomColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}  

function playSound(name){
    var audio1=new Audio("sounds/"+name+".mp3");
    audio1.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");
    }
    else{
        console.log("Wrong");
        // console.log("gameColor="+gamePattern[currentLevel]);
        // console.log("userChosenColor="+userClickedPattern[currentLevel]);
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over!Press any key to restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
}

