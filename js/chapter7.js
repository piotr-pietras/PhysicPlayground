function chapter7Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addRectangle(280, 50, 100, 350, "blue");
    //simplePhysic.elements[0].physic.v = new simplePhysic.vector(25,00,0);
    simplePhysic.elements[0].info.c = Math.PI/7;
    simplePhysic.addRectangle(50, 50, 300, 100, "red");
    //implePhysic.elements[0].physic.w = new simplePhysic.vector(0,0,1);    
    simplePhysic.addRectangle(100, 50, 200, 100, "green");

    simplePhysic.addDragToAllElements(simplePhysic.elements);

    for(let i of simplePhysic.elements)
        i.physic.absorbe = 1;

    simplePhysic.checkFrameCollision = true;
    simplePhysic.checkObjectCollision = true;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity); 
    simplePhysic.simulate();
    console.log("chapter 7 loaded");
}