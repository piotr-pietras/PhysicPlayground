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
    };
    physic = {
        v : new simplePhysic.vector(0, 0, 0), //velovity [px/s]
        w : new simplePhysic.vector(0, 0, 0), //angular velocity [deg/s]
        density : 1,
        mass : 0,
        inertia : 0, // moment of inertia
        elastic : 0.5 // material kinetic energy absorbtion (1 means no absorbtion)
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

    setPosition(x, y, c) {
        this.info.x = x; this.info.y = y; this.info.c = c;
        this.elementHTML.style.transform = "translate(" 
        + this.info.x + "px,"
        + this.info.y + "px)"
        + "rotateZ(" + this.info.c * 180/Math.PI + "deg)";
    }

    move() {
        let x = this.info.x + this.physic.v.x * simplePhysic.REFRESH_PERIOD * 0.001;
        let y = this.info.y + this.physic.v.y * simplePhysic.REFRESH_PERIOD * 0.001;
        let c = this.info.c + this.physic.w.z * simplePhysic.REFRESH_PERIOD * 0.001;
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