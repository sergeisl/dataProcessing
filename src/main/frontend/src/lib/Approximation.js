import MathFunction from './MathFunction'

export default class  Approximation {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.mf = new MathFunction();
    }
    getXY() {
        let xy = [];
        for (let i = this.getX().length - 1; i >= 0; i--) {
            xy[i] = [this.getX()[i], this.getY()[i]]
        }
        return xy
    }
    getX() {
        return this.x
    }
    getY() {
        return this.y
    }
    linearApproximation() {
        let a = (this.mf.arraySum(this.getX()) * this.mf.arraySum(this.getY()) - this.getX().length * this.mf.arraySum(this.mf.arraySumXY(this.getX(), this.getY()))) /
                (this.mf.arraySum(this.getX()) * this.mf.arraySum(this.getX()) - this.getX().length * this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 2)));

        let b = (this.mf.arraySum(this.getX()) * this.mf.arraySum(this.mf.arraySumXY(this.getX(), this.getY())) - this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 2)) * this.mf.arraySum(this.getY())) /
                (this.mf.arraySum(this.getX()) * this.mf.arraySum(this.getX()) - this.getX().length * this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 2)));
        let min = Math.min.apply(null, this.getX());
        let max = Math.max.apply(null, this.getX());
        return [[min, a * min + b], [max, a * max + b]]
    }

    quadraticApproximation() {

        let arrayABC3 = [[this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 4)), this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 3)), this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 2))],
            [this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 3)), this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 2)), this.mf.arraySum(this.getX())],
            [this.mf.arraySum(this.mf.arraySumDegree(this.getX(), 2)), this.mf.arraySum(this.getX()), this.getX().length]]
        let arrayABC = [this.mf.arraySum(this.mf.arraySumXY(this.getY(), this.mf.arraySumDegree(this.getX(), 2))), this.mf.arraySum(this.mf.arraySumXY(this.getY(), this.getX())), this.mf.arraySum(this.getY())];
        arrayABC3 = this.mf.InverseMatrix(arrayABC3)
        let ABC = this.mf.MultiplyMatrix(arrayABC3, arrayABC)
        let xy = [];
        let arr = this.getX().sort();
        for (let i = arr.length - 1; i >= 0; i--) {
            xy[i] = [arr[i], parseFloat(ABC[0] * Math.pow(arr[i], 2) + ABC[1] * arr[i] + ABC[2][0])]
        }
        return xy;
    }

    hyperbolicApproximation() {

        let b1 = (this.getX().length * this.mf.arraySum(this.mf.arraySubXY(this.getY(), this.getX())) - this.mf.arraySum(this.mf.arraySubXY(1, this.getX())) * this.mf.arraySum(this.getY())) /
                (this.getX().length * this.mf.arraySum(this.mf.arraySubXY(1, this.mf.arraySumDegree(this.getX(), 2))) - Math.pow(this.mf.arraySum(this.mf.arraySubXY(1, this.getX())), 2))
        let a1 = (1 / this.getX().length) * this.mf.arraySum(this.getY()) - (b1 / this.getX().length) * this.mf.arraySum(this.mf.arraySubXY(1, this.getX()))

        let xy1 = [];
        let arr1 = Object.assign([], this.getX());
        arr1.sort();
        for (let i = arr1.length - 1; i >= 0; i--) {
            xy1[i] = [arr1[i], a1 + b1 / arr1[i]]
        }
        return xy1;
    }

}