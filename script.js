var headEl = $("#sectionHeader")
var contEl = $("#sectionContent")
var respEl = $("#response")
var stEndEl = $(".startEndBtn")
var cardEl = $(".card-body")
var respDiv = $("#respDiv")
var timeSpn = $("#timeSpan")
var intervalID = 0;
var qNum = 0;
var qs = []
var totalQs = qs.length;
var seconds = 0;
var answClickable = true;
var gameActive = true;
var pauseSeconds = false;
var tempBtnClasses = "btn btn-dark m-2 tempBtn btn-sm w-100";
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

    switch ($(this).data("quiznum")) {
        case 1:
        qs = questions1;
        break;
        case 2:
        qs = questions2;
        break;
    }
    totalQs = qs.length;
    pauseSeconds = false;
    gameActive = true;
    answClickable = true;
    seconds = totalQs * 15;
    qNum = 0;
    // display Question in HR
    // hide startEndBtn
    stEndEl.hide()
    // start timer interval for displaying seconds
    timeSpn.text(seconds)
    intervalID = setInterval(() => {
        if (!pauseSeconds) {
            seconds--
        }
        if (seconds <= 0 || qNum === totalQs) {
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
    respDiv.hide();
    clearButtons();
    headEl.text("Question: " + (qNum+1));
    contEl.html(qs[qNum].question);
    var newRow = $("<div>");
    newRow.addClass("row d-flex flex-wrap");
    respDiv.before(newRow);
    // loop to display all choices
    $.each(qs[qNum].choices,function(i,val){
        var newBtn = $("<button>");
        var newCol = $("<div>");
        newCol.addClass("col-12 col-lg-6");
        newBtn.text(val);
        newBtn.addClass(tempBtnClasses);
        newCol.append(newBtn);
        newRow.append(newCol);
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
    initBox.addClass("form-control w-50 mx-auto initBox text-center tempBtn")
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
    $("#replayBtn").on("click",resetPage);
}

function resetPage() {
    clearButtons();
    respDiv.hide();
    stEndEl.show();
    headEl.text("JavaScript Quiz");
    contEl.html("Would you like to take a Quiz? <br><small>(Q set 1 from <a href=\"https://jaxenter.com/know-your-javascript-trivia-134924.html\">jaxenter.com</a>)<br>(Q set 2 extrapolated from <a href=\"https://www.toptal.com/javascript/interview-questions\">toptotal.com</a>)</small>");

}

function answerQuestion() {
    if (answClickable && gameActive) {
        $(this).addClass("btn-outline-dark").removeClass("btn-dark");
        // stop buttons from doing anything until next Q
        answClickable = false
        // stop timer from decrementing until next Q
        pauseSeconds = true;
        event.stopPropagation;
        var resp = "";
        // get user's answer as text
        choice = event.target.textContent;
        // validate user's answer against correct answer
        answ = qs[qNum].answer;
        // creat appropriate response
        if (choice === answ) {
        resp = "Correct!<br>";
        succeed.play();
        }
        else {
            resp = "Incorrect...  (10 second penalty!)<br>";
            fail.play();
            seconds = Math.max(seconds - 10,0);
            if (seconds === 0) {
                gameActive = false;
            }
        }
        // display response
        respEl.html(resp + "The answer is: <br>" + answ);
        respDiv.show();
        // scroll to the bottom of the page (for when the answer drops that low)
        $("html, body").animate({scrollTop: $(document).height() }, 0)
        // if qs and seconds remain...
        if (qNum < totalQs-1 && gameActive) {
            // wait 2 seconds to allow player to see answer
            setTimeout(() => {
                // increment to next question
                qNum++
                // allow users to click answer buttons
                answClickable = true;
                displayQ()
                // restart seconds countdown
                pauseSeconds = false;            
            }, 2000);
        }
        // if no Qs remain, or time has run out
        else {
            setTimeout(() => {
                wrapUp()
                qNum++
            }, 2000);
        }
    }

}
