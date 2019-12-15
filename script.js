var headEl = $("#sectionHeader")
var contEl = $("#sectionContent")
var respEl = $("#response")
var stEndEl = $("#startEndBtn")
var cardEl = $(".card-body")
var respDiv = $("#respDiv")
var timeSpn = $("#timeSpan")
var intervalID = 0;
var qNum = 0;
var totalQs = qs.length;
var seconds = 0;
var answClickable = true;
var gameActive = true;
var pauseSeconds = false;
var tempBtnClasses = "btn btn-primary m-2 tempBtn";
if (localStorage.getItem("savedScores") === null) {
    var savedScores = []
} else {
    var savedScores = JSON.parse(localStorage.getItem("savedScores"))
}

// sounds from zapsplat.com
var fail = new Audio("shortCrash.m4a")
var succeed = new Audio("shortBell.m4a")

stEndEl.on("click",startQuiz);
cardEl.on("click",".tempBtn",answerQuestion);

respDiv.hide()

function startQuiz () {
    pauseSeconds = false;
    gameActive = true;
    answClickable = true;
    seconds = totalQs * 15;
    qNum = 0;
    // display Question in HR
    headEl.text("Question: ")
    // hide startEndBtn
    stEndEl.hide()
    // start timer interval for displaying seconds
    timeSpn.text(seconds)
    intervalID = setInterval(() => {
        if (!pauseSeconds) {
            seconds--
        }
        if (seconds === 0 || qNum === totalQs) {
            gameActive = false
            wrapUp()
            respDiv.show()
            clearInterval(intervalID)
        } 
        timeSpn.text(seconds)
    }, 1000);
    // call displayQ
    displayQ()
}

function clearButtons(){
    // remove any previous buttons
    var answArr = $(".tempBtn")
    $.each(answArr, function(i,val) {
        val.remove()
    })
}

function displayQ () {
    // display question
    respDiv.hide()
    clearButtons()
    contEl.text(qs[qNum].question)
    // loop to display all choices
    $.each(qs[qNum].choices,function(i,val){
        var newBtn = $("<button>")
        newBtn.text(val)
        newBtn.addClass(tempBtnClasses)
        respDiv.before(newBtn)
    })
}

function saveScore() {
    if (event.key === "Enter" || event.type === "click")
        if ($(".initBox").val() === "") {
            alert ("Please enter initials")
        }
        else if (!$("#saveBtn").hasClass("disabled")) {
            $("#saveBtn").addClass("disabled")
            $("#saveBtn").text("Saved")
            var score = [ $(".initBox").val(), seconds ]
            savedScores.push(score)
            localStorage.setItem("savedScores",JSON.stringify(savedScores))
            $(".initBox").attr("readonly","true")
            alert("Score saved")
        }
}

function wrapUp() {
    // Header for Summary
    clearButtons()
    headEl.text("Game Over!!");
    // general text shows score
    contEl.text("Your Score is " + seconds)
    // display input box for initials
    respEl.text("Add your initials to save score:")
    var initBox = $("<input>");
    initBox.addClass("form-control w-50 mx-auto initBox text-center")
    initBox.attr("type","text")
    initBox.attr("maxlength","3")
    respEl.append(initBox)
    // display button for save
    var saveBtn = $("<button id=\"saveBtn\">")
    saveBtn.text("Save")
    saveBtn.addClass(tempBtnClasses)
    respEl.append(saveBtn)
    // display button for play again
    var replayBtn = $("<button id=\"replayBtn\">")
    replayBtn.text("Play Again?")
    replayBtn.addClass(tempBtnClasses)
    respEl.append(replayBtn)
    $("#saveBtn").on("click",saveScore);
    $(".initBox").on("keyup",saveScore);
    $("#replayBtn").on("click",startQuiz);
}

function answerQuestion() {
    if (answClickable) {
        // stop buttons from doing anything until next Q
        answClickable = false
        // stop timer from decrementing until next Q
        pauseSeconds = true;
        event.stopPropagation
        var resp = ""
        // get user's answer as text
        choice = event.target.textContent
        // validate user's answer against correct answer
        answ = qs[qNum].answer
        // creat appropriate response
        if (choice === answ) {
        resp = "Correct!  "
        succeed.play()
        }
        else {
            resp = "Incorrect...  "
            fail.play();
            seconds = Math.max(seconds - 10,0);
            if (seconds === 0) {
                gameActive = false;
            }
        }
        // display response
        respEl.html(resp + "The answer is: <br>" + answ)
        respDiv.show()
        // if qs and seconds remain...
        if (qNum < totalQs-1 && gameActive) {
            // wait 1 seconds to allow player to see answer
            setTimeout(() => {
                // increment to next question
                qNum++
                // allow users to click answer buttons
                answClickable = true;
                displayQ()
                // restart seconds countdown
                pauseSeconds = false;            
            }, 1000);
        }
        // if no Qs remain, or time has run out
        else {
            setTimeout(() => {
                wrapUp()
            }, 1000);
        }
    }

}


