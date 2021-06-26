simplePhysic.checkCollision = false;
simplePhysic.collision = function (element, element2) { 
    let xC = element.properties.x - element.properties.width/2;
    let yC = element.properties.y - element.properties.width/2;
    let xC2 = element2.properties.x - element2.properties.width/2;
    let yC2 = element2.properties.y - element2.properties.width/2;
    let triggerDistnace = element.properties.width/2 + element2.properties.width/2;
    let distance = Math.sqrt(Math.pow(xC2 - xC, 2) + Math.pow(yC2 - yC, 2));
    
    if(distance <= triggerDistnace) {console.log("collide");return true};
    return false;
}