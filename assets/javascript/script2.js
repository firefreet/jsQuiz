if (localStorage.getItem("savedScores") === null) {
    var savedScores = []
} else {
    var savedScores = JSON.parse(localStorage.getItem("savedScores"))
}

savedScores = savedScores.sort(function(a,b) {
    if (a[1] < b[1]) return 1;
    if (a[1] > b[1]) return -1;
    return 0;
})

savedScores = savedScores.slice(0,20);

var scList = $("#scoreList")


$.each(savedScores,function(i,val){
    var addScore = $("<li>");
    addScore.addClass("list-group-item px-4");
    var usr = $("<span class=\"float-left\">");
    usr.text("User: " + val[0].toUpperCase());
    var scrEl = $("<span class=\"float-right\">");
    scrEl.text("Score: " + val[1]);
    addScore.append(usr)
    addScore.append(scrEl)
    scList.append(addScore) 
})

