simplePhysic.line = class Line {
    v = undefined;
    p1 = undefined;
    p2 = undefined;
    constructor(vector1, vector2) {
        this.p1 = vector1;
        this.p2 = vector2;
        this.v = simplePhysic.vector.substract(vector2, vector1);
    }

    static moveBy(line, vector) {
        let p1 = simplePhysic.vector.sum(line.p1, vector);
        let p2 = simplePhysic.vector.sum(line.p2, vector);
        return new Line(p1, p2);
    }

    static intersect2D(line1, line2) {
        let d = (line1.p1.x - line1.p2.x)*(line2.p1.y - line2.p2.y) - (line1.p1.y - line1.p2.y)*(line2.p1.x - line2.p2.x);
        if(d == 0) return false;

        let t = ((line1.p1.x - line2.p1.x)*(line2.p1.y - line2.p2.y) - (line1.p1.y - line2.p1.y)*(line2.p1.x - line2.p2.x)) / d;
        let u = ((line1.p2.x - line1.p1.x)*(line1.p1.y - line2.p1.y) - (line1.p2.y - line1.p1.y)*(line1.p1.x - line2.p1.x)) / d;
        
        if(t >= 0 && t <= 1 && u >= 0 && u <= 1) return true;
        return false;
    }

    static intersectPoint2D(line1, line2) {
        let d = (line1.p1.x - line1.p2.x)*(line2.p1.y - line2.p2.y) - (line1.p1.y - line1.p2.y)*(line2.p1.x - line2.p2.x);
        if(d == 0) return false;

        let x = ((line1.p1.x*line1.p2.y - line1.p1.y*line1.p2.x)*(line2.p1.x - line2.p2.x)
        - (line1.p1.x - line1.p2.x)*(line2.p1.x*line2.p2.y - line2.p1.y*line2.p2.x)) / d;
        let y = ((line1.p1.x*line1.p2.y - line1.p1.y*line1.p2.x)*(line2.p1.y - line2.p2.y)
        - (line1.p1.y - line1.p2.y)*(line2.p1.x*line2.p2.y - line2.p1.y*line2.p2.x)) / d;
        
        return new simplePhysic.vector(x, y, 0);
    }

    //Returns perpendicular vector to line from point
    //Vector's arrow pointing line
    static distanceToPoint2D(line, point) {
        let n = simplePhysic.vector.unit(line.v);
        let s = simplePhysic.vector.substract(point, line.p1);
        let dot = simplePhysic.vector.dot(s, n);
        let multiply = simplePhysic.vector.multiply(n, dot);

        return simplePhysic.vector.substract(s, multiply);
    }
}