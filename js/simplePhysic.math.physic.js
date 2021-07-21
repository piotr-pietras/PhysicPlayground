//----------------------------------------------------------------
//Collision impulse
//----------------------------------------------------------------
//Returns collision impulse
simplePhysic.collisionImpulse = function (element1, element2, collideVector, normalUnit) {
    //-------------------Calculate numerator---------------------------------------------
    let rv1 = this.relativeVelocity(element1, collideVector);
    let rv2 = new this.vector(0,0,0);
    let e = element1.physic.elastic;
    if(element2 != "frame") {
        rv2 = this.relativeVelocity(element2, collideVector);
        e = (e + element2.physic.elastic) / 2;
    }
    let rv = this.vector.substract(rv1, rv2);
    let rv_abs = this.vector.multiply(rv, -(1 + e));
    let numerator = this.vector.dot(rv_abs, normalUnit); // <-- numerator
    //-------------------Calculate denominator---------------------------------------------
    let r1 = this.vector.substract(collideVector, element1.getCenterVector());   
    let r1_norm = this.vector.cross(r1, normalUnit);
    let r1_pow = this.vector.dot(r1_norm, r1_norm); 
    let denominator = (1/ element1.physic.mass) + (r1_pow / element1.physic.inertia); // <-- denominator
    if(element2 != "frame") {
        let r2 = this.vector.substract(collideVector, element2.getCenterVector());   
        let r2_norm = this.vector.cross(r2, normalUnit);
        let r2_pow = this.vector.dot(r2_norm, r2_norm);       
        denominator += (1/ element2.physic.mass) + (r2_pow / element2.physic.inertia) // <-- denominator 
    }

    return numerator / denominator;
}

//Returns velocity vector being affected by collision impulse
simplePhysic.linearImpulseAffect = function(j, element, normalUnit) {
    let normJ = this.vector.multiply(normalUnit, j);
    let vJ = this.vector.multiply(normJ, (1/element.physic.mass));
    return this.vector.sum(element.physic.v, vJ)
}

//Returns angular velocity vector being affected by collision impulse
simplePhysic.angularImpulseAffect = function(j, element, normalUnit, collideVector) {
    let normJ = this.vector.multiply(normalUnit, j);
    let r = this.vector.substract(collideVector, element.getCenterVector());
    let normJ_r = this.vector.cross(r, normJ);
    let wJ = this.vector.multiply(normJ_r, (1/element.physic.inertia));
    return this.vector.sum(element.physic.w, wJ)
}

//----------------------------------------------------------------
//Relative velocity
//----------------------------------------------------------------
//Returns sum of linear velocity vector and angular velocity relatively to given point
simplePhysic.relativeVelocity = function(element, relativeVector){
    return this.vector.sum(element.physic.v, this.angularVelocityToLinear(element, relativeVector));
}

//Converts angular velocity to linea one relatively to given point
simplePhysic.angularVelocityToLinear = function(element, relativeVector) {
    let r = this.vector.substract(relativeVector, element.getCenterVector());
    return this.vector.cross(element.physic.w, r);
}

/*
simplePhysic.angularMomentumGenerating = function(element, v, collideVector) {
    let r = this.vector.substract(collideVector, element.getCenterVector());
    let p = this.vector.multiply(v, element.physic.mass);
    //console.log("-> ", this.vector.magnitude(v));
    let w = this.vector.multiply(
        this.vector.cross(r, p), (1/element.physic.inertia));
    element.physic.w = w;
}
*/
/*
simplePhysic.constrainRotation = function(element, constrainVector) {
    let vConstrain = this.vector.cross(
        this.vector.substract(constrainVector, element.getCenterVector()), 
        element.physic.w
        );
    return vConstrain;
}

simplePhysic.gravityAngularMomentumEffect = function(element, collideVector) {
    for(let effect of this.activeEffects)
        if(effect == this.effectOfGravity) {
            let centerVector = element.getCenterVector();
            if(true) {
                let r = this.vector.substract(centerVector, collideVector).x;
                return dw = new this.vector(0, 0, r * 0.001 * this.G * simplePhysic.REFRESH_PERIOD * 0.001);
            }    
        }
    return new this.vector(0, 0, 0);
}
*/