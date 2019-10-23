import { Geo } from './geoClass'
class Cube extends Geo {
    static width: number = 1;
    static height: number = 1;
    static depth: number = 1;
    constructor(x: number, y: number, z: number) {
        super(x, y, z);
        let { positions, colors, indices } = this.createCube(this.x, this.y, this.z);
        this.positions = positions;
        this.colors = colors;
        this.indices = indices;
    }
    getPositions(): Float32Array {
        return this.positions;
    }
    getIndices(): Uint16Array {
        return this.indices;
    }
    getColors(): Float32Array {
        return this.colors;
    }
    createCube(x: number, y: number, z: number) {
        let zeroX = Cube.width / 2, zeroY = Cube.height / 2, zeroZ = Cube.depth / 2;
        let cornerPosition = [
            [x - zeroX, y - zeroY, z - zeroZ],
            [x + zeroX, y - zeroY, z - zeroZ],
            [x + zeroX, y + zeroY, z - zeroZ],
            [x - zeroX, y + zeroY, z - zeroZ],
            [x - zeroX, y - zeroY, z + zeroZ],
            [x - zeroX, y + zeroY, z + zeroZ],
            [x + zeroX, y + zeroY, z + zeroZ],
            [x + zeroX, y - zeroY, z + zeroZ]
        ];//一个正方形所有的顶点坐标，每个坐标有x,y,z三个分量
        const CUBE_FACE_INDICES = [
            [0, 1, 2, 3], //前面
            [4, 5, 6, 7], //后面
            [0, 3, 5, 4], //左面
            [1, 7, 6, 2], //右面
            [3, 2, 6, 5], //上面
            [0, 4, 7, 1] // 下面
        ];
        const FACE_COLORS = [
            [1, 0, 0, 1], // 前面，红色
            [0, 1, 0, 1], // 后面，绿色
            [0, 0, 1, 1], // 左面，蓝色
            [1, 1, 0, 1], // 右面，黄色
            [1, 0, 1, 1], // 上面，品色
            [0, 1, 1, 1]  // 下面，青色
        ];
        const normalInput = [
            [0, 0, 1],
            [0, 0, -1],
            [-1, 0, 0],
            [1, 0, 0],
            [0, 1, 0],
            [0, -1, 0]
        ];
        let colors = [];
        let positions = [];
        let indices = [];
        for (let f = 0; f < 6; ++f) {
            let faceIndices = CUBE_FACE_INDICES[f]; //每一个面的索引
            let color = FACE_COLORS[f];
            for (let v = 0; v < 4; ++v) {
                let position = cornerPosition[faceIndices[v]];
                positions = positions.concat(position);
                colors = colors.concat(color);
            }
            let offset = 4 * f;
            indices.push(offset + 0, offset + 1, offset + 2);
            indices.push(offset + 0, offset + 2, offset + 3);
        }
        let fcolors = new Float32Array(colors);
        let fpositions = new Float32Array(positions);
        let findices = new Uint16Array(indices);

        return {
            positions: fpositions,
            colors: fcolors,
            indices: findices
        }
    }
}

export {
    Cube
}