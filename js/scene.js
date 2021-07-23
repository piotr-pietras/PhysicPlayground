//-----------------------Scene control-----------------------------------------
function showScene() {
    console.log("-> show scene");
    $(".scene").css({
        "transform" : "translateY(100%)"});
}

function hideScene() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").empty().unbind();
    currentlyLoadedChapter = undefined;
    console.log("-> hide scene");
    $(".scene").css({
        "transform" : "translateY(-100%)"});
}


