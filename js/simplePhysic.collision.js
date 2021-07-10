simplePhysic.detectCollision = function(element1, element2) {
    //Ball-Ball collision
    if(element1 instanceof simplePhysic.circle && element2 instanceof simplePhysic.circle) {
        if(simplePhysic.affectBallBallCollision(element1, element2)) {
            element1.highlightCSS(); element2.highlightCSS();
            simplePhysic.removeBallBallCollision(element1, element2);
        }
    }
    //Ball-Frame collision
    else if(element1 instanceof simplePhysic.circle && element2 == "frame") {
        if(simplePhysic.affectBallFrameCollision(element1)) {
            element1.highlightCSS();
            simplePhysic.removeBallFrameCollision(element1);
        }
    }

    //Rectangle-Rectangle collision
    else if(element1 instanceof simplePhysic.rectangle && element2 instanceof simplePhysic.rectangle) {
        if(simplePhysic.affectRectangleRectangleCollision(element1,element2).boolean) {
            element1.highlightCSS(); element2.highlightCSS();
            simplePhysic.removeRectangleRectangleCollision(element1);
        }
    }   
    
    //Rectangle-Frame collision 
    else if(element1 instanceof simplePhysic.rectangle && element2 == "frame") {
        if(simplePhysic.affectRectangleFrameCollision(element1)) {
            element1.highlightCSS();
            simplePhysic.removeRectangleFrameCollision(element1);            
        }
    }
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

//----------------------------------------------------------------
//RECTANGLE-FRAME COLLISION
//----------------------------------------------------------------
simplePhysic.affectRectangleFrameCollision = function(element) {
    let affected = false;
    let affect = function (point, normalUnit) {
        v1 = simplePhysic.vector.subdivide(element.physic.v, normalUnit);
        u = simplePhysic.linearMomentumPreservation(v1, 0, element.physic.mass, 0);
        element.physic.v = simplePhysic.vector.sum(
            simplePhysic.vector.multiply(u.u1[0], element.physic.absorbe), 
            u.u1[1]);
        affected = true;
    }

    let pointsVector = element.getPointVector();
    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].x < 0 
        || pointsVector[i].x > this.scene.clientWidth) {
            affect(pointsVector[i], new this.vector(1,0,0));
            break;
        }
    }

    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].y < 0 
        || pointsVector[i].y > this.scene.clientHeight) {
            affect(pointsVector[i], new this.vector(0,1,0))
            break;
        }
    }
    return affected;
}

simplePhysic.removeRectangleFrameCollision = function(element) {
    let pointsVector = element.getPointVector();

    let remove = function(normalUnit, magnitude) {
        let moveByVector = simplePhysic.vector.multiply(normalUnit, magnitude);
        element.setPosition(element.info.x + moveByVector.x, element.info.y + moveByVector.y, element.info.c);
        console.log(moveByVector);
    }

    for(let i = 0; i < 4; i++) {
        if(pointsVector[i].x < 0) {
            remove(new this.vector(-1,0,0), pointsVector[i].x); 
            break;
        }
        else if(pointsVector[i].x > this.scene.clientWidth){ 
            remove(new this.vector(-1,0,0), pointsVector[i].x - this.scene.clientWidth); 
            break
        }
    }

    for(let i = 0; i < 4; i++) { 
        if(pointsVector[i].y < 0) {
            remove(new this.vector(0,-1,0), pointsVector[i].y); 
            break;
        }
        else if(pointsVector[i].y > this.scene.clientHeight) {
            remove(new this.vector(0,-1,0), pointsVector[i].y - this.scene.clientHeight); 
            //console.log(i + " broke");
            break;
        }
    }
}
//----------------------------------------------------------------
//RECTANGLE-RECTANGLE COLLISION
//----------------------------------------------------------------
simplePhysic.affectRectangleRectangleCollision = function (element1, element2) {
    //Returns area of rectangle
    let rectArea = function (vector1, vector2, vector3) {
        let width = simplePhysic.vector.magnitude(
            simplePhysic.vector.substract(vector1, vector2));
        let height = simplePhysic.vector.magnitude(
            simplePhysic.vector.substract(vector2, vector3));
        return width*height;
    }
    //Returns area of triangle
    let triArea = function (vector1, vector2, vector3) {
        let ax = vector1.x; let ay = vector1.y;
        let bx = vector2.x; let by = vector2.y;
        let cx = vector3.x; let cy = vector3.y;
        return Math.abs((ax*(by-cy) + bx*(cy-ay) + cx*(ay-by)) / 2);
    }
    /*
    let affect = function (point, element) {
        let eVectors = element.getPointsVector();
        let 
        for(let i = 0; i < 4; i++) {
            let length = simplePhysic.vector.magnitude(
                simplePhysic.vector.substract(point, eVectors[i]));
            if()
        }
    }
    */
    let pointsVector1 = element1.getPointVector();
    let pointsVector2 = element2.getPointVector();   
    let area1 = rectArea(e1Vectors[0], e1Vectors[1], e1Vectors[2]);
    let area2 = rectArea(e2Vectors[0], e2Vectors[1], e2Vectors[2]);

    //Element 1 collides with Element 2
    for(let i = 0; i < 4; i++) {
        let sum = 0;
        for(let j = 0; j < 4; j++) 
            sum += triArea(pointsVector1[i], pointsVector2[j], pointsVector2[(j+1)%4]);
        if(sum < area2 + 1) {
            //affect(e1Vectors[i], element1);
            return {boolean : true, vector : pointsVector1[i], element : element2};
        }  
    }

    //Element 2 collides with Element 1
    for(let i = 0; i < 4; i++) {
        let sum = 0;
        for(let j = 0; j < 4; j++) 
            sum += triArea(pointsVector2[i], pointsVector1[j], pointsVector1[(j+1)%4]);
        if(sum < area1 + 1) {
            //affect(e2Vectors[i], element2);
            return {boolean : true, vector : pointsVector2[i], element : element1};
        }
    }

    return {boolean : false, vector : undefined, element : undefined};
}

simplePhysic.removeRectangleRectangleCollision = function(element1, element2) {

}