function showScene() {
    console.log("show scene");
    $(".scene").css({
        transform: "translateY(100%)"});
}

function hideScene() {
    console.log("hide scene");
    $(".scene").css({
        transform: "translateY(-100%)"});
}

function addDragToAllElements(elements) {
    let drag = undefined;
    for(let i of elements) {
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
}

