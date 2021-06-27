function chapter2Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addCircle(100, 100, 50, "black");
    simplePhysic.addCircle(150, 300, 100, "black");
    simplePhysic.addCircle(50, 200, 200, "black");
    simplePhysic.addCircle(50, 200, 300, "black");
    simplePhysic.addCircle(50, 50, 25, "black");
    simplePhysic.addCircle(50, 50, 350, "black");
    simplePhysic.addCircle(25, 350, 25, "black");
    simplePhysic.addCircle(100, 400, 300, "black");

    addDragToAllElements(simplePhysic.elements);

    simplePhysic.colorizeCollision = true;
    simplePhysic.checkFrameCollision = false;
    simplePhysic.activeEffects = [];
    simplePhysic.simulate();
    console.log("chapter 2 loaded");
}