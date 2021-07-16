simplePhysic.detectCollision = function(element1, element2) {
    //Ball-Ball collision
    if(element1 instanceof this.circle && element2 instanceof this.circle) {
        let collide = this.detectBallBallCollision(element1, element2);
        if(collide) {
            this.affectBallBallCollision(element1, element2, collide);
            this.removeBallBallCollision(element1, element2, collide);
        }
    }
    //Ball-Frame collision
    else if(element1 instanceof this.circle && element2 == "frame") {
        let collide = this.detectBallFrameCollision(element1);
        if(collide.length > 0) {
            this.affectBallFrameCollision(element1, collide);
            this.removeBallFrameCollision(element1, collide);
        }
    }

    //Rectangle-Rectangle collision
    else if(element1 instanceof this.rectangle && element2 instanceof this.rectangle) {
        let collide = this.detectRectangleRectangleCollision(element1,element2);
        if(collide) {
            this.affectRectangleRectangleCollision(collide);
            this.removeRectangleRectangleCollision(collide);
        }
    }   
    
    //Rectangle-Frame collision 
    else if(element1 instanceof this.rectangle && element2 == "frame") {
        let collide = this.detectRectangleFrameCollision(element1);
        if(collide.length > 0) {
            this.affectRectangleFrameCollision(element1, collide)
            this.removeRectangleFrameCollision(element1, collide);            
        }
    }
}

//----------------------------------------------------------------
//BALL-FRAME
//----------------------------------------------------------------
//---------------------------Detect-------------------------------------
simplePhysic.detectBallFrameCollision = function(element) {
    let collide = [];
    let centerVector = element.getCenterVector();

    if(centerVector.x - element.info.width/2 < 0)
        collide.push({
            normalUnit : new this.vector(1,0,0), 
            magnitude : Math.abs(centerVector.x - element.info.width/2)})    
    if(centerVector.x + element.info.width/2 > this.scene.clientWidth)
        collide.push({
            normalUnit : new this.vector(-1,0,0), 
            magnitude : centerVector.x + element.info.width/2 - this.scene.clientWidth})    
    if(centerVector.y - element.info.height/2 < 0)
        collide.push({
            normalUnit : new this.vector(0,1,0), 
            magnitude : Math.abs(centerVector.y - element.info.height/2)})      
    if(centerVector.y + element.info.height/2 > this.scene.clientHeight)
        collide.push({
            normalUnit : new this.vector(0,-1,0), 
            magnitude : centerVector.y + element.info.height/2 - this.scene.clientHeight})      
    return collide;
}
//---------------------------Affect-------------------------------------
simplePhysic.affectBallFrameCollision = function (element, collide) {
    for(let pick of collide) {
        let v1 = this.vector.subdivide(element.physic.v, pick.normalUnit);
        let u = this.linearMomentumPreservation(v1, 0, element.physic.mass, 0);
        element.physic.v = this.vector.sum(
            this.vector.multiply(u.u1[0], element.physic.absorbe) , 
            u.u1[1]);
    }
}
//---------------------------Remove-------------------------------------
simplePhysic.removeBallFrameCollision = function(element, collide) {
    for(let pick of collide) {
        let moveByVector = this.vector.multiply(pick.normalUnit, pick.magnitude);
    element.setPosition(element.info.x + moveByVector.x, element.info.y + moveByVector.y, element.info.c);
    }
}

//----------------------------------------------------------------
//BALL-BALL COLLISION
//----------------------------------------------------------------
//---------------------------Detect-------------------------------------
simplePhysic.detectBallBallCollision = function (element1, element2) {
    let centerVector1 = element1.getCenterVector();
    let centerVector2 = element2.getCenterVector();
    let triggerDistnace = element1.info.width/2 + element2.info.width/2;
    let distance = this.vector.distance(centerVector1, centerVector2);
    
    if(distance <= triggerDistnace) {
        return {
            distance : distance,
            normalUnit1 : this.vector.unit(this.vector.substract(centerVector1, centerVector2)),
            normalUnit2 : this.vector.unit(this.vector.substract(centerVector2, centerVector1))}
    }
}
//---------------------------Affect-------------------------------------
simplePhysic.affectBallBallCollision = function (element1, element2, collide) {   
    let v1 = this.vector.subdivide(element1.physic.v, collide.normalUnit1);
    let v2 = this.vector.subdivide(element2.physic.v, collide.normalUnit2);
    let u = this.linearMomentumPreservation(v1, v2, element1.physic.mass, element2.physic.mass);
     
    element1.physic.v = this.vector.sum(
        this.vector.multiply(u.u1[0], element1.physic.absorbe), 
        u.u1[1]);
    element2.physic.v = this.vector.sum(
        this.vector.multiply(u.u2[0], element2.physic.absorbe),
        u.u2[1]);
}
//---------------------------Remove-------------------------------------
simplePhysic.removeBallBallCollision = function(element1, element2, collide) {
    let excessDistnace = element1.info.width/2 + element2.info.width/2 - collide.distance;

    let moveByVector1 = this.vector.multiply(collide.normalUnit1, excessDistnace/2);
    let moveByVector2 = this.vector.multiply(collide.normalUnit2, excessDistnace/2);

    element1.setPosition(element1.info.x + moveByVector1.x, element1.info.y + moveByVector1.y, element1.info.c);
    element2.setPosition(element2.info.x + moveByVector2.x, element2.info.y + moveByVector2.y, element2.info.c);
}

//----------------------------------------------------------------
//RECTANGLE-FRAME COLLISION
//----------------------------------------------------------------
//---------------------------Detect-------------------------------------
simplePhysic.detectRectangleFrameCollision = function(element) {
    let collide = [];
    let pointsVector = element.getPointVector();
    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].x < 0) {
            collide.push({
                collideVector : pointsVector[i], 
                normalUnit : new this.vector(1,0,0),
                magnitude : Math.abs(pointsVector[i].x)});
            break;
        }
        else if(pointsVector[i].x > this.scene.clientWidth) {
            collide.push({
                collideVector : pointsVector[i], 
                normalUnit : new this.vector(-1,0,0),
                magnitude : Math.abs(pointsVector[i].x - this.scene.clientWidth)})
            break;           
        }
    }
    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].y < 0) {
            collide.push({
                collideVector : pointsVector[i],
                normalUnit : new this.vector(0,1,0),
                magnitude : Math.abs(pointsVector[i].y)})
            break;
        }
        else if(pointsVector[i].y > this.scene.clientHeight) {
            collide.push({
                collideVector : pointsVector[i],
                normalUnit : new this.vector(0,-1,0),
                magnitude : Math.abs(pointsVector[i].y - this.scene.clientHeight)})
            break;
        }
    }
    return collide;
}
//---------------------------Affect-------------------------------------
simplePhysic.affectRectangleFrameCollision = function(element, collide) {
    for(let pick of collide) {
        let v1 = this.vector.subdivide(element.physic.v, pick.normalUnit);
        let u = this.linearMomentumPreservation(v1, 0, element.physic.mass, 0);
        element.physic.v = this.vector.sum(
            this.vector.multiply(u.u1[0], element.physic.absorbe), 
            u.u1[1]);
            
        let r = this.vector.multiply(
            this.vector.substract(pick.collideVector, element.getCenterVector()),
            1/element.physic.mass);
        element.physic.w = this.vector.cross(r, u.u1[0]);
        
        //element.physic.vConstrain = this.constrainRotation(element, pick.collideVector);
        /*
        //Gravity Angular Momentum 
        let d = this.gravityAngularMomentumEffect(element, pick.collideVector);
        element.physic.wConstrain = this.vector.sum(element.physic.wConstrain, d.dw);
        element.physic.vConstrain = 
            this.vector.cross(
                this.vector.substract(pick.collideVector, element.getCenterVector()), 
                element.physic.wConstrain
                );
        */
    }
}
//---------------------------Remove-------------------------------------
simplePhysic.removeRectangleFrameCollision = function(element, collide) {
    for(let pick of collide){
        let moveByVector = simplePhysic.vector.multiply(pick.normalUnit, pick.magnitude);
        element.setPosition(element.info.x + moveByVector.x, element.info.y + moveByVector.y, element.info.c);
    }
}
//----------------------------------------------------------------
//RECTANGLE-RECTANGLE COLLISION
//----------------------------------------------------------------
//---------------------------Detect-------------------------------------
simplePhysic.detectRectangleRectangleCollision = function (element1, element2) {
    let collide;
    let map = [];
    let pointsVector1 = element1.getPointVector(); let pointsVector2 = element2.getPointVector();

    for(let i = 0; i < 4; i++) {
        let line1 = new this.line(pointsVector1[i], pointsVector1[(i+1)%4]);
        for(let j = 0; j < 4; j++) {
            let line2 = new this.line(pointsVector2[j], pointsVector2[(j+1)%4]);
                
            if(this.line.intersect2D(line1, line2)){
                let collideVector = this.line.intersectPoint2D(line1, line2);
                let d; let n;

                d = this.line.distanceToPoint2D(line2, line1.p1)
                n = this.vector.unit(this.vector.rotate(line2.v, new simplePhysic.vector(0,0,0), 90)); 
                map.push({e : element1, eStatic : element2, n : n, d : d, p : collideVector});
                    
                d = this.line.distanceToPoint2D(line2, line1.p2)
                map.push({e : element1, eStatic : element2, n : n, d : d, p : collideVector});

                d = this.line.distanceToPoint2D(line1, line2.p1)
                n = this.vector.unit(this.vector.rotate(line1.v, new simplePhysic.vector(0,0,0), 90)); 
                map.push({e : element2, eStatic : element1, n : n, d : d, p : collideVector});     

                d = this.line.distanceToPoint2D(line1, line2.p2)
                map.push({e : element2, eStatic : element1, n : n, d : d,  p : collideVector}); 
            }
        }
    }

    map.sort((a, b) => {
        if(this.vector.magnitude(a.d) < this.vector.magnitude(b.d)) return -1;
        else if(this.vector.magnitude(a.d) > this.vector.magnitude(b.d)) return 1;
        else return 0;
    });

    let mapPick;
    for(let pick of map) {
        let pointsVector1 = pick.e.getPointVector(); let pointsVector2 = pick.eStatic.getPointVector();
        for(let i = 0; i < 4; i++) {
            let intersected = false;
            pick.dCorrected = this.vector.multiply(this.vector.assimilate(pick.d, pick.n), 1.05)
            let line1 = this.line.moveBy(new this.line(pointsVector1[i], pointsVector1[(i+1)%4]), pick.dCorrected);

            for(let j = 0; j < 4; j++) {
                let line2 = new this.line(pointsVector2[j], pointsVector2[(j+1)%4]);
                if(this.line.intersect2D(line2, line1)) {intersected = true; break;}
            }

            if(intersected) break;
            if(!intersected && i == 3) mapPick = pick;
        }
        if(mapPick) break;
    }    

    if(mapPick) {
        collide = {
            normalUnit : mapPick.n, 
            //distanceVector : mapPick.d, 
            distanceVectorCorrected : mapPick.dCorrected,
            collideVector : mapPick.p,
            element1 : mapPick.e, 
            element2 : mapPick.eStatic};
    }
    return collide;
}
//---------------------------Affect-------------------------------------
simplePhysic.affectRectangleRectangleCollision = function (collide) {
    let element1 = collide.element1;
    let element2 = collide.element2;
    let v1 = simplePhysic.vector.subdivide(element1.physic.v, collide.normalUnit);
    let v2 = simplePhysic.vector.subdivide(element2.physic.v, this.vector.contrary(collide.normalUnit));
    let u = simplePhysic.linearMomentumPreservation(v1, v2, element1.physic.mass, element2.physic.mass);

    element1.physic.v = simplePhysic.vector.sum(
        simplePhysic.vector.multiply(u.u1[0], element1.physic.absorbe), 
        u.u1[1]);
    element2.physic.v = simplePhysic.vector.sum(
        simplePhysic.vector.multiply(u.u2[0], element2.physic.absorbe),
        u.u2[1]);
 
    
    let r1 = this.vector.multiply(
        this.vector.substract(collide.collideVector, element1.getCenterVector()),
        1/element1.physic.mass);
    element1.physic.w = simplePhysic.vector.cross(r1, u.u1[0]);
    //element1.physic.vConstrain = this.constrainRotation(element1, collide.collideVector);
    
    let r2 = this.vector.multiply(
        this.vector.substract(this.vector.contrary(collide.collideVector), element2.getCenterVector()),
        1/element2.physic.mass);
    element2.physic.w = simplePhysic.vector.cross(r2, u.u2[0]);
    //element2.physic.vConstrain = this.constrainRotation(element2, collide.collideVector);*/
}
//---------------------------Remove-------------------------------------
simplePhysic.removeRectangleRectangleCollision = function(collide) {
    let element1 = collide.element1;
    let element2 = collide.element2;

    let moveByVector1 = this.vector.multiply(collide.distanceVectorCorrected, 0.5);
    let moveByVector2 = this.vector.contrary(moveByVector1);

    element1.setPosition(element1.info.x + moveByVector1.x, element1.info.y + moveByVector1.y, element1.info.c);
    element2.setPosition(element2.info.x + moveByVector2.x, element2.info.y + moveByVector2.y, element2.info.c);
}