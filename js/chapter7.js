function chapter7Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addRectangle(80, 100, 50, 50, "blue");
    simplePhysic.elements[0].physic.v = new simplePhysic.vector(25,-50,0);
    simplePhysic.elements[0].info.c = 0;

    for(let i of simplePhysic.elements)
        i.physic.absorbe = 0.3;

    simplePhysic.colorizeCollision = false;
    simplePhysic.checkFrameCollision = true;
    simplePhysic.checkObjectCollision = true;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity); 
    simplePhysic.simulate();
    console.log("chapter 7 loaded");
}