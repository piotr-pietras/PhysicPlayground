$(document).ready(function () {

    $(".menu__option").mousemove(function (e) { 
        $(".menu__tooltip").text($(this).attr("data-tooltip"));    
        $(".menu__tooltip").css({
            opacity: 1,
            top: e.clientY + 10 + "px",
            left: e.clientX + 10 + "px"
        });

    });

    $(".menu__option").mouseout(function () { 
        $(".menu__tooltip").css({
            opacity: 0
        });
    });
});

