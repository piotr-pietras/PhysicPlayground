simplePhysic.vector = class Vector {
    x = 0; y = 0; z = 0;
    constructor(x, y, z) {
        this.x = x; this.y = y; this.z = z;
    }

    toString() {return "x: " + this.x + " y: " + this.y + " z: " + this.z;}

    static substract(vector1, vector2) {
        let x = vector1.x - vector2.x;
        let y = vector1.y - vector2.y;
        let z = vector1.z - vector2.z;
        return(new Vector(x, y, z));
    }

    static sum(vector1, vector2) {
        let x = vector1.x + vector2.x;
        let y = vector1.y + vector2.y;
        let z = vector1.z + vector2.z;
        return(new Vector(x, y, z));
    }

    static multiply(vector, scalar) {
        return(new Vector(vector.x * scalar, vector.y * scalar, vector.z * scalar));
    }

    static contrary(vector) {
        return(new Vector(vector.x * (-1), vector.y * (-1), vector.z * (-1)));
    }

    static distance(vector1, vector2) {
        return(Math.sqrt(
            Math.pow(vector2.x - vector1.x, 2) +
            Math.pow(vector2.y - vector1.y, 2) +
            Math.pow(vector2.z - vector1.z, 2)))
    }

    static magnitude(vector) {
        return(Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2) + Math.pow(vector.z, 2)))
    }
    
    static unit(vector) {
        let mag = this.magnitude(vector);
        return new Vector(vector.x / mag, vector.y / mag, vector.z / mag);
    }

    static cross(vector1, vector2) {
        return new Vector(
            vector1.y * vector2.z - vector1.z * vector2.y,
            vector1.z * vector2.x - vector1.x * vector2.z,
            vector1.x * vector2.y - vector1.y * vector2.x
        )
    }

    static dot(vector1, vector2) {
        return vector1.x * vector2.x + vector1.y * vector2.y + vector1.z * vector2.z;
    }

    //Method returns array of vectors [normal vector , parall vector]
    static subdivide(vector, normalUnit) {
        let vector1 = this.multiply(normalUnit, this.dot(vector, normalUnit)); 
        let vector2 = this.substract(vector, vector1);
        return [vector1, vector2];
    }

    //Method returns vector rotated in 2D around center point
    static rotate(vector, centerVector, angle) {
        let angleRad = angle * Math.PI/180;
        let x0 = centerVector.x; let y0 = centerVector.y;
        let x = ((vector.x - x0)*Math.cos(angleRad) - (vector.y - y0)*Math.sin(angleRad)) + x0;
        let y = ((vector.x - x0)*Math.sin(angleRad) + (vector.y - y0)*Math.cos(angleRad)) + y0;
        console.log(x, " ", y);
        return new Vector(x, y, 0);
    }
}