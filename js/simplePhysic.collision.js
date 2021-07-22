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

    //Rectangle-Ball collision 
    else if(element1 instanceof this.rectangle && element2 instanceof this.circle) {
        let collide = this.detectRectangleBallCollision(element2, element1);
        if(collide) {
            this.affectRectangleBallCollision(collide);
            this.removeRectangleBallCollision(collide);
        }
    }

    //Ball-Rectable collision 
    else if(element1 instanceof this.circle && element2 instanceof this.rectangle) {
        let collide = this.detectRectangleBallCollision(element1, element2);
        if(collide) {
            this.affectRectangleBallCollision(collide);
            this.removeRectangleBallCollision(collide);
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
    let n; let m;

    //Shortcut for pushing collide
    let collidePush = function(n, m) {
        d = simplePhysic.vector.multiply(n, m);
        c = simplePhysic.vector.sum(
                simplePhysic.vector.multiply(
                    simplePhysic.vector.contrary(n), element.info.width), centerVector);
        collide.push({normalUnit : n, distanceVector : d, collideVector : c});
    }
    //Left collision
    if(centerVector.x - element.info.width/2 < 0) {
        n = new this.vector(1,0,0);
        m = Math.abs(centerVector.x - element.info.width/2);
        collidePush(n, m);
    }    
    //Right collision
    if(centerVector.x + element.info.width/2 > this.scene.clientWidth) {
        n = new this.vector(-1,0,0);
        m = centerVector.x + element.info.width/2 - this.scene.clientWidth;
        collidePush(n, m);
    }  
    //Top collision
    if(centerVector.y - element.info.height/2 < 0) {
        n = new this.vector(0,1,0);
        m = Math.abs(centerVector.y - element.info.height/2);
        collidePush(n, m);
    }     
    //Bottom collision
    if(centerVector.y + element.info.height/2 > this.scene.clientHeight) {
        n = new this.vector(0,-1,0);
        m = centerVector.y + element.info.height/2 - this.scene.clientHeight;
        collidePush(n, m);
    }

    return collide;
}
//---------------------------Affect-------------------------------------
simplePhysic.affectBallFrameCollision = function (element, collide) {
    for(let pick of collide) {
       let j = this.collisionImpulse(element, "frame", pick.collideVector, pick.normalUnit);
       element.physic.v = this.linearImpulseAffect(j, element, pick.normalUnit);
       //element.physic.w = this.angularImpulseAffect(j, element, pick.normalUnit, pick.collideVector);
    }
}
//---------------------------Remove-------------------------------------
simplePhysic.removeBallFrameCollision = function(element, collide) {
    for(let pick of collide) {
        let moveByVector = pick.distanceVector;
        element.setPosition(element.info.x + moveByVector.x, element.info.y + moveByVector.y, element.info.c);
    }
}

//----------------------------------------------------------------
//BALL-BALL COLLISION
//----------------------------------------------------------------
//---------------------------Detect-------------------------------------
simplePhysic.detectBallBallCollision = function (element1, element2) {
    let cV1 = element1.getCenterVector();
    let cV2 = element2.getCenterVector();
    let triggerDistance = element1.info.width/2 + element2.info.width/2;
    let distance = this.vector.distance(cV1, cV2);

    if(distance <= triggerDistance) {
        return {
            distanceCenters : distance,
            normalUnit1 : this.vector.unit(this.vector.substract(cV1, cV2)),
            normalUnit2 : this.vector.unit(this.vector.substract(cV2, cV1)),
            collideVector : new this.vector((cV1.x + cV2.x)/2, (cV1.y + cV2.y)/2, 0)}
    }
}
//---------------------------Affect-------------------------------------
simplePhysic.affectBallBallCollision = function (element1, element2, collide) {
    let j = this.collisionImpulse(element1, element2, collide.collideVector, collide.normalUnit1);
    element1.physic.v = this.linearImpulseAffect(j, element1, collide.normalUnit1);
    //element1.physic.w = this.angularImpulseAffect(j, element1, collide.normalUnit, collide.collideVector);
    element2.physic.v = this.linearImpulseAffect(j, element2, collide.normalUnit2);
    //element2.physic.w = this.angularImpulseAffect(j, element2, normalUnitContrary, collide.collideVector);
}
//---------------------------Remove-------------------------------------
simplePhysic.removeBallBallCollision = function(element1, element2, collide) {
    let excessDistnace = element1.info.width/2 + element2.info.width/2 - collide.distanceCenters;

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
        //Left collision
        if(pointsVector[i].x < 0) {
            collide.push({
                collideVector : pointsVector[i], 
                normalUnit : new this.vector(1,0,0),
                magnitude : Math.abs(pointsVector[i].x)});
            //break;
        }
        //Right collision
        else if(pointsVector[i].x > this.scene.clientWidth) {
            collide.push({
                collideVector : pointsVector[i], 
                normalUnit : new this.vector(-1,0,0),
                magnitude : Math.abs(pointsVector[i].x - this.scene.clientWidth)})
            //break;           
        }
    }
    for(let i = 0; i < 4; i++) {
        //Top collision
        if(pointsVector[i].y < 0) {
            collide.push({
                collideVector : pointsVector[i],
                normalUnit : new this.vector(0,1,0),
                magnitude : Math.abs(pointsVector[i].y)})
            //break;
        }
        //Bottom collision
        else if(pointsVector[i].y > this.scene.clientHeight) {
            collide.push({
                collideVector : pointsVector[i],
                normalUnit : new this.vector(0,-1,0),
                magnitude : Math.abs(pointsVector[i].y - this.scene.clientHeight)})
            //break;
        }
    }
    return collide;
}
//---------------------------Affect-------------------------------------
simplePhysic.affectRectangleFrameCollision = function(element, collide) {
    for(let pick of collide) {
        let j = this.collisionImpulse(element, "frame", pick.collideVector, pick.normalUnit);
        element.physic.v = this.linearImpulseAffect(j, element, pick.normalUnit);
        element.physic.w = this.angularImpulseAffect(j, element, pick.normalUnit, pick.collideVector);
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

    //Searching for intersacting lines of rectangle and push it do map
    for(let i = 0; i < 4; i++) {
        let line1 = new this.line(pointsVector1[i], pointsVector1[(i+1)%4]);
        for(let j = 0; j < 4; j++) {
            let line2 = new this.line(pointsVector2[j], pointsVector2[(j+1)%4]);
                
            if(this.line.intersect2D(line1, line2)){
                let collideVector = this.line.intersectPoint2D(line1, line2);
                let d; //Distance vector 
                let n; //Normal unit

                d = this.line.distanceToPoint2D(line2, line1.p1); 
                n = this.vector.unit(this.vector.rotate(line2.v, new this.vector(0,0,0), 90)); 
                map.push({e : element1, eStatic : element2, n : n, d : d, c : collideVector});
                    
                d = this.line.distanceToPoint2D(line2, line1.p2)
                map.push({e : element1, eStatic : element2, n : n, d : d, c : collideVector});

                d = this.line.distanceToPoint2D(line1, line2.p1)
                n = this.vector.unit(this.vector.rotate(line1.v, new this.vector(0,0,0), 90)); 
                map.push({e : element2, eStatic : element1, n : n, d : d, c : collideVector});     

                d = this.line.distanceToPoint2D(line1, line2.p2)
                map.push({e : element2, eStatic : element1, n : n, d : d,  c : collideVector}); 
            }
        }
    }

    //Sorting map by distance between line's point and collide vector
    map.sort((a, b) => {
        if(this.vector.magnitude(a.d) < this.vector.magnitude(b.d)) return -1;
        else if(this.vector.magnitude(a.d) > this.vector.magnitude(b.d)) return 1;
        else return 0;
    });

    //Picks lines and translate them by point-to-line distance and if it does not
    //intersect any more picks it
    let mapPick;
    for(let pick of map) {
        let pointsVector1 = pick.e.getPointVector(); let pointsVector2 = pick.eStatic.getPointVector();
        for(let i = 0; i < 4; i++) {
            let intersected = false;
            //Moves line 
            pick.dCorrected = this.vector.multiply(this.vector.assimilate(pick.d, pick.n), 1.01)
            let line1 = this.line.moveBy(new this.line(pointsVector1[i], pointsVector1[(i+1)%4]), pick.dCorrected);
            //Checks if intersect
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
            distanceVectorCorrected : mapPick.dCorrected,
            collideVector : mapPick.c,
            element1 : mapPick.e, // normalUnit towards this element
            element2 : mapPick.eStatic // normalUnit outwards this element
        };
    }
    return collide;
}
//---------------------------Affect-------------------------------------
simplePhysic.affectRectangleRectangleCollision = function (collide) {
    let element1 = collide.element1;
    let element2 = collide.element2;

    let j = this.collisionImpulse(element1, element2, collide.collideVector, collide.normalUnit);
    element1.physic.v = this.linearImpulseAffect(j, element1, collide.normalUnit);
    element1.physic.w = this.angularImpulseAffect(j, element1, collide.normalUnit, collide.collideVector);
    let normalUnitContrary = this.vector.contrary(collide.normalUnit);
    element2.physic.v = this.linearImpulseAffect(j, element2, normalUnitContrary);
    element2.physic.w = this.angularImpulseAffect(j, element2, normalUnitContrary, collide.collideVector);
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
//----------------------------------------------------------------
//RECTANGLE-BALL COLLISION
//----------------------------------------------------------------
//---------------------------Detect-------------------------------------
simplePhysic.detectRectangleBallCollision = function(element1, element2) {
    let pointsVector = element2.getPointVector();
    let centerVector = element1.getCenterVector();
    let r = element1.info.width/2;
    let d; //Distance vector
    let n; //Normal unit

    let closest = 0;
    //Find closest point to center
    for(let i = 1; i < 4; i++) {
        if(this.vector.distance(centerVector, pointsVector[closest]) > this.vector.distance(centerVector, pointsVector[i]))
            closest = i;
    }

    //Side collision check 1st closest line
    let line1 = new this.line(pointsVector[closest], pointsVector[(closest+1)%4])
    n = this.vector.unit(this.vector.rotate(line1.v, new this.vector(0,0,0), 90));
    d = this.line.distanceToPoint2D(line1, centerVector);
    if(this.vector.magnitude(d) <= r) {
        let collideVector = this.vector.sum(centerVector, this.vector.contrary(d));
        let lineCross = new this.line(collideVector, centerVector);
        if(this.line.intersect2D(line1, lineCross)) {
            let dCorrected = this.vector.sum(
                this.vector.contrary(d),
                this.vector.multiply(n, r * 1.01));

            return({
                normalUnit : n,
                collideVector : collideVector,
                distanceVectorCorrected : dCorrected,
                element1 : element1, // normalUnit towards this element
                element2 : element2 // normalUnit outwards this element
            });
        }
    }

    //Side collision check 2nst closest line
    let cor = 0;
    if(closest == 0) cor = 4;
    let line2 = new this.line(pointsVector[(closest-1)+cor], pointsVector[closest])
    n = this.vector.unit(this.vector.rotate(line2.v, new this.vector(0,0,0), 90));
    d = this.line.distanceToPoint2D(line2, centerVector);
    if(this.vector.magnitude(d) <= r) {
        let collideVector = this.vector.sum(centerVector, this.vector.contrary(d));
        let lineCross = new this.line(collideVector, centerVector);
        if(this.line.intersect2D(line2, lineCross)) {
            let dCorrected = this.vector.sum(
                this.vector.contrary(d),
                this.vector.multiply(n, r * 1.01));

            return({
                normalUnit : n,
                collideVector : collideVector,
                distanceVectorCorrected : dCorrected,
                element1 : element1, // normalUnit towards this element
                element2 : element2 // normalUnit outwards this element
            });
        }
    }

    //Corner collision
    d = this.vector.substract(centerVector, pointsVector[closest]);
    if(this.vector.magnitude(d) <= r){
        n = this.vector.unit(d);
        let dCorrected = this.vector.sum(
            this.vector.contrary(d),
            this.vector.multiply(n, r * 1.01));
        return({
            normalUnit : n,
            collideVector : pointsVector[closest],
            distanceVectorCorrected : dCorrected,
            element1 : element1, // normalUnit towards this element
            element2 : element2 // normalUnit outwards this element
        });
    }
}
//---------------------------Affect-------------------------------------
simplePhysic.affectRectangleBallCollision = function(collide) {
    let element1 = collide.element1;
    let element2 = collide.element2;

    let j = this.collisionImpulse(element1, element2, collide.collideVector, collide.normalUnit);
    element1.physic.v = this.linearImpulseAffect(j, element1, collide.normalUnit);
    element1.physic.w = this.angularImpulseAffect(j, element1, collide.normalUnit, collide.collideVector);
    let normalUnitContrary = this.vector.contrary(collide.normalUnit);
    element2.physic.v = this.linearImpulseAffect(j, element2, normalUnitContrary);
    element2.physic.w = this.angularImpulseAffect(j, element2, normalUnitContrary, collide.collideVector);
}
//---------------------------Remove-------------------------------------
simplePhysic.removeRectangleBallCollision = function(collide) {
    let element1 = collide.element1;
    let element2 = collide.element2;

    let moveByVector1 = this.vector.multiply(collide.distanceVectorCorrected, 0.5);
    let moveByVector2 = this.vector.contrary(moveByVector1);

    element1.setPosition(element1.info.x + moveByVector1.x, element1.info.y + moveByVector1.y, element1.info.c);
    element2.setPosition(element2.info.x + moveByVector2.x, element2.info.y + moveByVector2.y, element2.info.c);
}