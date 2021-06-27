function chapter3Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addCircle(100, 100, 50, "black"); 

    addDragToAllElements(simplePhysic.elements);

    simplePhysic.colorizeCollision = true;
    simplePhysic.checkObjectCollision = false;
    simplePhysic.activeEffects = [];
    simplePhysic.simulate();
}