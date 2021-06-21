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
    });
});

