function chapter3Load() {
    simplePhysic.clearAll();
    $("#scene__simplePhysic").empty().unbind();

    $("#scene__simplePhysic").click(function (e) { 
        e.preventDefault();
        simplePhysic.addRandom(e);
    });

    //simplePhysic.addRectangle(100, 100, 100, 100, "blue");
    //simplePhysic.elements[0].info.c = Math.PI/5;
    //simplePhysic.addRectangle(50, 50, 300, 100, "red");
    //simplePhysic.addCircle(100, 100, 50, "purple");

    simplePhysic.addDragToAllElements(simplePhysic.elements);

    for(let i of simplePhysic.elements)
        i.physic.elastic = 0.5;

    simplePhysic.checkFrameCollision = true;
    simplePhysic.checkObjectCollision = true;
    simplePhysic.activeEffects.push(simplePhysic.effectOfGravity); 
    simplePhysic.simulate();
    console.log("-> chapter 3 loaded");
}