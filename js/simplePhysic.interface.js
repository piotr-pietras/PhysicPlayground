simplePhysic.scene = document.querySelector("#scene__simplePhysic");
simplePhysic.elements = [];

simplePhysic.addCircle = function(diameter, x , y) {
   this.elements.push(new this.circle(diameter, x, y));
}
