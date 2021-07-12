function chapter7Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").unbind();

    simplePhysic.addRectangle(280, 50, 100, 350, "blue");
    simplePhysic.elements[0].physic.v = new simplePhysic.vector(25,00,0);
    simplePhysic.elements[0].info.c = Math.PI/4;
    //simplePhysic.elements[0].physic.w = new simplePhysic.vector(0,0,1);    

    for(let i of simplePhysic.elements)
        i.physic.absorbe = 0.00001;

    simplePhysic.checkFrameCollision = true;
    simplePhysic.checkObjectCollision = true;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity); 
    simplePhysic.simulate();
    console.log("chapter 7 loaded");
}