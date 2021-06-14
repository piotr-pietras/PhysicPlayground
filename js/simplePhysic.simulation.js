let refreshPeriod = 40; //[ms]

function simulate() {
    console.log("simulating...");
    
    for(let i in elements) {
        for(let effect of activeEffects){
            effect(elements[i]);
        }
        elements[i].move();
    }

    setTimeout(() => {simulate()}, refreshPeriod);
 }