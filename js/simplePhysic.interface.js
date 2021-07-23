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

//DOES NOT WORK PROPERLY !!!!
simplePhysic.addDragToAllElements = function(elements) {
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

simplePhysic.addRandom = function(clickEvent) {
    let colors = ["red", "yellow", "green", "blue", "purple"];

    if(Math.random() > 0.5) {
        let width = 20 + 80 * Math.random();
        this.addCircle(
            width, 
            clickEvent.clientX - width/2, clickEvent.clientY - width/2, 
            colors[Math.floor(Math.random() * colors.length)]);
    }

    else {
        let width = 20 + 130 * Math.random();
        let height = 20 + 130 * Math.random();
        this.addRectangle(
            width, height, 
            clickEvent.clientX - width/2, clickEvent.clientY - height/2,  
            colors[Math.floor(Math.random() * colors.length)]);
    }
}