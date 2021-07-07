simplePhysic.rectangle = class Rectangle extends simplePhysic.geometry {
    constructor(width, height, x, y, color) {
        super(width, height, x, y, color);
    }

    styleCSS() {
        this.elementHTML.style.width = this.info.width + "px";
        this.elementHTML.style.height = this.info.height + "px";
        this.elementHTML.style.border = "1px solid black";
        this.elementHTML.style.backgroundColor =  this.info.color;
        this.elementHTML.style.background = "linear-gradient(to right," + this.info.color + " 0%,  #b7d5de 100%)";
    }

    getPointsVector() {
        let points = [];
        for(let i = 0; i < 4; i++) {
            console.log(this.getPositionVector());
            points.push(simplePhysic.vector.rotate(
                this.getPositionVector(), this.getCenterVector(), this.info.angle + i*90));
        }
        return points;
    }
}