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

simplePhysic.removeObjectCollision = function(element1, element2) {
    let normalVector1 = this.vector.substract(element2.getCenterVector(), element1.getCenterVector());
    let normalVector2 = this.vector.contrary(normalVector1);
    let normalUnit1 = this.vector.unit(normalVector1);
    let normalUnit2 = this.vector.unit(normalVector2);

    let excessDistnace = element1.properties.width/2 + element2.properties.width/2 - this.vector.magnitude(normalVector1);

    let moveByVector1 = this.vector.multiply(normalUnit2, excessDistnace/2);
    let moveByVector2 = this.vector.multiply(normalUnit1, excessDistnace/2);

    element1.setPosition(element1.properties.x + moveByVector1.x, element1.properties.y + moveByVector1.y);
    element2.setPosition(element2.properties.x + moveByVector2.x, element2.properties.y + moveByVector2.y);
}

simplePhysic.removeFrameCollision = function(element) {

}


simplePhysic.affectFrameCollision = function (element) {
    let centerVector = element.getCenterVector();
    
    let affect = function(normalUnit) {
        let v1 = simplePhysic.vector.subdivide(element.physic.v, normalUnit);
        let u = simplePhysic.linearMomentumPreservation(v1, 0, element.physic.mass, 0);
        element.physic.v = simplePhysic.vector.sum(
            simplePhysic.vector.multiply(u.u1[0], element.physic.absorbe) , 
            u.u1[1]);
    }

    if(centerVector.x - element.properties.width/2 < 0 
    || centerVector.x + element.properties.width/2 > this.scene.clientWidth)
        affect(new this.vector(1,0,0));

    if(centerVector.y - element.properties.height/2 < 0 
    || centerVector.y + element.properties.height/2 > this.scene.clientHeight)
        affect(new this.vector(0,1,0));      
}

simplePhysic.affectObjectCollision = function (element1, element2) {
    let normalVector1 = this.vector.substract(element2.getCenterVector(), element1.getCenterVector());
    let normalVector2 = this.vector.contrary(normalVector1);
    let normalUnit1 = this.vector.unit(normalVector1);
    let normalUnit2 = this.vector.unit(normalVector2);
    
    let v1 = this.vector.subdivide(element1.physic.v, normalUnit1); // [normal, parrarel]
    let v2 = this.vector.subdivide(element2.physic.v, normalUnit2); // [normal, parrarel]
    let u = this.linearMomentumPreservation(v1, v2, element1.physic.mass, element2.physic.mass);
 
    element1.physic.v = this.vector.sum(
        this.vector.multiply(u.u1[0], element1.physic.absorbe), 
        u.u1[1]);
    element2.physic.v = this.vector.sum(
        this.vector.multiply(u.u2[0], element2.physic.absorbe),
        u.u2[1]);
}