function chapter2Load() {
    $("#scene__simplePhysic").unbind();

    simplePhysic.addCircle(100, 100, 50, "black");
    simplePhysic.addCircle(150, 300, 100, "black");
    simplePhysic.addCircle(50, 200, 200, "black");
    simplePhysic.addCircle(25, 350, 25, "black");

    let drag = undefined;
    for(let i of simplePhysic.elements) {
        $(i.elementHTML).mouseenter(function (e) { 
            $((i.elementHTML)).css({cursor: "move"});
        });
        $(i.elementHTML).click(function (e) { 
            if(!drag) {
                drag = i.elementHTML; 
                drag.style.zIndex = "1";
            }
            else {
                drag.style.zIndex = "0";
                drag = undefined;
            }

        });      
        $(simplePhysic.scene).mousemove(function (e) { 
            if(drag == i.elementHTML) i.setPosition(
                e.clientX - i.properties.width/2, 
                e.clientY - i.properties.width/2);
        });        
    }

    simplePhysic.simulate();
    console.log("chapter 2 loaded");
}