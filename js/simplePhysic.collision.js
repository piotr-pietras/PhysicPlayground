simplePhysic.objectCollision = function (element, element2) { 
    let centerVector1 = element.getCenterVector();
    let centerVector2 = element2.getCenterVector();
    let triggerDistnace = element.properties.width/2 + element2.properties.width/2;
    let distance = this.vector.vectorDistance(centerVector1, centerVector2);
    
    //Collide
    if(distance <= triggerDistnace) {
        console.log("collide");
        //Colorize collide
        if(this.colorizeCollision) {
            if(!element.properties.highlighted) element.highlightCSS();
            if(!element2.properties.highlighted) element2.highlightCSS();
        } 
        return true;
    }
    return false;
}

simplePhysic.frameCollision = function (element) {
    let centerVector1 = element.getCenterVector();
    x = simplePhysic.scene.width;
    y = simplePhysic.scene.height;
}