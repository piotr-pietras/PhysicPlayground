simplePhysic.refreshPeriod = 40; //[ms]

simplePhysic.simulate = function() {
    console.log("simulating...");

    for(let i in this.elements) {
        for(let affect of this.activeEffects){
            console.log(affect);
            /*TO REPAIR*/
            if(affect in this){
                console.log("in");
                affect(this.elements[i]);
            }
            /*this.effectOfGravity(this.elements[i]);*/
        }
        this.elements[i].move();
    }

    setTimeout(() => {this.simulate()}, this.refreshPeriod);
};
