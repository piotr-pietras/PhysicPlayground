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
}

simplePhysic.addDragToAllElements = function(elements) {
   let zIndex = 10;
   let drag = undefined;
   for(let i of elements) {
       $(i.elementHTML).mouseenter(function (e) { 
           $((i.elementHTML)).css({cursor: "grab"});
       });

       $(i.elementHTML).mousedown(function (e) { 
           if(!drag) {
               i.setDragging(true);
               drag = i.elementHTML; 
               i.elementHTML.style.zIndex = ++zIndex;
               $((i.elementHTML)).css({cursor: "grabbing"});
           }
       });      
       
       $(i.elementHTML).mouseup(function () { 
           i.setDragging(false);
           drag = undefined;
           $((i.elementHTML)).css({cursor: "grab"});
       });

       $(simplePhysic.scene).mouseup(function () { 
           i.setDragging(false);
           drag = undefined;
       });       

       $(simplePhysic.scene).mousemove(function (e) { 
           if(drag == i.elementHTML) {
               i.setPosition(
                   e.clientX - i.info.width/2, 
                   e.clientY - i.info.height/2, i.info.c);
           }
       });   
   }
}