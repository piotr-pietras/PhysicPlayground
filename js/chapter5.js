function chapter5Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    $("#scene__simplePhysic").click(function (e) { 
        e.preventDefault();
        simplePhysic.addRectangle(50, 50, 
            e.clientX - 25, e.clientY - 25, 
            ballColors[Math.floor(Math.random() * ballColors.length)]
            );
    });
    
    simplePhysic.checkObjectCollision = false;
    simplePhysic.checkFrameCollision = false;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity);
    simplePhysic.simulate();
}