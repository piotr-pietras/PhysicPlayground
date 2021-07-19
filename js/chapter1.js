ballColors = [
    "red", "yellow", "green", "blue", "purple"
];

function chapter1Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").empty();

    $("#scene__simplePhysic").click(function (e) { 
        e.preventDefault();
        simplePhysic.addCircle(50, 
            e.clientX - 25, e.clientY - 25, 
            ballColors[Math.floor(Math.random() * ballColors.length)]
            );
    });
    
    simplePhysic.checkObjectCollision = false;
    simplePhysic.checkFrameCollision = false;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity);
    simplePhysic.simulate();
   
    console.log("-> chapter 1 loaded")
}




