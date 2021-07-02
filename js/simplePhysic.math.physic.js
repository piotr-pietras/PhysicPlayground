simplePhysic.linearMomentumPreservation = function(v1, v2, m1 ,m2) {
    if(v2 == 0) {
        let u1 = [simplePhysic.vector.contrary(v1[0]),v1[1]];
        return {
            u1 : u1, 
            u2 : 0
        }
    }
    
    let u1 = [
        simplePhysic.vector.sum(
        simplePhysic.vector.multiply(v1[0], (m1-m2)/(m1+m2)),
        simplePhysic.vector.multiply(v2[0], (2*m2)/(m1+m2))),

        v1[1]
    ];

    let u2 = [
        simplePhysic.vector.sum(
        simplePhysic.vector.multiply(v2[0], (m2-m1)/(m1+m2)),
        simplePhysic.vector.multiply(v1[0], (2*m1)/(m1+m2))),

        v2[1]
    ];

    return {
        u1 : u1, 
        u2 : u2
    };
}
