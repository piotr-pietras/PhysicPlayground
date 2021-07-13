//Returns area of triangle
simplePhysic.triangleArea = function(vector1, vector2, vector3) {
    ax = vector1.x; let ay = vector1.y;
    bx = vector2.x; let by = vector2.y;
    cx = vector3.x; let cy = vector3.y;
    return Math.abs((ax*(by-cy) + bx*(cy-ay) + cx*(ay-by)) / 2);
}
//Returns area of rectangle
simplePhysic.rectangleArea = function(vector1, vector2, vector3) {
    width = simplePhysic.vector.magnitude(
        simplePhysic.vector.substract(vector1, vector2));
    height = simplePhysic.vector.magnitude(
        simplePhysic.vector.substract(vector2, vector3));
    return width*height;
}