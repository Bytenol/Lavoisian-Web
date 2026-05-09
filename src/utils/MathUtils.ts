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
    const maxRow = inputArr[0].length - 1;
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
    const maxRow = inputArr[0].length - 1;
    let count = 0;

    for(let i = 0; i < maxRow; i++) {
        const r1 = inputArr[i];
        const a = r1[i];

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

        makeInvertibleMatrix(inputArr);
        
    }

    return count;
}


export function reducedRowEchelon(inputArr: matrix_t) {
    const MAX_ITER = 30;
    let iter = 0;
    let isValid = true;

    let maxRow = inputArr[0].length - 1;
    let matrix = [...inputArr];

    while(iter++ < MAX_ITER && isValid) {
        let bc = makeTriangularMatrix(matrix, false);
        let tc = makeTriangularMatrix(matrix, true);

        // no more index to be made zero
        if(bc + tc == 0) break;
    }

    console.log(matrix);

    // maxRow = matrix.length - 1;
    // for(let i = 0; i < maxRow; i++) {
    //     const val = matrix[i][i];

    //     matrix[i][i] /= val;
    //     matrix[i][maxRow] /= val;
        
    // }

    return isValid ? matrix: [];
}


export const gcd = (a: number, b: number): number => (b === 0) ? a: gcd(b, a % b);


export class Fraction {

    constructor(
        public num = 0,
        public denom = 1
    ){
        this.simplify();
    }

    private simplify() {
        let g = gcd(this.num, this.denom);
        if(g !== 1) {
            this.num /= g;
            this.denom /= g;
        } 
    }

    public multiply(f: Fraction) {
        return new Fraction(this.num * f.num, this.denom * f.denom);
    }

    // get a fraction from a floating point number
    // Fraction.fromDecimal(0.5) => Fraction(1, 2);
    public static fromDecimal(d: number) {
        let ds = d.toString();

        // integers
        if(!ds.includes(".")) return new Fraction(d, 1);

        let num = parseInt(ds.replace(".", ""));
        let strnum = num.toString();
        return new Fraction(num, Math.pow(10, strnum.length));
    }

}