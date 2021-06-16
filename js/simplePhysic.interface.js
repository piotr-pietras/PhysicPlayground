let scene = document.querySelector(".simplePhysic__scene");
let worker;
let elements = [];

addCircle();
start();

function addCircle() {
   elements.push(new Circle(scene, 50, 0, 0));
   elements.push(new Circle(scene, 50, 50, 50));
   elements.push(new Circle(scene, 50, 100, 100));

   console.log(elements);
}
