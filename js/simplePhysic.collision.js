simplePhysic.detectObjectCollision = function (element, element2) { 
    let centerVector1 = element.getCenterVector();
    let centerVector2 = element2.getCenterVector();
    let triggerDistnace = element.properties.width/2 + element2.properties.width/2;
    let distance = this.vector.distance(centerVector1, centerVector2);
    
    //Collide
    if(distance <= triggerDistnace) {
        //Colorize collide
        if(this.colorizeCollision) {
            if(!element.properties.highlighted) element.highlightCSS();
            if(!element2.properties.highlighted) element2.highlightCSS();
        } 
        return true;
    }
    return false;
}

simplePhysic.detectFrameCollision = function (element) {
    let centerVector = element.getCenterVector();

    //Collide
    if(centerVector.x - element.properties.width/2 < 0 
    || centerVector.x + element.properties.width/2 > this.scene.clientWidth
    || centerVector.y - element.properties.height/2 < 0 
    || centerVector.y + element.properties.height/2 > this.scene.clientHeight) {
        //Colorize collide
        if(this.colorizeCollision) {
            if(!element.properties.highlighted) element.highlightCSS();
        }    
        return true;
    }   
    return false;
}

simplePhysic.affectFrameCollision = function (element) {
    //Vertical obstacle
    if(centerVector.x - element.properties.width/2 < 0 
    || centerVector.x + element.properties.width/2 > this.scene.clientWidth) {

    }
    //Horizontal obstacle
    else {

    }
}