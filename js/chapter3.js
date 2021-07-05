function chapter3Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addCircle(80, 50, 50, "blue");
    simplePhysic.elements[0].physic.v = new simplePhysic.vector(25,-50,0);
    simplePhysic.addCircle(40, 350, 50, "red");
    simplePhysic.elements[1].physic.v = new simplePhysic.vector(-25,0,0);
    simplePhysic.addCircle(40, 350, 300, "yellow");
    simplePhysic.elements[2].physic.v = new simplePhysic.vector(0,-55,0);
    simplePhysic.addCircle(40, 500, 100, "green");
    simplePhysic.elements[3].physic.v = new simplePhysic.vector(-55,30,0);
    simplePhysic.addCircle(70, 300, 400, "purple");
    simplePhysic.elements[4].physic.v = new simplePhysic.vector(5,-80,0);

    simplePhysic.colorizeCollision = false;
    simplePhysic.checkFrameCollision = true;
    simplePhysic.checkObjectCollision = true;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity); 
    simplePhysic.simulate();
    console.log("chapter 3 loaded");
}