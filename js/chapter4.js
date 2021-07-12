function chapter4Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addCircle(80, 50, 50, "blue");
    simplePhysic.addCircle(40, 350, 50, "red");
    simplePhysic.addCircle(40, 350, 300, "yellow");
    simplePhysic.addCircle(40, 500, 100, "green");
    simplePhysic.addCircle(70, 300, 400, "purple");
    simplePhysic.addCircle(80, 150, 200, "blue");
    simplePhysic.addCircle(40, 350, 350, "red");
    simplePhysic.addCircle(40, 150, 300, "yellow");
    simplePhysic.addCircle(40, 500, 200, "green");
    simplePhysic.addCircle(70, 300, 200, "purple");

    for(let i of simplePhysic.elements)
        i.physic.absorbe = 0.6;

    addDragToAllElements(simplePhysic.elements);

    simplePhysic.checkFrameCollision = true;
    simplePhysic.checkObjectCollision = true;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity); 
    simplePhysic.simulate();
    console.log("chapter 4 loaded");
}