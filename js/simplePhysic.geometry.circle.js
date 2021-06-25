let simplePhysic = {};

simplePhysic.circle = class Circle {
    scene; element;
    properties = {
        class : "physic__circle",
        x : 0, //postion x [px]
        y : 0, //postion y [px]
        width : 10, //[px]
        height : 10, //[px]
        color : "red"
    };
    physic = {
        vX : 0, //velovity x [px/s]
        vY : 0  //velocity y [px/s]
    };

    constructor(width, x, y) {
        this.scene = simplePhysic.scene;
        this.properties.width = width;
        this.properties.height = width;
        this.addCSS();
        this.styleCSS();
        this.setPosition(x, y);
        console.log(this.physic.vY);
    }

    addCSS(){
        this.element = document.createElement("div");
        this.element.className = this.properties.class;
        this.element.style.position = "absolute";
        this.scene.appendChild(this.element);
    }

    removeCSS() {
        this.element.remove();
    }

    styleCSS() {
        this.element.style.width = this.properties.width + "px";
        this.element.style.height = this.properties.height + "px";
        this.element.style.backgroundColor = this.properties.color;
        this.element.style.borderRadius = "25px";
    }

    setPosition(x, y) {
        this.properties.x = x;
        this.properties.y = y;
        this.element.style.transform = "translate(" 
        + this.properties.x + "px,"
        + this.properties.y + "px)";
    }

    move() {
        let x = this.properties.x + this.physic.vX * simplePhysic.REFRESH_PERIOD * 0.001;
        let y = this.properties.y + this.physic.vY * simplePhysic.REFRESH_PERIOD * 0.001;
        this.setPosition(x, y);
    }
    
};