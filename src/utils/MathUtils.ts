export type matrix_t<T = number> = T[][];


export function getRandomFromArray<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length - 1)];
}


export const getRandRange = (min: number, max: number) => Math.random() * (max - min + 1) + min;


/**
 * An invertible matrix is a matrix that is ensured that all diagonals are non-zero
 * If the conversion operation is impossible, an empty matrix is returned instead
 * @param inputArr input matrix
 * @returns an invertible matrix or empty matrix
 */
export const makeInvertibleMatrix = (inputArr: matrix_t) => {
    const arr = [...inputArr];
    const maxRow = arr[0].length - 1;
    let isInvertible = false;

    const MAX_TRIES = 30;
    let iter = 0;
    while(iter++ < MAX_TRIES && !isInvertible) {

        isInvertible = true;
        for(let i = 0; i < maxRow; i++) {
            if(arr[i][i] == 0) isInvertible = false;
        }

        for(let i = 0; i < maxRow; i++) {
            const row = arr[i];
            if(row[i] != 0) continue;

            for(let j = 0; j < arr.length; j++) {
                if(j == i) continue;

                const row2 = arr[j];
                if(row2[i] == 0) continue;

                const a = [...row];
                const b = [...row2];
                arr[i] = [...b];
                arr[j] = [...a];
                break;
            }
        }
    }

    return isInvertible ? arr: [];
}


export function makeTriangularMatrix(inputArr: matrix_t, isUpperBound = false){
    const maxRow = inputArr.length - 1;
    let count = 0;

    for(let i = 0; i < maxRow; i++) {
        const r1 = inputArr[i];
        const a = r1[i];
        
        // for lower-boundaries
        const lowerBoundary = isUpperBound ? 0 : i + 1;
        const upperBoundary = isUpperBound ? i : inputArr.length;
        for(let row = lowerBoundary; row < upperBoundary; row++) {
            const r2 = inputArr[row];
            const b = r2[i];

            if(b == 0) continue;
            count++;

            const narr: number[] = [];
            for(let j = 0; j < r2.length; j++) {
                const nval = b * r1[j] - a * r2[j];
                narr.push(nval);
            }
            inputArr[row] = [...narr];
        }
    }

    return count;
}


export function reducedRowEchelon(inputArr: matrix_t) {
    const MAX_ITER = 30;
    let iter = 0;
    let isValid = true;

    let matrix = [...inputArr];

    while(iter++ < MAX_ITER && isValid) {
        matrix = makeInvertibleMatrix(matrix);
        if(!matrix.length) {
            isValid = false;
            continue
        }

        let bc = makeTriangularMatrix(matrix, false);
        matrix = makeInvertibleMatrix(matrix);
        if(!matrix.length) {
            isValid = false;
            continue
        }

        let tc = makeTriangularMatrix(matrix, true);

        // all are triangular
        if(bc + tc == 0) break;
    }

    const maxRow = inputArr.length - 1;
    const colLength = inputArr[0].length;
    for(let i = 0; i < maxRow; i++) {
        const val = matrix[i][i];

        matrix[i][i] /= val;
        matrix[i][colLength - 1] /= val;
        
    }

    return isValid ? matrix: [];
}



export class Fraction {

    constructor(
        public num = 0,
        public denom = 1
    ){}

    public multiply(f: Fraction) {
        return new Fraction(this.num * f.num, this.denom * f.denom);
    }

    public add(f: Fraction) {
        const lcm = this.denom * f.denom;
        return new Fraction(lcm / this.denom * this.num + lcm / f.denom * f.num, lcm);
    }

    public sub(f: Fraction) {
        const lcm = this.denom * f.denom;
        return new Fraction(lcm / this.denom * this.num - lcm / f.denom * f.num, lcm);
    }

}