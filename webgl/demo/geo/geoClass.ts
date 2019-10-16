class Geo{
    x:number;
    y:number;
    z:number;
    positions:Float32Array;
    indices:Uint16Array;
    colors:Float32Array;
    constructor(x:number,y:number,z:number){
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getPositions():Float32Array{
        return this.positions;
    }
    getIndices():Uint16Array{
        return this.indices;
    }
    getColors():Float32Array{
        return this.colors;
    }
}

export {
    Geo
}