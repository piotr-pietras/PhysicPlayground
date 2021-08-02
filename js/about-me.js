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
    + "<p>My name is Petero and as a total begginer in programing I am pleased to intreduce 'simplePhysic' my first library project to simulate shape's physic. " 
    + "I haven't used any external library and since beginning it's basically plain js code.</p>"
    + "<p>I encourage to visit my GitHub repository (button below)</p>"
    + "<p>Have fun on playground :)</p>";

mySkills = {
    html : 1,
    css : 2,
    js : 2,
    jquery : 1,
    java : 1};

//-----------------------Chapter load-----------------------------------------
function chapterAboutMe() {
    $("#scene__tip").html("");
    $("<div>").attr("id", "about-me__textarea").appendTo("#scene__simplePhysic");
    //Typing thread
    let i = 1;
    let typing = setInterval(() => {
        $("#about-me__textarea").html(aboutMeText.substring(0,i) + "  |");
        i++;
        
        //Aborte type when scene hid
        if(!currentlyLoadedChapter) clearInterval(typing);

        //Add button at end of typing
        if(i >= aboutMeText.length) {
            $("about-me__textarea").text(aboutMeText);
            $("<button>").attr("id", "about-me__button--1").html("Show my skills").appendTo("#scene__simplePhysic");
            initializeMyButton("#about-me__button--1", () => {return addMySkills(mySkills, 4)});
            $("<button>").attr("id", "about-me__button--2").html("GitHub repository").appendTo("#scene__simplePhysic")
                .click(() => {window.open("https://github.com/peterooo94/PhysicPlayground", "GitHub")});
            $("<button>").attr("id", "about-me__button--3").html("Library DOC").appendTo("#scene__simplePhysic")
                .click(() => {window.open("http://www.peterooo94.online/doc/doc.pdf", "Library DOC")});
            clearInterval(typing);
        }
    }, 45 /*<- typing speed */);

    console.log("-> about me loaded") 
}

//----------------------------------------------------------------
//MyButton
//----------------------------------------------------------------
//Inintialize button that shows grided tooltip with evaluations
function initializeMyButton(id, fun){
    $(id).click(function (e) {  
        $("#about-me__tooltip").css({display: "grid",}); 
        fun();
    });

    $(id).mousemove(function (e) {  
        $("#about-me__tooltip").css({
            "top" : e.clientY + -220 + "px",
            "left" : e.clientX + 40 + "px"
        });       
    });

    $(id).mouseout(function (e) {  
        $("#about-me__tooltip").css({display: "none"}).empty();       
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
        $("<h1>").addClass("about-me__rowtitle").appendTo("#about-me__tooltip").html(skillsKeys[i])
        .css({
            "grid-column" : "1/2",
            "grid-row" : (i + 1) + "/" + (i + 2)});
        let level = skillsValues[i];

        //Interating for rows
        for(let j = 0; j < nC - 1; j++) {
            let c;
            if(level > j) c = "about-me__skills--1";
            else c = "about-me__skills--0";

            $("<div>").addClass(c).appendTo("#about-me__tooltip").css({
                "grid-column" : (j + 2) + "/" + (j + 3),
                "grid-row" : (i + 1) + "/" + (i + 2)});           
        }
    }
}


