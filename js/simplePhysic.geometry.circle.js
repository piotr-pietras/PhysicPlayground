simplePhysic.circle = class Circle extends simplePhysic.geometry{
    constructor(width, x, y, color) {
        super(width, width, x, y, color);
        this.physic.mass = Math.PI * Math.pow(width/2, 2);
    }

    styleCSS() {
        this.elementHTML.style.width = this.info.width + "px";
        this.elementHTML.style.height = this.info.height + "px";
        this.elementHTML.style.border = "1px solid black";
        this.elementHTML.style.borderRadius = this.info.width/2 + "px";
        this.elementHTML.style.backgroundColor =  this.info.color;
        this.elementHTML.style.background = "linear-gradient(to right," + this.info.color + " 0%,  #b7d5de 100%)";
    }
};