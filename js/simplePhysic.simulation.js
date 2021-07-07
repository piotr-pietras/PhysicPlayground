simplePhysic.REFRESH_PERIOD = 40; //[ms]
simplePhysic.simulateInterval = null;
simplePhysic.checkObjectCollision = true;
simplePhysic.checkFrameCollision = true;
simplePhysic.colorizeCollision = false;

simplePhysic.simulate = function() {
    clearInterval(this.simulateInterval);
    this.simulateInterval = setInterval(() => {
        for(let i = 0; i < this.elements.length; i++) {
            //Apply effect
            for(let affect of this.activeEffects) {
                if(!this.elements[i].info.dragging) affect(this.elements[i]);
            }

            //Check for frame collision
            if(this.checkFrameCollision) {
                this.detectCollision(this.elements[i], "frame");
            }

            //Check for object collision
            if(this.checkObjectCollision) {
                for(let j = i + 1; j < this.elements.length ; j++) {
                    if(this.elements[i] == this.elements[j]) continue;
                    this.detectCollision(this.elements[i], this.elements[j]);
                }
            }
            this.elements[i].move();
            console.log(this.elements[0].getPointsVector());
        }
    }, this.refreshPeriod);
};
