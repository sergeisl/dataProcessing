export default class MathFunction {

    arraySum(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    }

    arraySumXY(x, y) {
        let sum = [];
        for (let i = 0; i < x.length; i++) {
            sum[i] = x[i] * y[i];
        }
        return sum;
    }

    arraySubXY(x, y) {
        let sum = [];
        let length = 0;
        if (typeof y.length == 'undefined') {
            length = x.length
        } else {
            length = y.length
        }
        for (let i = 0; i < length; i++) {
            if (typeof y.length == 'undefined') {
                sum[i] = x[i] / y;
            } else if (typeof x.length == 'undefined') {
                sum[i] = x / y[i];
            } else {
                sum[i] = x[i] / y[i];
            }
        }
        return sum;
    }

    arraySumDegree(array, degree) {
        let sum = [];
        for (let i = 0; i < array.length; i++) {
            sum[i] = Math.pow(array[i], degree);
        }
        return sum;
    }

    Determinant(A) {
        var N = A.length, B = [], denom = 1, exchanges = 0;
        for (var i = 0; i < N; ++i)
        {
            B[i] = [];
            for (var j = 0; j < N; ++j)
                B[i][j] = A[i][j];
        }
        for (var i = 0; i < N - 1; ++i)
        {
            var maxN = i, maxValue = Math.abs(B[i][i]);
            for (var j = i + 1; j < N; ++j)
            {
                var value = Math.abs(B[j][i]);
                if (value > maxValue) {
                    maxN = j;
                    maxValue = value;
                }
            }
            if (maxN > i)
            {
                var temp = B[i];
                B[i] = B[maxN];
                B[maxN] = temp;
                ++exchanges;
            } else {
                if (maxValue == 0)
                    return maxValue;
            }
            var value1 = B[i][i];
            for (var j = i + 1; j < N; ++j)
            {
                var value2 = B[j][i];
                B[j][i] = 0;
                for (var k = i + 1; k < N; ++k)
                    B[j][k] = (B[j][k] * value1 - B[i][k] * value2) / denom;
            }
            denom = value1;
        }
        if (exchanges % 2)
            return -B[N - 1][N - 1];
        else
            return B[N - 1][N - 1];
    }

    AdjugateMatrix(A) {
        var N = A.length, adjA = [];
        for (var i = 0; i < N; i++)
        {
            adjA[i] = [];
            for (var j = 0; j < N; j++)
            {
                var B = [], sign = ((i + j) % 2 == 0) ? 1 : -1;
                for (var m = 0; m < j; m++)
                {
                    B[m] = [];
                    for (var n = 0; n < i; n++)
                        B[m][n] = A[m][n];
                    for (var n = i + 1; n < N; n++)
                        B[m][n - 1] = A[m][n];
                }
                for (var m = j + 1; m < N; m++)
                {
                    B[m - 1] = [];
                    for (var n = 0; n < i; n++)
                        B[m - 1][n] = A[m][n];
                    for (var n = i + 1; n < N; n++)
                        B[m - 1][n - 1] = A[m][n];
                }
                adjA[i][j] = sign * this.Determinant(B);
            }
        }
        return adjA;
    }

    InverseMatrix(A) {
        var det = this.Determinant(A);
        if (det == 0)
            return false;
        var N = A.length, A = this.AdjugateMatrix(A);
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < N; j++)
                A[i][j] /= det;
        }
        return A;
    }

    MultiplyMatrix(A, B) {
        var rowsA = A.length, colsA = A[0].length,
                rowsB = B.length, colsB = B[0].length,
                C = [];
        if (colsA != rowsB)
            return false;
        for (var i = 0; i < rowsA; i++)
            C[i] = [];
        if (typeof colsB == 'undefined') {
            for (var i = 0; i < rowsA; i++) {
                var t = 0;
                for (var j = 0; j < rowsB; j++)
                    t += A[i][j] * B[j];
                C[i][0] = t;
            }
        } else {
            for (var k = 0; k < colsB; k++) {
                for (var i = 0; i < rowsA; i++) {
                    var t = 0;
                    for (var j = 0; j < rowsB; j++)
                        t += A[i][j] * B[j][k];
                    C[i][k] = t;
                }
            }
        }
        return C;
    }
}