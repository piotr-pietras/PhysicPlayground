simplePhysic.REFRESH_PERIOD = 40; //[ms]
simplePhysic.simulateInterval = null;
simplePhysic.checkCollision = true;

simplePhysic.simulate = function() {
    clearInterval(this.simulateInterval);
    this.simulateInterval = setInterval(() => {
        for(let i = 0; i < this.elements.length; i++) {
            //Apply effect
            for(let affect of this.activeEffects) {
                affect(this.elements[i]);
            }
            //Check for collision
            if(this.checkCollision) {
                for(let j = i + 1; j < this.elements.length ; j++) {
                    if(this.elements[i] == this.elements[j]) continue;
                    this.objectCollision(this.elements[i], this.elements[j]); 
                }
            }
            this.elements[i].move();
        }
    }, this.refreshPeriod);
};
