currentlyLoadedChapter = undefined;

$(document).ready(function () {

    $("[id^='menu__option']").mousemove(function (e) { 
        $("#menu__tooltip").text($(this).attr("data-tooltip"));    
        $("#menu__tooltip").css({
            opacity: 1,
            top: e.clientY + 20 + "px",
            left: e.clientX + 20 + "px"
        });       
    });

    $("[id^='menu__option']").mouseout(function () { 
        $("#menu__tooltip").css({
            opacity: 0
        });
    });

    $("[id^='menu__option']").click(function () { 
        showScene();
        showControlPanel();
    });

    $("#menu__option--1").click(function (e) { 
        console.log("chapter 1 choosen")
        chapter1Load();
        currentlyLoadedChapter = chapter1Load;
    });

    $("#menu__option--2").click(function (e) { 
        console.log("chapter 2 choosen")
        chapter2Load();
        currentlyLoadedChapter = chapter2Load;
    });

    $("#menu__option--3").click(function (e) { 
        console.log("chapter 3 choosen")
        chapter3Load();
        currentlyLoadedChapter = chapter3Load;
    });

    $("#menu__option--4").click(function (e) { 
        console.log("chapter 4 choosen")
        chapter4Load();
        currentlyLoadedChapter = chapter4Load;
    });

    $("#menu__option--5").click(function (e) { 
        console.log("chapter 5 choosen")
        chapter5Load();
        currentlyLoadedChapter = chapter5Load;
    });

    $("#menu__option--6").click(function (e) { 
        console.log("chapter 6 choosen")
        chapter6Load();
        currentlyLoadedChapter = chapter6Load;
    });
});

