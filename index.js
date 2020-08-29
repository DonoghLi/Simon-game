let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let keyJudge = 0;
let value = 0;
let level = 0;
let ranPosition = 1;
let rank = [];


// This part is to get the input (name) from welcome page.
$("h1").before("<h1 class='welcomeName'></h1>");
if(localStorage.getItem("key") === ""){
    $(".welcomeName").text("Welcome Player!");
}else{
    $(".welcomeName").text("Welcome " + localStorage.getItem("key") + "!");
}
$(".welcomeName").css("color", " #fff");

// when press some key, the game starts.
$(document).keydown(function (e) { 
    if(keyJudge === 0){
        keyJudge++;
        $(".original").text("Level 1");
        nextSquare(ranPosition);
    }
});

// show the next element people should remember;
function nextSquare(ranPosition){
    userClickedPattern = [];

    // change the position based on level.
    $(".rw").removeClass("rw" + ranPosition);
    if(level % 2 === 0 && level != 0){
        $(".rw").addClass("rw" + ranPosition);
    }

    // show the level.
    level++;
    $(".original").text("Level " + level);

    // randomly choose one of four elements. 
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("game:" + gamePattern);
    // animation for showing element.
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// This part is to trigger the click function.
$(".btnn").click(function (e) { 
    // avoid press the key casually, we have to define the keyJudge
    if(keyJudge === 1){
        // "this" means clicking event and choose the element after clicking.
        let userChosenColor = $(this).attr("id");
        // add it to an array stroing all clicking element. 
        userClickedPattern.push(userChosenColor);
        // play the right sound, achieve animation and check answer based on clicking.
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
        console.log(" ");
    }
});

// check the answer that people clicked.
function checkAnswer(colorIndex){
    // if click the right color, we can output a "ok" in the console page(it is not necessary).
    if(gamePattern[colorIndex] === userClickedPattern[colorIndex]){
        console.log("ok");
        // define a random position.
        ranPosition = Math.floor(Math.random() * 2 + 1);
        // if all color is right, we will show the next element automatically after 1s.
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSquare(ranPosition);
            }, 1000);
        }else if(userClickedPattern.length > gamePattern.length){
            fail();
        }
    // wrong color, return fail function to restart and reset.
    }else{
        fail();
    }
}

// this part is to restart and record the level.
function fail(){
    console.log("fail");
    keyJudge--;
    playSound("wrong");
    // change some properties for this webpage.
    $("body").addClass("game-over");
    $(".welcomeName").css("color", "rgb(255, 0, 0)");
    setTimeout(() => {
        $("body").removeClass("game-over");
        $(".welcomeName").css("color", "#fff");
    }, 500);
    $(".original").text("Press A Key to Start");

    // record the highest level for the same user.
    if(rank.length <= 3){
        rank.push(level);
        rank.sort();
        rank.reverse();
    }else{
        rank.pop();
        rank.push(level);
        rank.sort();
        rank.reverse();
    }
    let j = 1;
    for(let i = 0; i < rank.length; i++){
        $(".list-group-item" + j).text(j + ". " + localStorage.getItem("key") + ": level " + (rank[i] - 1));
        j++;
    }
    console.log(rank);
    restart();
}

// this part is an animation for the button when clicking.
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}


// play the sound for every button.
function playSound(color){
    let temp = new Audio("sounds/" + color + ".mp3");
    temp.play();
}

// restart this game and reset some vars.
function restart(){
    level = 0;
    gamePattern = [];
    started = 0;
    $(".welcomeName").text("Try again " + localStorage.getItem("key") + "!");
    $(".original").text("Press A Key to Start");
    $(".rw").removeClass("rw" + ranPosition);
}


