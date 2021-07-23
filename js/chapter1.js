function chapter1Load() {
    $("#scene__simplePhysic").click(function (e) { 
        e.preventDefault();
        simplePhysic.addRandom(e);
    });
    
    $("#scene__tip").html("<p>Click on the scene to generate random shape.<p>");

    simplePhysic.checkObjectCollision = false;
    simplePhysic.checkFrameCollision = false;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity);
    simplePhysic.simulate();
   
    console.log("-> chapter 1 loaded")
}




