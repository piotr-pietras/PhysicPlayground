simplePhysic.scene = document.querySelector("#scene__simplePhysic");
simplePhysic.elements = [];

simplePhysic.addCircle = function() {
   this.elements.push(new this.circle(50, 0, 0));
}

simplePhysic.addCircle();
simplePhysic.simulate();
