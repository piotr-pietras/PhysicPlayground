//----------------------------------------------------------------
$(document).ready(function () {
    $("#control-panel__back").click(function (e) { 
        hideControlPanel();
        hideScene();
        simplePhysic.clearAll();
    });

    $("#control-panel__restart").click(function (e) { 
        currentlyLoadedChapter();
    });
});

//----------------------------------------------------------------
function showControlPanel() {
    console.log("-> show control panel");
    $(".control-panel").css({
        "transform" : "translateY(-100%)"});
}

function hideControlPanel() {
    console.log("-> hide control panel");
    $(".control-panel").css({
        "transform" : "translateY(100%)"});
}





