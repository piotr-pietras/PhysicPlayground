simplePhysic.detectCollision = function(element1, element2) {
    //Ball-Ball collision
    if(element1 instanceof simplePhysic.circle && element2 instanceof simplePhysic.circle) {
        if(simplePhysic.affectBallBallCollision(element1, element2)) 
            simplePhysic.removeBallBallCollision(element1, element2);
    }
    //Ball-Frame collision
    else if(element1 instanceof simplePhysic.circle && element2 == "frame") {
        if(simplePhysic.affectBallFrameCollision(element1)) 
            simplePhysic.removeBallFrameCollision(element1);
    }
}

simplePhysic.detectObjectCollision = function (element1, element2) { 

}

//----------------------------------------------------------------
//BALL-FRAME
//----------------------------------------------------------------
simplePhysic.affectBallFrameCollision = function (element) {
    let v1, u;
    let centerVector = element.getCenterVector();

    let affect = function(normalUnit) {
        v1 = simplePhysic.vector.subdivide(element.physic.v, normalUnit);
        u = simplePhysic.linearMomentumPreservation(v1, 0, element.physic.mass, 0);
        element.physic.v = simplePhysic.vector.sum(
            simplePhysic.vector.multiply(u.u1[0], element.physic.absorbe) , 
            u.u1[1]);
    }

    if(centerVector.x - element.info.width/2 < 0 
    || centerVector.x + element.info.width/2 > this.scene.clientWidth)
        affect(new this.vector(1,0,0));

    if(centerVector.y - element.info.height/2 < 0 
    || centerVector.y + element.info.height/2 > this.scene.clientHeight)
        affect(new this.vector(0,1,0));    
        
    if(v1) return true;
    else return false;
}

simplePhysic.removeBallFrameCollision = function(element) {
    let centerVector = element.getCenterVector();

    let remove = function(normalUnit, magnitude) {
        let moveByVector = simplePhysic.vector.multiply(normalUnit, magnitude);
        element.setPosition(element.info.x + moveByVector.x, element.info.y + moveByVector.y, element.info.c);
    }

    if(centerVector.x - element.info.width/2 < 0)
        remove(new this.vector(-1,0,0), centerVector.x - element.info.width/2);        
    if(centerVector.x + element.info.width/2 > this.scene.clientWidth)
        remove(new this.vector(-1,0,0), centerVector.x + element.info.width/2 - this.scene.clientWidth);
    if(centerVector.y - element.info.height/2 < 0)
        remove(new this.vector(0,-1,0), centerVector.y - element.info.height/2);  
    if(centerVector.y + element.info.height/2 > this.scene.clientHeight)
        remove(new this.vector(0,-1,0), centerVector.y + element.info.height/2 - this.scene.clientHeight);      
}

//----------------------------------------------------------------
//BALL-BALL COLLISION
//----------------------------------------------------------------
simplePhysic.affectBallBallCollision = function (element1, element2) {
    let centerVector1 = element1.getCenterVector();
    let centerVector2 = element2.getCenterVector();
    let triggerDistnace = element1.info.width/2 + element2.info.width/2;
    let distance = this.vector.distance(centerVector1, centerVector2);
    
    if(distance <= triggerDistnace) {
        let normalVector1 = this.vector.substract(centerVector1, centerVector2);
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

        return true;
    }
    return false;
}

simplePhysic.removeBallBallCollision = function(element1, element2) {
    let normalVector = this.vector.substract(element2.getCenterVector(), element1.getCenterVector());
    let normalUnit = this.vector.unit(normalVector);

    let excessDistnace = element1.info.width/2 + element2.info.width/2 - this.vector.magnitude(normalVector);

    let moveByVector1 = this.vector.multiply(this.vector.contrary(normalUnit), excessDistnace/2);
    let moveByVector2 = this.vector.multiply(normalUnit, excessDistnace/2);

    element1.setPosition(element1.info.x + moveByVector1.x, element1.info.y + moveByVector1.y, element1.info.c);
    element2.setPosition(element2.info.x + moveByVector2.x, element2.info.y + moveByVector2.y, element2.info.c);
}