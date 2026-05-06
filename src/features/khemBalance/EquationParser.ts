import { reducedRowEchelon, makeInvertibleMatrix, makeTriangularMatrix } from "../../utils/MathUtils";
import { isDigit } from "../../utils/StringUtils";

type reactant_t = Set<string>;


interface iAtomData {
    symbol: string;
    amountStr?: string;
    amountNum: number;
}


class Compound {

    private _atoms: iAtomData[] = [];

    constructor(text: string) {

        // ensure stack.length is not less than zero
        let cmpdText = `(${text})`;
        let stack = [new AtomNode()];

        
        for(let i = 0; i < cmpdText.length; i++) {
            const char = cmpdText[i];
            if(char == "(") {
                stack.push(new AtomNode());
                continue;
            } else if(char == ")") {
                i++;
                let amt = cmpdText[i];
                let amtStr = "";
                while(i < cmpdText.length && isDigit(amt)) {
                    amtStr += amt;
                    amt = cmpdText[++i];
                    
                }

                if(amtStr.length <= 0) amtStr = "1";

                const lastChild = stack.pop(); 
                const atomData = this.getAtomsFromText(lastChild?.text || "");

                for(let atom of atomData) {
                    atom.amountNum *= parseInt(amtStr || "1");
                    stack[stack.length - 1].text += `${atom.symbol}${atom.amountNum}`;
                }
                i--;
                continue;
            }

            const curr = stack[stack.length - 1];
            curr.text += char;
        }

        this._atoms = this.getAtomsFromText(stack[0].text);
    }

    get atoms() {
        return this._atoms;
    }


    private getAtomsFromText(text: string) {
        const strPat = /[A-Z]|[a-z]/;
        const upperCasePat = /[A-Z]/;
        const digitPat = /[0-9]/;
        let data: iAtomData[] = [];

        for(let i = 0; i < text.length; i++) {
            const chr = text[i];
            if(chr.match(strPat)) {
                if(chr.match(upperCasePat))
                    data.push({ symbol: "", amountStr: "", amountNum: 0 });

                const curr = data[data.length - 1];
                curr.symbol += chr;
            }

            if(data.length > 0) {
                if(chr.match(digitPat)) {
                    data[data.length - 1].amountStr += chr;
                }
            }
        }

        data.map(data => { data.amountNum = parseInt(data.amountStr || "1")})

        return data;
    } 


}


class AtomNode {

    constructor(
        public text: string = "",
        
    ) {}

}


export default class EquationParser {

    constructor(private eqn: string) 
    {
        this.getReactantProd();
        
    }

    
    private getReactantProd() 
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
        let matrix: number[][] = [];

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

        console.log(matrix);
        const echelon = reducedRowEchelon(matrix);
        console.log(echelon);

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