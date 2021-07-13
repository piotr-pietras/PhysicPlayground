simplePhysic.line = class Line {
    v = undefined;
    p1 = undefined;
    p2 = undefined;
    constructor(vector1, vector2) {
        this.p1 = vector1;
        this.p2 = vector2;
        this.v = simplePhysic.vector.substract(vector2, vector1);
    }

    static intersect(line1, line2) {
        let d = (line1.p1.x - line1.p2.x)*(line2.p1.y - line2.p2.y) - (line1.p1.y - line1.p2.y)*(line2.p1.x - line2.p2.x);
        if(d == 0) return false;

        let t = ((line1.p1.x - line2.p1.x)*(line2.p1.y - line2.p2.y) - (line1.p1.y - line2.p1.y)*(line2.p1.x - line2.p2.x)) / d;
        let u = ((line1.p2.x - line1.p1.x)*(line1.p1.y - line2.p1.y) - (line1.p2.y - line1.p1.y)*(line1.p1.x - line2.p1.x)) / d;
        
        if(t >= 0 && t <= 1 && u >= 0 && u <= 1) return true;
        return false;
    }
}