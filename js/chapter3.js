function chapter3Load() {
    $("#scene__tip").html("<p>Press down mouse button to grab and move shapes.<p>"
                        + "<p>Elastic collision simulation without friction.<p>");

    simplePhysic.addRectangle(100, 100, 50, 100, "blue");
    simplePhysic.elements[0].info.c = Math.PI/5;
    simplePhysic.addRectangle(50, 50, 150, 100, "red");
    simplePhysic.elements[1].info.c = Math.PI/7;
    simplePhysic.addRectangle(50, 100, 250, 100, "green");
    simplePhysic.elements[2].info.c = Math.PI/3;
    simplePhysic.addRectangle(75, 50, 350, 100, "yellow");
    simplePhysic.elements[3].info.c = Math.PI/3;
    simplePhysic.addRectangle(25, 250, 450, 100, "purple");       
    simplePhysic.elements[4].info.c = Math.PI/7;

    simplePhysic.addCircle(25, 50, 50, "blue");
    simplePhysic.addCircle(35, 100, 10, "red");
    simplePhysic.addCircle(45, 200, 50, "green");
    simplePhysic.addCircle(35, 300, 10, "yellow");
    simplePhysic.addCircle(50, 400, 10, "purple");

    simplePhysic.addDragToAllElements(simplePhysic.elements);

    for(let i of simplePhysic.elements)
        i.physic.elastic = 0.5;

    simplePhysic.checkFrameCollision = true;
    simplePhysic.checkObjectCollision = true;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity); 
    simplePhysic.simulate();
    console.log("-> chapter 3 loaded");
}