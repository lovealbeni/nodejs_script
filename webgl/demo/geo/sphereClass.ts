import { Geo } from './geoClass'
class Sphere extends Geo {
    divideByYAxis: number;
    divideByCircle: number;
    radius: number;
    constructor(x: number, y: number, z: number, divideByYAxis: number, divideByCircle: number, radius: number) {
        super(x, y, z);
        this.divideByYAxis = divideByYAxis;
        this.divideByCircle = divideByCircle;
        this.radius = radius;
        let { positions,colors,indices } = this.createCube();
        this.positions = positions;
        this.colors = colors;
        this.indices = indices;
    }
    getRandom(min,max){
        return (Math.random()*(max-min) + min) | 0;
    }
    getRandomColor():Array<number>{
        const FACE_COLORS = [
            [1, 0, 0, 1], // 前面，红色
            [0, 1, 0, 1], // 后面，绿色
            [0, 0, 1, 1], // 左面，蓝色
            [1, 1, 0, 1], // 右面，黄色
            [1, 0, 1, 1], // 上面，品色
            [0, 1, 1, 1]  // 下面，青色
        ];
        return FACE_COLORS[this.getRandom(0,6)];
    }
    createCube() {
        let yUnitAngle = Math.PI / this.divideByYAxis;
        let circleUnitAngle = (Math.PI * 2) / this.divideByCircle;
        let positions = [],colors = [];
        for (let i = 0; i <= this.divideByYAxis; i++) {
            let yValue = this.y + this.radius * Math.cos(yUnitAngle * i);
            let yCurrentRadius = this.radius * Math.sin(yUnitAngle * i);

            for (let j = 0; j <= this.divideByCircle; j++) {
                let xValue = this.x + yCurrentRadius * Math.cos(circleUnitAngle * j);
                let zValue = this.z + yCurrentRadius * Math.sin(circleUnitAngle * j);
                positions.push(xValue, yValue, zValue);
                colors = colors.concat(this.getRandomColor());
            }
        }

        let indices = [];
        let circleCount = this.divideByCircle + 1;
        for (let j = 0; j < this.divideByCircle; j++) {
            for (let i = 0; i < this.divideByYAxis; i++) {
                indices.push(i * circleCount + j);
                indices.push(i * circleCount + j + 1);
                indices.push((i + 1) * circleCount + j);

                indices.push((i + 1) * circleCount + j);
                indices.push(i * circleCount + j + 1);
                indices.push((i + 1) * circleCount + j + 1);
            }
        }
        return {
            positions: new Float32Array(positions),
            indices: new Uint16Array(indices),
            colors: new Float32Array(colors)
        };
    }
}

export {
    Sphere
}