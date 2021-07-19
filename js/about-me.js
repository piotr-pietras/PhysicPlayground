$(document).ready(function () {
    $("#about-me__sprite").click(function (e) { 
        showScene();
        showControlPanel();
        console.log("-> about me choosen");
        chapterAboutMe();
        currentlyLoadedChapter = chapterAboutMe;
    });
});

//----------------------------------------------------------------
aboutMeText = "<h3>Hello!!! :)</h3>" 
    + "<p>My name is Petero, and as a total begginer in programing I am pleased to intreduce my first library project.</p>";

mySkills = {
    a : 1,
    b : 2,
    c : 3};

//----------------------------------------------------------------
function chapterAboutMe() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").empty();

    $("<div>").attr("id", "about-me__textarea").appendTo("#scene__simplePhysic");
    //Typing thread
    let i = 1;
    let typing = setInterval(() => {
        $("#about-me__textarea").html(aboutMeText.substring(0,i) + "  |");
        i++;

        if(i >= aboutMeText.length) {
            $("about-me__textarea").text(aboutMeText);
            $("<button>").attr("id", "about-me__button").appendTo("#scene__simplePhysic");
            tooltipMySkills();
            clearInterval(typing);
        }
    }, 7 /*<- typing speed */);

    console.log("-> about me loaded") 
}

//Shows aboutme-skills tooltip
function tooltipMySkills(){
    $("#about-me__button").click(function (e) {  
        $("#about-me__skills").css({display: "grid",});       
    });

    $("#about-me__button").mousemove(function (e) {  
        $("#about-me__skills").css({
            "top" : e.clientY + -100 + "px",
            "left" : e.clientX + 40 + "px"
        });       
    });

    $("#about-me__button").mouseout(function (e) {  
        $("#about-me__skills").css({display: "none"});       
    });    

    addGridMySkills(mySkills, 3);
}

//Creates table based on evaluated object's keys
function addGridMySkills(obj, maxStars){
    let skillsKeys = Object.keys(obj); // array of skill's keys
    let nC = (1 + maxStars); // n columns
    let nR = skillsKeys.length; // n rows

    $("#about-me__skills").css({
        "grid-auto-columns" : nC + ", minmax(0, 1fr)", 
        "grid-auto-rows" :  nR + ", minmax(0, 1fr)"
    });

    let toAppend = [];
    //Griding 
    for(let i = 0; i < nR; i++) {
        $("<div>").appendTo("#about-me__skills").html(skillsKeys[i]).css({
            "grid-column" : "1/" + nC,
            "grid-row" : (i + 1) + "/" + nR});
           
        for(let j = 0; j < nC - 1; j++){
            $("<div>").appendTo("#about-me__skills").css({
                "margin" : "20px",
                "grid-column" : (j + 2) + "/" + nC,
                "grid-row" : (i + 1) + "/" + nR,
                "background-color" : "green"});           
        }
    }


}


