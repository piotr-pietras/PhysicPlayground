simplePhysic.REFRESH_PERIOD = 40; //[ms]
simplePhysic.simulateInterval = null;

simplePhysic.simulate = function() {
    clearInterval(this.simulateInterval);
    this.simulateInterval = setInterval(() => {
        for(let i in this.elements) {
            for(let affect of this.activeEffects) {
                affect(this.elements[i]);
            }
            this.elements[i].move();
        }
    }, this.refreshPeriod);
};
