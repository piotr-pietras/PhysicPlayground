simplePhysic.geometry = class Geometry{
    scene; elementHTML;
    info = {
        x : 0, //postion x [px]
        y : 0, //postion y [px]
        c : 0, //angular postion c [deg]
        width : 10, //[px]
        height : 10, //[px]
        color : "red",
        dragging : false
        //highlighted : false
    };
    physic = {
        v : new simplePhysic.vector(0, 0, 0), //velovity [px/s]
        w : new simplePhysic.vector(0, 0, 0), //angular velocity [deg/s]
        vConstrain : new simplePhysic.vector(0, 0, 0), //corrective velovity for constrained object[px/s]
        wConstrain : new simplePhysic.vector(0, 0, 0),
        mass : 0,
        absorbe : 1
    };

    constructor(width, height, x, y, color) {
        this.scene = simplePhysic.scene;
        this.info.width = width;
        this.info.height = height;
        this.info.color = color;
        this.addCSS();
        this.styleCSS();
        this.setPosition(x, y, 0);
    }

    addCSS(){
        this.elementHTML = document.createElement("div");
        this.elementHTML.style.position = "absolute";
        this.scene.appendChild(this.elementHTML);
    }

    removeCSS() {this.elementHTML.remove();}

    styleCSS() {}

    highlightCSS() {
        if(!this.info.highlighted) {
            this.info.highlighted = true;
            this.elementHTML.style.boxShadow = "0 0 "+ this.info.width + "px " + this.info.width/10 + "px red";
        }   
        else {
            this.info.highlighted = false;
            this.elementHTML.style.boxShadow = "none";
            this.elementHTML.style.backgroundColor =  this.info.color;
            this.elementHTML.style.background = "linear-gradient(to right," + this.info.color + " 0%,  #b7d5de 100%)";
        }
    }

    setPosition(x, y, c) {
        this.info.x = x; this.info.y = y; this.info.c = c;
        this.elementHTML.style.transform = "translate(" 
        + this.info.x + "px,"
        + this.info.y + "px)"
        + "rotateZ(" + this.info.c * 180/Math.PI + "deg)";
    }

    move() {
        let x = this.info.x + (this.physic.v.x + this.physic.vConstrain.x) * simplePhysic.REFRESH_PERIOD * 0.001;
        let y = this.info.y + (this.physic.v.y + this.physic.vConstrain.y) * simplePhysic.REFRESH_PERIOD * 0.001;
        let c = this.info.c + (this.physic.w.z + this.physic.wConstrain.z) * simplePhysic.REFRESH_PERIOD * 0.001;
        this.setPosition(x, y, c);
    }
    
    getPositionVector() {return(new simplePhysic.vector(this.info.x, this.info.y, 0));}

    getCenterVector() {
        return(new simplePhysic.vector(
            this.info.x + this.info.width/2,
            this.info.y + this.info.height/2,
            0
        ))
    }

    setDragging(isDragging) {
        if(isDragging) {
            this.info.dragging = true;
            this.physic.v = new simplePhysic.vector(0, 0, 0);
            this.physic.w = new simplePhysic.vector(0, 0, 0); 
        }
        else this.info.dragging = false;
    }
};