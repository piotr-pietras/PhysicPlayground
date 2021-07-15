simplePhysic.detectCollision = function(element1, element2) {
    //Ball-Ball collision
    if(element1 instanceof simplePhysic.circle && element2 instanceof simplePhysic.circle) {
        if(simplePhysic.affectBallBallCollision(element1, element2)) {
            //element1.highlightCSS(); element2.highlightCSS();
            simplePhysic.removeBallBallCollision(element1, element2);
        }
    }
    //Ball-Frame collision
    else if(element1 instanceof simplePhysic.circle && element2 == "frame") {
        if(simplePhysic.affectBallFrameCollision(element1)) {
            //element1.highlightCSS();
            simplePhysic.removeBallFrameCollision(element1);
        }
    }

    //Rectangle-Rectangle collision
    else if(element1 instanceof simplePhysic.rectangle && element2 instanceof simplePhysic.rectangle) {
        let collide = simplePhysic.affectRectangleRectangleCollision(element1,element2);
        if(collide.boolean) {
            //element1.highlightCSS(); element2.highlightCSS();
            //simplePhysic.removeRectangleRectangleCollision(element1, element2, collide.distanceVector);
        }
    }   
    
    //Rectangle-Frame collision 
    else if(element1 instanceof simplePhysic.rectangle && element2 == "frame") {
        if(simplePhysic.affectRectangleFrameCollision(element1)) {
            //element1.highlightCSS();
            simplePhysic.removeRectangleFrameCollision(element1);            
        }
    }
}

//----------------------------------------------------------------
//BALL-FRAME
//----------------------------------------------------------------
simplePhysic.affectBallFrameCollision = function (element) {
    let affected = false;
    let centerVector = element.getCenterVector();

    let affect = function(normalUnit) {
        let v1 = simplePhysic.vector.subdivide(element.physic.v, normalUnit);
        let u = simplePhysic.linearMomentumPreservation(v1, 0, element.physic.mass, 0);
        element.physic.v = simplePhysic.vector.sum(
            simplePhysic.vector.multiply(u.u1[0], element.physic.absorbe) , 
            u.u1[1]);
        affected = true;
    }

    if(centerVector.x - element.info.width/2 < 0 
    || centerVector.x + element.info.width/2 > this.scene.clientWidth)
        affect(new this.vector(1,0,0));

    if(centerVector.y - element.info.height/2 < 0 
    || centerVector.y + element.info.height/2 > this.scene.clientHeight)
        affect(new this.vector(0,1,0));    
        
    if(affected) return true;
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
        let normalUnit1 = this.vector.unit(this.vector.substract(centerVector1, centerVector2));
        let normalUnit2 = this.vector.contrary(normalUnit1);
        
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
    let  normalVector = this.vector.substract(element2.getCenterVector(), element1.getCenterVector());
    let normalUnit = this.vector.unit(normalVector);

    let excessDistnace = element1.info.width/2 + element2.info.width/2 - this.vector.magnitude(normalVector);

    let moveByVector1 = this.vector.multiply(this.vector.contrary(normalUnit), excessDistnace/2);
    let moveByVector2 = this.vector.multiply(normalUnit, excessDistnace/2);

    element1.setPosition(element1.info.x + moveByVector1.x, element1.info.y + moveByVector1.y, element1.info.c);
    element2.setPosition(element2.info.x + moveByVector2.x, element2.info.y + moveByVector2.y, element2.info.c);
}

//----------------------------------------------------------------
//RECTANGLE-FRAME COLLISION
//----------------------------------------------------------------
simplePhysic.affectRectangleFrameCollision = function(element) {
    let affected = false;
    let affect = function (collideVector, normalUnit) {
        let v1 = simplePhysic.vector.subdivide(element.physic.v, normalUnit);
        let u = simplePhysic.linearMomentumPreservation(v1, 0, element.physic.mass, 0);
        element.physic.v = simplePhysic.vector.sum(
            simplePhysic.vector.multiply(u.u1[0], element.physic.absorbe), 
            u.u1[1]);
            
        let r = simplePhysic.vector.multiply(
            simplePhysic.vector.substract(collideVector, element.getCenterVector()),
            1/element.physic.mass);
        element.physic.w = simplePhysic.vector.cross(r, u.u1[0]);
        
        //Gravity Angular Momentum 
        /*
        d = simplePhysic.gravityAngularMomentumEffect(element, pointVector);
        element.physic.wConstrain = simplePhysic.vector.sum(element.physic.wConstrain, d.dw);
        element.physic.vConstrain = simplePhysic.vector.cross(
            simplePhysic.vector.substract(d.constrain, element.getCenterVector()), 
            simplePhysic.vector.multiply(element.physic.wConstrain,  1)
            );
        */
        affected = true;
    }

    let pointsVector = element.getPointVector();
    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].x < 0 || pointsVector[i].x > this.scene.clientWidth) {
            affect(pointsVector[i], new this.vector(1,0,0)); break;}
    }
    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].y < 0  || pointsVector[i].y > this.scene.clientHeight) {
            affect(pointsVector[i], new this.vector(0,1,0)); break;}
    }
    return affected;
}

simplePhysic.removeRectangleFrameCollision = function(element) {
    let pointsVector = element.getPointVector();

    let remove = function(normalUnit, magnitude) {
        let moveByVector = simplePhysic.vector.multiply(normalUnit, magnitude);
        element.setPosition(element.info.x + moveByVector.x, element.info.y + moveByVector.y, element.info.c);
    }

    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].x < 0) {
            remove(new this.vector(-1,0,0), pointsVector[i].x); break;}
        else if(pointsVector[i].x > this.scene.clientWidth){ 
            remove(new this.vector(-1,0,0), pointsVector[i].x - this.scene.clientWidth); break}
    }

    for(let i = 0; i < 4; i++) { 
        if(pointsVector[i].y < 0) {
            remove(new this.vector(0,-1,0), pointsVector[i].y); break;}
        else if(pointsVector[i].y > this.scene.clientHeight) {
            remove(new this.vector(0,-1,0), pointsVector[i].y - this.scene.clientHeight); break;}
    }
}
//----------------------------------------------------------------
//RECTANGLE-RECTANGLE COLLISION
//----------------------------------------------------------------
simplePhysic.affectRectangleRectangleCollision = function (element1, element2) {
    //Detects collision
    let detect = function(element1, element2) {
        let pointsVector1 = element1.getPointVector(); let pointsVector2 = element2.getPointVector();
        let map = [];

        for(let i = 0; i < 4; i++) {
            let line1 = new simplePhysic.line(pointsVector1[i], pointsVector1[(i+1)%4]);
            for(let j = 0; j < 4; j++) {
                let line2 = new simplePhysic.line(pointsVector2[j], pointsVector2[(j+1)%4]);
                
                if(simplePhysic.line.intersect2D(line1, line2)){
                    let collidePoint = simplePhysic.line.intersectPoint2D(line1, line2);
                    let d; let n;

                    d = simplePhysic.line.distanceToPoint2D(line2, line1.p1)
                    n = simplePhysic.vector.unit(simplePhysic.vector.rotate(line2.v, new simplePhysic.vector(0,0,0), 90)); 
                    map.push({l : line1, e : element1, eStatic : element2, n : n, d : d, p : collidePoint});
                    
                    d = simplePhysic.line.distanceToPoint2D(line2, line1.p2)
                    map.push({l : line1, e : element1, eStatic : element2, n : n, d : d, p : collidePoint});

                    d = simplePhysic.line.distanceToPoint2D(line1, line2.p1)
                    n = simplePhysic.vector.unit(simplePhysic.vector.rotate(line1.v, new simplePhysic.vector(0,0,0), 90)); 
                    map.push({l : line2, e : element2, eStatic : element1, n : n, d : d, p : collidePoint});     

                    d = simplePhysic.line.distanceToPoint2D(line1, line2.p2)
                    map.push({l : line2, e : element2, eStatic : element1, n : n, d : d,  p : collidePoint}); 
                }
            }
        }

        map.sort((a, b) => {
            if(simplePhysic.vector.magnitude(a.d) < simplePhysic.vector.magnitude(b.d)) return -1;
            else if(simplePhysic.vector.magnitude(a.d) > simplePhysic.vector.magnitude(b.d)) return 1;
            else return 0;
        })

        let mapPick;
        for(let pick of map) {
            let pointsVector1 =pick.e.getPointVector(); let pointsVector2 = pick.eStatic.getPointVector();
            for(let i = 0; i < 4; i++) {
                let intersected = false;
                let line1 = new simplePhysic.line(pointsVector1[i], pointsVector1[(i+1)%4]);
                let line1Moved = simplePhysic.line.moveBy(
                    line1, 
                    simplePhysic.vector.multiply(pick.n, simplePhysic.vector.magnitude(pick.d) + 5));
                for(let j = 0; j < 4; j++) {
                    let line2 = new simplePhysic.line(pointsVector2[j], pointsVector2[(j+1)%4]);
                    if(simplePhysic.line.intersect2D(line2, line1Moved)) {intersected = true; break;}
                }
                if(intersected) break;
                if(!intersected && i == 3) mapPick = pick;
            }
            if(mapPick) break;
        }
/*
        if(map[0]) {
            console.log(map[0].d)
            console.log(map[0].n)
            console.log(map[0].e)
            console.log(simplePhysic.vector.multiply(map[0].n, simplePhysic.vector.magnitude(map[0].d) + 1))
        }
*/

        if(mapPick) {
            console.log(mapPick.d)
            console.log(mapPick.n)
            console.log(mapPick.e)
        }

        if(mapPick) return {boolean : true, 
            normalUnit : mapPick.n, 
            distanceVector : mapPick.d, 
            element1 : mapPick.e, 
            element2 : mapPick.eStatic};
        else return {boolean : false};
        
    }
    //Affects collision
    let affect = function (element1, element2, normalUnit) {
        let v1 = simplePhysic.vector.subdivide(element1.physic.v, normalUnit); // [normal, parrarel]
        let v2 = simplePhysic.vector.subdivide(element2.physic.v, normalUnit); // [normal, parrarel]
        let u = simplePhysic.linearMomentumPreservation(v1, v2, element1.physic.mass, element2.physic.mass);

        element1.physic.v = simplePhysic.vector.sum(
            simplePhysic.vector.multiply(u.u1[0], element1.physic.absorbe), 
            u.u1[1]);
        element2.physic.v = simplePhysic.vector.sum(
            simplePhysic.vector.multiply(u.u2[0], element2.physic.absorbe),
            u.u2[1]);
    }
 
    //Element 1 collides with Element 2
    let collide = detect(element1, element2);
    if(collide.boolean) {
        affect(element1, element2, collide.normalUnit);
        return{boolean : true, 
            distanceVector : collide.distanceVector, 
            element1 : collide.element1, 
            element2 : collide.element2};
    }
    return {boolean : false};
}

simplePhysic.removeRectangleRectangleCollision = function(element1, element2, distanceVector) {

    let moveByVector1 = this.vector.multiply(distanceVector, 0.5);
    let moveByVector2 = this.vector.contrary(moveByVector1);
    console.log("move by" + moveByVector1);
    //if(this.vector.magnitude(moveByVector1) > 0 && this.vector.magnitude(moveByVector2)) {
        element1.setPosition(element1.info.x + moveByVector1.x, element1.info.y + moveByVector1.y, element1.info.c);
        element2.setPosition(element2.info.x + moveByVector2.x, element2.info.y + moveByVector2.y, element2.info.c);
    //}
}