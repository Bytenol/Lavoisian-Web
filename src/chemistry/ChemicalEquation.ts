import { reducedRowEchelon, Fraction, matrix_t } from "../utils/MathUtils";
import Compound from "./Compound";



class ChemicalEquation {

    private _matrix: matrix_t = [];
    private _coeff: number[] = [];

    constructor(private eqn: string) 
    {
        this.solveEquation();
    }


    public get coeff() {
        return this._coeff;
    }

    public get matrix() {
        return this._matrix;
    }

    
    private solveEquation() 
    {
        const [lhs, rhs] = this.eqn.split("=");
        if(!lhs || !rhs) {
            throw new Error("Equation does not have appropriate reactant and product length");
        }

        // NaOH + HCl = NaCl + H2O
        const [ reactantAtoms, reactants ] = this.getAtomsFromSides(lhs);
        const [ productAtoms, products ] = this.getAtomsFromSides(rhs);

        if(reactantAtoms.size != productAtoms.size || [...productAtoms].some(i => !reactantAtoms.has(i))) {
            throw new Error("Law of Conservation of mass failed");
        }

        const groupedData = [...reactants, ...products];
        let matrix: matrix_t = [];

        reactantAtoms.forEach((atom: string) => {
            matrix.push([]);
            for(let i = 0; i < groupedData.length; i++) {
                const atoms = groupedData[i].atoms;
                let f = atoms.filter(i => i.symbol == atom)[0];
                let cmatrix = matrix[matrix.length - 1];
                if(f) cmatrix.push(f.amountNum);
                else cmatrix.push(0);
            }
        });

        // console.log(matrix);
        const echelon = reducedRowEchelon(structuredClone(matrix));
        // console.log(echelon);
        // const sol: Fraction[] = [];
        // let highestDenom = -Infinity;

        // const colLength = echelon[0].length;
        // for(let i = 0; i < echelon.length; i++) {
        //     const id = echelon[i][colLength - 1];
        //     if(id === 0) continue;
        //     const f = Fraction.fromDecimal(id);
        //     highestDenom = Math.max(highestDenom, f.denom);
        //     sol.push(f);     
        // }

        // let coeff: number[] = [];
        // const multiplier = new Fraction(highestDenom);

        // sol.forEach(fract => {
        //     fract = fract.multiply(multiplier);
        //     coeff.push(fract.num);
        // });

        // coeff.push(highestDenom);
        // this._coeff = [...coeff];
    }




    private getAtomsFromSides(cmpds: string): [Set<string>, Compound[]] {
        const allAtoms: Set<string> = new Set();
        const compounds: Compound[] = [];
        
        cmpds.split("+").map(s => s.replace(" ", "")).forEach((item) => {
            const cmpd = new Compound(item);
            const atoms = cmpd.atoms;
            for(let atom of atoms) {
                allAtoms.add(atom.symbol);
            }
            compounds.push(cmpd);
        });

        return [allAtoms, compounds];
    }

}



export default ChemicalEquation;