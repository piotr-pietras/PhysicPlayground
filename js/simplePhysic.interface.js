simplePhysic = {};
simplePhysic.scene = document.querySelector("#scene__simplePhysic");
simplePhysic.elements = [];

simplePhysic.addCircle = function(diameter, x , y, color) {
   this.elements.push(new this.circle(diameter, x, y, color));
}

simplePhysic.addRectangle = function(width, height, x , y, color) {
   this.elements.push(new this.rectangle(width, height, x, y, color));
}

simplePhysic.clearAll = function () {  
   clearInterval(this.simulateInterval);
   for(i in this.elements) {
      this.elements[i].removeCSS();
   }
   this.elements = [];
   this.activeEffects = []
   console.log("-> simplePhysic cleared all")
}

simplePhysic.addDragToAllElements = function(elements) {
   let zIndex = 10;
   let drag = undefined;
   for(let i of elements) {
        i.elementHTML.addEventListener("mouseover", (e) => {
            i.elementHTML.style.cursor = "grab";
        })


        i.elementHTML.addEventListener("mousedown", (e) => {
            i.setDragging(true);
            drag = i.elementHTML; 
        })
       
        i.elementHTML.addEventListener("mouseup", (e) => {
            i.setDragging(false);
            drag = undefined;
        })

        this.scene.addEventListener("mouseup", (e) => {
            i.setDragging(false);
            drag = undefined;
        })  

        this.scene.addEventListener("mousemove", (e) => {
            if(drag == i.elementHTML) {
                i.setPosition(
                    e.clientX - i.info.width/2, 
                    e.clientY - i.info.height/2, i.info.c);
            }
        })
   }
}