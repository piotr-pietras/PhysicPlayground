simplePhysic.circle = class Circle {
    scene; elementHTML;
    properties = {
        x : 0, //postion x [px]
        y : 0, //postion y [px]
        width : 10, //[px]
        height : 10, //[px]
        color : "red",
        highlighted : false
    };
    physic = {
        v : new simplePhysic.vector(0, 0, 0), //velovity [px/s]
        mass : 0,
        absorbe : 1
    };

    constructor(width, x, y, color) {
        this.scene = simplePhysic.scene;
        this.properties.width = width;
        this.properties.height = width;
        this.properties.color = color;
        this.physic.mass = Math.PI * Math.pow(width/2, 2);
        this.addCSS();
        this.styleCSS();
        this.setPosition(x, y);
    }

    addCSS(){
        this.elementHTML = document.createElement("div");
        this.elementHTML.style.position = "absolute";
        this.scene.appendChild(this.elementHTML);
    }

    removeCSS() {
        this.elementHTML.remove();
    }

    styleCSS() {
        this.elementHTML.style.width = this.properties.width + "px";
        this.elementHTML.style.height = this.properties.height + "px";
        this.elementHTML.style.borderRadius = this.properties.width/2 + "px";
        this.elementHTML.style.backgroundColor =  this.properties.color;
        this.elementHTML.style.background = "linear-gradient(to right," + this.properties.color + " 0%,  #b7d5de 100%)";
    }

    highlightCSS() {
        if(!this.properties.highlighted) {
            this.properties.highlighted = true;
            this.elementHTML.style.boxShadow = "0 0 "+ this.properties.width + "px " + this.properties.width/10 + "px red";
        }   
        else {
            this.properties.highlighted = false;
            this.elementHTML.style.boxShadow = "none";
            this.elementHTML.style.backgroundColor =  this.properties.color;
            this.elementHTML.style.background = "linear-gradient(to right," + this.properties.color + " 0%,  #b7d5de 100%)";
        }
    }

    setPosition(x, y) {
        this.properties.x = x;
        this.properties.y = y;
        this.elementHTML.style.transform = "translate(" 
        + this.properties.x + "px,"
        + this.properties.y + "px)";
    }

    move() {
        let x = this.properties.x + this.physic.v.x * simplePhysic.REFRESH_PERIOD * 0.001;
        let y = this.properties.y + this.physic.v.y * simplePhysic.REFRESH_PERIOD * 0.001;
        this.setPosition(x, y);
    }
    
    getPositionVector() {
        return(new simplePhysic.vector(this.properties.x, this.properties.y, 0));
    }

    getCenterVector() {
        return(new simplePhysic.vector(
            this.properties.x + this.properties.width/2,
            this.properties.y + this.properties.height/2,
            0
        ))
    }
};