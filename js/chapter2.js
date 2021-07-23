function chapter2Load() {
    $("#scene__tip").html("<p>Press down mouse button to grab and move shapes.<p>" 
                        + "<p>Iterates functions of collision detection.</p>");

    simplePhysic.addRectangle(55, 80, 50, 100, "grey");
    simplePhysic.elements[0].info.c = Math.PI/7;
    simplePhysic.addRectangle(55, 50, 300, 215, "grey");
    simplePhysic.addRectangle(100, 50, 50, 200, "grey");
    simplePhysic.elements[2].info.c = -Math.PI/7;
    simplePhysic.addRectangle(30, 50, 200, 400, "grey");
    simplePhysic.addRectangle(90, 250, 300, 350, "grey");
    simplePhysic.addRectangle(55, 55, 80, 440, "grey");
    simplePhysic.addRectangle(55, 605, 550, 5, "grey");
    simplePhysic.elements[6].info.c = Math.PI/7;

    simplePhysic.addCircle(150, 400, 100, "grey");
    simplePhysic.addCircle(50, 180, 200, "grey");
    simplePhysic.addCircle(50, 150, 300, "grey");
    simplePhysic.addCircle(40, 50, 25, "grey");
    simplePhysic.addCircle(80, 50, 350, "grey");
    simplePhysic.addCircle(25, 350, 25, "grey");
    simplePhysic.addCircle(25, 370, 180, "grey");
    simplePhysic.addCircle(25, 350, 280, "grey");
    simplePhysic.addCircle(25, 250, 290, "grey");
    simplePhysic.addCircle(25, 300, 300, "grey");
    simplePhysic.addCircle(75, 250, 50, "grey");
    simplePhysic.addCircle(100, 400, 300, "grey");
    simplePhysic.addCircle(50, 200, 500, "grey");
    simplePhysic.addCircle(75, 150, 555, "grey");
    simplePhysic.addCircle(50, 30, 520, "grey");
    simplePhysic.addCircle(100, 50, 600, "grey");
    simplePhysic.addCircle(100, 500, 550, "grey");
    simplePhysic.addCircle(50, 100, 500, "grey");
    simplePhysic.addCircle(100, 150, 80, "grey");
    simplePhysic.addCircle(50, 300, 150, "grey");

    simplePhysic.addDragToAllElements(simplePhysic.elements);

    simplePhysic.checkObjectCollision = true;
    simplePhysic.checkFrameCollision = false;
    simplePhysic.activeEffects = [];
    simplePhysic.simulate();
    console.log("-> chapter 2 loaded");
}