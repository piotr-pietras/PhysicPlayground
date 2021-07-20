simplePhysic.rectangle = class Rectangle extends simplePhysic.geometry {
    constructor(width, height, x, y, color) {
        super(width, height, x, y, color);
        this.physic.mass = width * height;
        this.physic.inertia = this.physic.mass * (Math.pow(width, 2) + Math.pow(height, 2)) / 12;
    }

    styleCSS() {
        this.elementHTML.style.width = this.info.width + "px";
        this.elementHTML.style.height = this.info.height + "px";
        this.elementHTML.style.border = "1px solid black";
        this.elementHTML.style.backgroundColor =  this.info.color;
        this.elementHTML.style.background = "linear-gradient(to right," + this.info.color + " 0%,  #b7d5de 100%)";
    }

    getPointVector() {
        let points = [];
        points.push(simplePhysic.vector.rotate(
            this.getPositionVector(), this.getCenterVector(), this.info.c * 180/Math.PI));
        points.push(simplePhysic.vector.rotate(
            simplePhysic.vector.sum(this.getPositionVector(), new simplePhysic.vector(0, this.info.height, 0)), 
            this.getCenterVector(), this.info.c * 180/Math.PI));        
        points.push(simplePhysic.vector.rotate(
            this.getPositionVector(), this.getCenterVector(), (this.info.c * 180/Math.PI) + 180));  
        points.push(simplePhysic.vector.rotate(
            simplePhysic.vector.sum(this.getPositionVector(), new simplePhysic.vector(this.info.width, 0, 0)), 
            this.getCenterVector(), this.info.c * 180/Math.PI)); 

        return points;
    }
}