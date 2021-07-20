//-----------------------Scene control-----------------------------------------
function showScene() {
    console.log("-> show scene");
    $(".scene").css({
        "transform" : "translateY(100%)"});
}

function hideScene() {
    console.log("-> hide scene");
    $(".scene").css({
        "transform" : "translateY(-100%)"});
}


