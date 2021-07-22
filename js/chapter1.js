ballColors = [
    "red", "yellow", "green", "blue", "purple"
];

function chapter1Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").empty().unbind();;

    $("#scene__simplePhysic").click(function (e) { 
        e.preventDefault();
        simplePhysic.addRandom(e);
    });
    
    simplePhysic.checkObjectCollision = false;
    simplePhysic.checkFrameCollision = false;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity);
    simplePhysic.simulate();
   
    console.log("-> chapter 1 loaded")
}




