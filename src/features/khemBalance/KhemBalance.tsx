import { useEffect, useState } from "react";
import { getRandomFromArray, getRandRange } from "../../utils/MathUtils";
import EquationParser from "./EquationParser";

const sampleEqn = [
    // "NaOH + H2SO4 = Na2SO4 + H2O",
    // "H2 + O2 = H2O",
    "H2 + O2 = H2O"
];


const KhemBalance = () => {

    const [eqn, setEqn] = useState<string>("");

    useEffect(() => {
        generateRandomEqn();
    }, []);

    const generateRandomEqn = () => {
        const rd = Math.floor(getRandRange(0, sampleEqn.length - 1));
        setEqn(sampleEqn[rd]);
    }


    const balanceEqn = () => {
        const parser = new EquationParser(eqn);
    }


    return(
        <div className="bg-dark w-100 h-100 container-fluid">
            <h1>This is the khembalance stage</h1>

            <input type="text" value={eqn} onChange={e => setEqn(e.target.value)} />
            <button onClick={generateRandomEqn}>Random</button>
            <button onClick={balanceEqn}>Balance eqn</button>
        </div>
    )
}

export default KhemBalance;