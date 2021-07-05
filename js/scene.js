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
    let zIndex = 1;
    let drag = undefined;
    for(let i of elements) {
        $(i.elementHTML).mouseenter(function (e) { 
            $((i.elementHTML)).css({cursor: "grab"});
        });

        $(i.elementHTML).mousedown(function (e) { 
            if(!drag) {
                i.setDragging(true);
                drag = i.elementHTML; 
                i.elementHTML.style.zIndex = ++zIndex;
                $((i.elementHTML)).css({cursor: "grabbing"});
            }
        });      
        
        $(i.elementHTML).mouseup(function () { 
            i.setDragging(false);
            drag = undefined;
            $((i.elementHTML)).css({cursor: "grab"});
        });

        $(simplePhysic.scene).mouseup(function () { 
            i.setDragging(false);
            drag = undefined;
        });       

        $(simplePhysic.scene).mousemove(function (e) { 
            if(drag == i.elementHTML) {
                i.setPosition(
                    e.clientX - i.info.width/2, 
                    e.clientY - i.info.width/2, i.info.c);
            }
        });   
    }
}

