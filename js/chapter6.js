function chapter6Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addRectangle(100, 50, 100, 50, "black");
    simplePhysic.elements[0].info.c = Math.PI/2;
    //simplePhysic.elements[0].physic.w = new simplePhysic.vector(0,0,5);
    //simplePhysic.addRectangle(300, 100, 0, 0, "black");

    let vectors = simplePhysic.elements[0].getPointVector()
    console.log(vectors[0]);
    console.log(vectors[1]);
    console.log(vectors[2]);
    console.log(vectors[3]);
    console.log(vectors[4]);


    addDragToAllElements(simplePhysic.elements);

    simplePhysic.checkObjectCollision = true;
    simplePhysic.checkFrameCollision = true;
    simplePhysic.activeEffects = [];
    simplePhysic.simulate();
    console.log("chapter 6 loaded");
}