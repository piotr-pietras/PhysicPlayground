function chapter2Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").empty().unbind();

    simplePhysic.addCircle(150, 400, 100, "black");
    simplePhysic.addCircle(50, 180, 200, "black");
    simplePhysic.addCircle(50, 150, 300, "black");
    simplePhysic.addCircle(40, 50, 25, "black");
    simplePhysic.addCircle(80, 50, 350, "black");
    simplePhysic.addCircle(25, 350, 25, "black");
    simplePhysic.addCircle(25, 370, 180, "black");
    simplePhysic.addCircle(25, 350, 280, "black");
    simplePhysic.addCircle(25, 250, 290, "black");
    simplePhysic.addCircle(25, 300, 300, "black");
    simplePhysic.addCircle(75, 250, 50, "black");
    simplePhysic.addCircle(100, 400, 300, "black");
    simplePhysic.addCircle(50, 200, 500, "black");
    simplePhysic.addCircle(75, 150, 555, "black");
    simplePhysic.addCircle(50, 30, 520, "black");
    simplePhysic.addCircle(100, 50, 600, "black");
    simplePhysic.addCircle(100, 500, 550, "black");
    simplePhysic.addCircle(50, 100, 500, "black");
    simplePhysic.addCircle(100, 150, 80, "black");
    simplePhysic.addCircle(50, 300, 150, "black");

    simplePhysic.addRectangle(55, 80, 50, 100, "black");
    simplePhysic.addRectangle(55, 50, 300, 215, "black");
    simplePhysic.addRectangle(100, 50, 50, 200, "black");
    simplePhysic.addRectangle(30, 50, 200, 400, "black");
    simplePhysic.addRectangle(90, 250, 300, 350, "black");
    simplePhysic.addRectangle(55, 55, 80, 440, "black");
    simplePhysic.addRectangle(55, 605, 620, 50, "black");

    simplePhysic.addDragToAllElements(simplePhysic.elements);

    simplePhysic.checkObjectCollision = true;
    simplePhysic.checkFrameCollision = false;
    simplePhysic.activeEffects = [];
    simplePhysic.simulate();
    console.log("-> chapter 2 loaded");
}