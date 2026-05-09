import { useState } from "react";
import { getRandRange } from "../../utils/MathUtils";
import ChemicalEquation from "../../chemistry/ChemicalEquation";


const randomEquations = [
    // "NaOH + H2SO4 = Na2SO4 + H2O",
    // "Na2SO4 + H2SO4 = NaHSO4",
    // "H2O2 = H2O + O2",
    // "CH4 + O2 = CO2 + H2O",
    // "C3H8 + O2 = CO2 + H2O",
    
    // "Fe2(SO4)3 + NH3 + H2O = Fe(OH)3 + (NH4)2SO4",
    // "Ca + H2O = Ca(OH)2 + H2",
    // "Na + Cl2 = NaCl",
    "H2 + O2 = H2O",
    
    // "Cu + HNO3 = Cu(NO3)2 + H2O + NO",
    // "Fe2SiO4 + Mg2SiO4 + H2O + CO2 = Mg6(Si4O10)(OH)8 + Fe2O3 + CH4",
    // "Fe + O2 = Fe2O3",
    // "C2H6 + O2 = CO2 + H2O",
    // "Na + H2O = NaOH + H2",
    // "Al + HCl = AlCl3 + H2",
    
    // "CaCO3 = CaO + CO2",
    // "NH3 + O2 = NO + H2O",
    // "Mg + HNO3 = Mg(NO3)2 + H2",

    // "NaNO3 = NaNO2 + O2",
    // "H3PO3 = H3PO4 + PH3",
    // "KClO3 = KCl + O2",
];



const KhemBalanceView = () => {
    const [equation, setEquation] = useState("");
    const [balancedEquation, setBalancedEquation] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBalance = () => {
        if (!equation.trim()) return;

        // setLoading(true);
        const eqn = new ChemicalEquation(equation);
        // console.log(eqn);

        // Fake delay for demo UI
        // setTimeout(() => {
        // // Replace this with your actual balancing logic/API
        setBalancedEquation(
            "2H₂ + O₂ → 2H₂O"
        );

        // setLoading(false);
        // }, 1200);
        // setLoading(false);
    };

    const handleRandom = () => {
        const random = randomEquations[Math.floor(getRandRange(0, randomEquations.length - 1))];
        setEquation(random);
        setBalancedEquation("");
    };

    const handleClear = () => {
        setEquation("");
        setBalancedEquation("");
    };

    return (
        <div
        className="min-vh-100 d-flex align-items-center justify-content-center p-4"
        style={{
            background:
            "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        }}>
        <div
            className="card border-0 shadow-lg text-light"
            style={{
            maxWidth: "900px",
            width: "100%",
            background: "rgba(15, 23, 42, 0.92)",
            backdropFilter: "blur(12px)",
            borderRadius: "28px",
            }}
        >
            <div className="card-body p-4 p-md-5">
            {/* Header */}
            <div className="text-center mb-5">
                <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "20px",
                    background:
                    "linear-gradient(135deg, #06b6d4, #3b82f6)",
                }}
                >
                <i className="bi bi-flask-fill fs-1 text-white"></i>
                </div>

                <h1 className="fw-bold display-6 mb-2">
                Chemical Equation Balancer
                </h1>

                <p className="text-secondary fs-5 mb-0">
                Instantly balance chemical reactions with a clean modern interface
                </p>
            </div>

            {/* Input Section */}
            <div className="mb-4">
                <label className="form-label text-uppercase small fw-semibold text-info">
                Enter Chemical Equation
                </label>

                <div className="position-relative">
                <input
                    type="text"
                    className="form-control form-control-lg border-0 shadow-sm"
                    placeholder="Example: H2 + O2 -> H2O"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    style={{
                    background: "#1e293b",
                    color: "white",
                    borderRadius: "18px",
                    padding: "20px 60px 20px 20px",
                    fontSize: "1.1rem",
                    }}
                />

                <i
                    className="bi bi-beaker position-absolute top-50 end-0 translate-middle-y me-4 text-info"
                    style={{ fontSize: "1.4rem" }}
                ></i>
                </div>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3 mb-5">
                <button
                className="btn btn-info btn-lg px-4 fw-semibold shadow"
                onClick={handleBalance}
                disabled={loading}
                style={{
                    borderRadius: "16px",
                }}
                >
                {loading ? (
                    <>
                    <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                    ></span>
                    Balancing...
                    </>
                ) : (
                    <>
                    <i className="bi bi-stars me-2"></i>
                    Balance Equation
                    </>
                )}
                </button>

                <button
                className="btn btn-outline-light btn-lg px-4 fw-semibold"
                onClick={handleRandom}
                style={{
                    borderRadius: "16px",
                }}
                >
                <i className="bi bi-shuffle me-2"></i>
                Random Equation
                </button>

                <button
                className="btn btn-outline-danger btn-lg px-4 fw-semibold"
                onClick={handleClear}
                style={{
                    borderRadius: "16px",
                }}
                >
                <i className="bi bi-trash3 me-2"></i>
                Clear
                </button>
            </div>

            {/* Output */}
            <div
                className="p-4"
                style={{
                borderRadius: "24px",
                background:
                    "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.12))",
                border: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check2-circle text-success fs-3 me-3"></i>

                <div>
                    <h4 className="mb-0 fw-bold">
                    Balanced Equation
                    </h4>

                    <small className="text-secondary">
                    Output will appear here
                    </small>
                </div>
                </div>

                <div
                className="text-center py-4 px-3"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "18px",
                    minHeight: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                {balancedEquation ? (
                    <h2
                    className="fw-bold text-info mb-0"
                    style={{
                        wordBreak: "break-word",
                    }}
                    >
                    {balancedEquation}
                    </h2>
                ) : (
                    <div className="text-secondary">
                    <i className="bi bi-arrow-up-circle fs-1 d-block mb-2"></i>
                    No balanced equation yet
                    </div>
                )}
                </div>
            </div>

            {/* Tips Section */}
            <div className="row mt-5 g-4">
                <div className="col-md-4">
                <div
                    className="h-100 p-3"
                    style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "18px",
                    }}
                >
                    <i className="bi bi-lightbulb text-warning fs-2"></i>
                    <h5 className="mt-3 fw-bold">
                    Smart Parsing
                    </h5>
                    <p className="text-secondary mb-0">
                    Supports brackets, coefficients, and complex compounds.
                    </p>
                </div>
                </div>

                <div className="col-md-4">
                <div
                    className="h-100 p-3"
                    style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "18px",
                    }}
                >
                    <i className="bi bi-lightning-charge text-info fs-2"></i>
                    <h5 className="mt-3 fw-bold">
                    Fast Balancing
                    </h5>
                    <p className="text-secondary mb-0">
                    Matrix-based balancing engine for instant results.
                    </p>
                </div>
                </div>

                <div className="col-md-4">
                <div
                    className="h-100 p-3"
                    style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "18px",
                    }}
                >
                    <i className="bi bi-journal-code text-success fs-2"></i>
                    <h5 className="mt-3 fw-bold">
                    Learning Friendly
                    </h5>
                    <p className="text-secondary mb-0">
                    Great for chemistry students and educational tools.
                    </p>
                </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-5 text-secondary small">
                Built with React + Bootstrap + Bootstrap Icons
            </div>
            </div>
        </div>
        </div>
    );
}


export default KhemBalanceView;