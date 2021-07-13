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
        if(simplePhysic.affectRectangleRectangleCollision(element1,element2).boolean) {
            //element1.highlightCSS(); element2.highlightCSS();
            //console.log("collide");
            simplePhysic.removeRectangleRectangleCollision(element1);
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
    let v1;
    let centerVector = element.getCenterVector();

    let affect = function(normalUnit) {
        let v1 = simplePhysic.vector.subdivide(element.physic.v, normalUnit);
        let u = simplePhysic.linearMomentumPreservation(v1, 0, element.physic.mass, 0);
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
        if(pointsVector[i].x < 0 
        || pointsVector[i].x > this.scene.clientWidth) {
            affect(pointsVector[i], new this.vector(1,0,0)); break;
        }
    }
    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].y < 0 
        || pointsVector[i].y > this.scene.clientHeight) {
            affect(pointsVector[i], new this.vector(0,1,0)); break;
        }
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
            remove(new this.vector(-1,0,0), pointsVector[i].x); break;
        }
        else if(pointsVector[i].x > this.scene.clientWidth){ 
            remove(new this.vector(-1,0,0), pointsVector[i].x - this.scene.clientWidth); break
        }
    }

    for(let i = 0; i < 4; i++) { 
        if(pointsVector[i].y < 0) {
            remove(new this.vector(0,-1,0), pointsVector[i].y); 
            break;
        }
        else if(pointsVector[i].y > this.scene.clientHeight) {
            remove(new this.vector(0,-1,0), pointsVector[i].y - this.scene.clientHeight); 
            break;
        }
    }
}
//----------------------------------------------------------------
//RECTANGLE-RECTANGLE COLLISION
//----------------------------------------------------------------
simplePhysic.affectRectangleRectangleCollision = function (element1, element2) {
    //Returns unit normal vector of collision
    let findNormal = function(collideVector, element) {
        closestPoints = element.getPointVector();
        closestPoints.sort((a, b) => {
            if(simplePhysic.vector.distance(a,collideVector)
             > simplePhysic.vector.distance(b,collideVector))
                return 1;
            else return -1;
        });
        
        let pointsVector = element.getPointVector();
        let line1 = new simplePhysic.line(closestPoints[0], closestPoints[1]);
        let line2 = new simplePhysic.line(closestPoints[0], closestPoints[2]);

        console.log(line1.v, line2.v);

        for(let i = 0; i < 4; i++) {
            let line0 = new simplePhysic.line(pointsVector[i], pointsVector[(i+1)%4]);
            if(simplePhysic.line.intersect(line0, line1)) return line1.v;
            if(simplePhysic.line.intersect(line0, line2)) return line2.v;
        }
    }

    let affect = function (collideVector, element) {
        
    }
    
    let pointsVector1 = element1.getPointVector(); pointsVector2 = element2.getPointVector();   
    let area1 = this.rectangleArea(pointsVector1[0], pointsVector1[1], pointsVector1[2]); 
    let area2 = this.rectangleArea(pointsVector2[0], pointsVector2[1], pointsVector2[2]);

    //Element 1 collides with Element 2
    for(let i = 0; i < 4; i++) {
        let sum = 0;
        for(let j = 0; j < 4; j++) 
            sum += this.triangleArea(pointsVector1[i], pointsVector2[j], pointsVector2[(j+1)%4]);
        if(sum < area2 + 1) {
            //normalUnit = findNormal(pointsVector1[i], element2);
            console.log(findNormal(pointsVector1[i], element2));
            //affect(pointsVector1[i], element2);
            return {boolean : true, vector : pointsVector1[i], element : element2};
        }  
    }

    //Element 2 collides with Element 1
    for(let i = 0; i < 4; i++) {
        let sum = 0;
        for(let j = 0; j < 4; j++) 
            sum += this.triangleArea(pointsVector2[i], pointsVector1[j], pointsVector1[(j+1)%4]);
        if(sum < area1 + 1) {
            //normalUnit = findNormal(pointsVector2[i], element1);
            //affect(pointsVector2[i], element1);
            return {boolean : true, vector : pointsVector2[i], element : element1};
        }
    }

    return {boolean : false, vector : undefined, element : undefined};
}

simplePhysic.removeRectangleRectangleCollision = function(element1, element2) {

}