class Vector3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    setX(x: number = 0) {
        this.x = x;
    }
    setY(y: number = 0) {
        this.y = y;
    }
    setZ(z: number = 0) {
        this.z = z;
    }
    normalize() {
        var length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        if (length > 0.00001) {
            return new Vector3(this.x / length, this.y / length, this.z / length);
        }
        return new Vector3();
    }
    length() {
        return Math.sqrt(this.lengthSquare());
    }
    lengthSquare() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    static add(vec1: Vector3, vec2: Vector3, vecTarget: Vector3 = new Vector3()): Vector3 {
        vecTarget.x = vec1.x + vec2.x;
        vecTarget.y = vec1.y + vec2.y;
        vecTarget.z = vec1.z + vec2.z;
        return vecTarget;
    }
    static sub(vec1: Vector3, vec2: Vector3, vecTarget: Vector3 = new Vector3()): Vector3 {
        vecTarget.x = vec1.x - vec2.x;
        vecTarget.y = vec1.y - vec2.y;
        vecTarget.z = vec1.z - vec2.z;
        return vecTarget;
    }
    static multiply(vec1: Vector3, vec2: Vector3, vecTarget: Vector3 = new Vector3()): Vector3 {
        vecTarget.x = vec1.x * vec2.x;
        vecTarget.y = vec1.y * vec2.y;
        vecTarget.z = vec1.z * vec2.z;
        return vecTarget;
    }
    static dot(vec1: Vector3, vec2: Vector3) {
        return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
    }
    static cross(vec1: Vector3, vec2: Vector3): Vector3 {
        var x = vec1.y * vec2.z - vec2.y * vec1.z;
        var y = vec2.x * vec1.z - vec1.x * vec2.z;
        var z = vec1.x * vec2.y - vec1.y * vec2.x;
        return new Vector3(x, y, z);
    }
}

export {
    Vector3
}