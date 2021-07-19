function chapter6Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").empty();

    simplePhysic.addRectangle(100, 50, 100, 50, "black");
    //simplePhysic.elements[0].info.c = Math.PI/4;
    //simplePhysic.elements[0].physic.w = new simplePhysic.vector(0,0,5);
    simplePhysic.addRectangle(300, 100, 300, 300, "black");
    simplePhysic.elements[1].info.c = Math.PI/4;

    simplePhysic.addDragToAllElements(simplePhysic.elements);

    simplePhysic.checkObjectCollision = true;
    simplePhysic.checkFrameCollision = true;
    simplePhysic.activeEffects = [];
    simplePhysic.simulate();
    console.log("-> chapter 6 loaded");
}