simplePhysic.G = 9.80665; //[px/s^2]
simplePhysic.effectOfGravity = function(element) {
    element.physic.v.y += simplePhysic.G * simplePhysic.REFRESH_PERIOD * 0.001;
}

simplePhysic.activeEffects = [];
