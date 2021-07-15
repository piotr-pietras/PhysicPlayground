simplePhysic.linearMomentumPreservation = function(v1, v2, m1 ,m2) {
    if(v2 == 0) {
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

simplePhysic.constrainRotation = function(element, constrainVector) {
    let centerVector = element.getCenterVector();
    let r = this.vector.substract(centerVector, constrainVector);
    let dv = this.vector.cross(r, element.physic.w);
    //return {}
}
/*
simplePhysic.gravityAngularMomentumEffect = function(element, pointVector) {
    for(let effect of this.activeEffects)
        if(effect == this.effectOfGravity) {
            let centerVector = element.getCenterVector();
            if(pointVector.y >= this.scene.clientHeight) {
                let r = this.vector.substract(centerVector, pointVector).x;
                let dw = new this.vector(0, 0, r * 0.001 * this.G * simplePhysic.REFRESH_PERIOD * 0.001);
                return {
                    constrain : pointVector,
                    dw : dw
                }
            }    
        }
    return {
        constrain : element.getCenterVector(),
        dw : new this.vector(0, 0, 0)
    }
}
*/