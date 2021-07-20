//-----------------------On DOC load-----------------------------------------
$(document).ready(function () {
    $("#about-me__sprite").click(function (e) { 
        showScene();
        showControlPanel();
        console.log("-> about me choosen");
        chapterAboutMe();
        currentlyLoadedChapter = chapterAboutMe;
    });
});

//-----------------------About me DATA-----------------------------------------
aboutMeText = "<h3>Hello!!! :)</h3>" 
    + "<p>My name is Petero, and as a total begginer in programing I am pleased to intreduce my first library project.</p>";

mySkills = {
    html : 1,
    css : 2,
    js : 2,
    jquery : 1,
    java : 1};

//-----------------------Chapter load-----------------------------------------
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
            $("<button>").attr("id", "about-me__button--1").html("Show my skills").appendTo("#scene__simplePhysic");
            initializeMyButton("#about-me__button--1", mySkills, 4);
            clearInterval(typing);
        }
    }, 7 /*<- typing speed */);

    console.log("-> about me loaded") 
}

//Inintialize button that shows grided tooltip with evaluations
function initializeMyButton(id, object, stars){
    $(id).click(function (e) {  
        $("#about-me__tooltip").css({display: "grid",}); 
        addMySkills(object, stars); 
    });

    $(id).mousemove(function (e) {  
        $("#about-me__tooltip").css({
            "top" : e.clientY + -100 + "px",
            "left" : e.clientX + 40 + "px"
        });       
    });

    $(id).mouseout(function (e) {  
        $("#about-me__tooltip").css({display: "none"});       
    });
}

//Creates table based on evaluated object's keys and
//adds it to about-me__tooltip
function addMySkills(obj, maxStars){
    let skillsKeys = Object.keys(obj); // array of skill's keys
    let skillsValues = Object.values(obj); // array of skill's values
    let nC = (1 + maxStars); // n columns
    let nR = skillsKeys.length; // n rows

    $("#about-me__tooltip").empty().css({
        "grid-auto-columns" : nC + ", minmax(0, 1fr)", 
        "grid-auto-rows" :  nR + ", minmax(0, 1fr)"
    });

    //Griding 
    //Interating for columns
    for(let i = 0; i < nR; i++) {
        $("<div>").appendTo("#about-me__tooltip").html("•"+skillsKeys[i]).css({
            "margin": "auto",
            "font-size": "2em",
            "grid-column" : "1/2",
            "grid-row" : (i + 1) + "/" + (i + 2),
            "text-shadow": "0px 0px 4px rgba(255, 255, 255, 1)"});
        let level = skillsValues[i];

        //Interating for rows
        for(let j = 0; j < nC - 1; j++) {
            let c;
            if(level > j) c = "about-me__skills--1";
            else c = "about-me__skills--0";

            $("<div>").addClass(c).appendTo("#about-me__tooltip").css({
                "margin" : "10px",
                "grid-column" : (j + 2) + "/" + (j + 3),
                "grid-row" : (i + 1) + "/" + (i + 2)});           
        }
    }
}


