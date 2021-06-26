simplePhysic.REFRESH_PERIOD = 40; //[ms]
simplePhysic.simulateInterval = null;

simplePhysic.simulate = function() {
    clearInterval(this.simulateInterval);
    this.simulateInterval = setInterval(() => {
        for(let element of this.elements) {
            //Apply effect
            for(let affect of this.activeEffects) {
                affect(element);
            }
            //Check for collision
            for(let element2 of this.elements) {
                if(element == element2) continue;
                this.collision(element, element2); 
            }
            element.move();
        }
    }, this.refreshPeriod);
};
