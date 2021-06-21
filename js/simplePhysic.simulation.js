simplePhysic.REFRESH_PERIOD = 40; //[ms]

simplePhysic.simulate = function() {
    //console.log("simulating...");

    for(let i in this.elements) {
        for(let affect of this.activeEffects) {
            affect(this.elements[i]);
        }
        this.elements[i].move();
    }

    setTimeout(() => {this.simulate()}, this.refreshPeriod);
};
