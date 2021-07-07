function chapter6Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addRectangle(100, 50, 100, 50, "black");
    simplePhysic.elements[0].physic.w = new simplePhysic.vector(0,0,5);
    //simplePhysic.addRectangle(150, 60, 300, 100, "black");

    addDragToAllElements(simplePhysic.elements);

    simplePhysic.colorizeCollision = true;
    simplePhysic.checkObjectCollision = true;
    simplePhysic.checkFrameCollision = true;
    simplePhysic.activeEffects = [];
    simplePhysic.simulate();
    console.log("chapter 6 loaded");
}