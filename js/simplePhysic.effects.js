simplePhysic.g = 9.80665 * 50; //[px/s^2]
simplePhysic.effectOfGravity = function(element) {
    element.physic.vY += 
    this.g * simplePhysic.refreshPeriod * 0.001;
}

simplePhysic.activeEffects = [];
simplePhysic.activeEffects.push("effectOfGravity");

