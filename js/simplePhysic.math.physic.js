simplePhysic.linearMomentumPreservation = function(v1, v2, m1 ,m2) {
    if(m2 == 0) {
        let u1 = [this.vector.contrary(v1[0]),v1[1]];
        return {
            u1 : u1, 
            u2 : 0
        }
    }
    
    let u1 = [
        this.vector.sum(
        this.vector.multiply(v1[0], (m1-m2)/(m1+m2)),
        this.vector.multiply(v2[0], (2*m2)/(m1+m2))),

        v1[1]
    ];

    let u2 = [
        this.vector.sum(
        this.vector.multiply(v2[0], (m2-m1)/(m1+m2)),
        this.vector.multiply(v1[0], (2*m1)/(m1+m2))),

        v2[1]
    ];

    return {
        u1 : u1, 
        u2 : u2
    };
}

simplePhysic.angularVelocityToLinear = function(element, collideVector) {
    let r = this.vector.substract(collideVector, element.getCenterVector());
    return this.vector.cross(r, element.physic.w);
}


simplePhysic.angularMomentumGenerating = function(element, v, collideVector) {
    let r = this.vector.substract(collideVector, element.getCenterVector());
    let p = this.vector.multiply(v, element.physic.mass);
    //console.log("-> ", this.vector.magnitude(v));
    let w = this.vector.multiply(
        this.vector.cross(r, p), (1/element.physic.inertia));
    element.physic.w = w;
}

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