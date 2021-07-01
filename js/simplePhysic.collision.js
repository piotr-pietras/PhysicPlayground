simplePhysic.detectObjectCollision = function (element1, element2) { 
    let centerVector1 = element1.getCenterVector();
    let centerVector2 = element2.getCenterVector();
    let triggerDistnace = element1.properties.width/2 + element2.properties.width/2;
    let distance = this.vector.distance(centerVector1, centerVector2);
    
    //Collide
    if(distance <= triggerDistnace) {
        //Colorize collide
        if(this.colorizeCollision) {
            if(!element1.properties.highlighted) element1.highlightCSS();
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

}

simplePhysic.affectObjectCollision = function (element1, element2) {
    let centerVector1 = element1.getCenterVector();
    let centerVector2 = element2.getCenterVector();
    let normalVector1 = simplePhysic.vector.substract(centerVector2, centerVector1);
    let normalVector2 = simplePhysic.vector.substract(centerVector1, centerVector2);
    let unitVector1 = simplePhysic.vector.unit(normalVector1);
    let unitVector2 = simplePhysic.vector.unit(normalVector2);
    
    let v1 = simplePhysic.vector.subdivide(element1.physic.v, unitVector1); // [normal, parrarel]
    let v2 = simplePhysic.vector.subdivide(element2.physic.v, unitVector2); // [normal, parrarel]*/
    //console.log(v1[0].x + " " + v1[1].x  + " " + v2[0].x + " " + v2[1].x);

    element1.physic.v = this.vector.sum(this.vector.contrary(v1[0]), v1[1]);
    element2.physic.v = this.vector.sum(this.vector.contrary(v2[0]), v2[1]);

    console.log("colide");
}