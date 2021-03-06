//-----------------------On DOC load-----------------------------------------
$(document).ready(function () {
    $("#control-panel__back").click(function (e) { 
        hideControlPanel();
        hideScene();
        simplePhysic.clearAll();
    });

    $("#control-panel__restart").click(function (e) { 
        simplePhysic.clearAll();
        $("#scene__simplePhysic").empty().unbind();
        currentlyLoadedChapter();       
    });
});

//-----------------------Panel control-----------------------------------------
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





