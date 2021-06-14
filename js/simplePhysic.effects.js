let activeEffects = [affectOfGravity];

const g =  9.80665 * 50; //[px/s^2]
function affectOfGravity(element) {
    element.physic.vY += g * refreshPeriod * 0.001;
}