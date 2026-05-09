import { useEffect, useState } from "react";
import PeriodicTable from "./PeriodicTable";

interface iElement {
	symbol: string;
	name: string;
	atomic_mass: number;
	atomic_number: number;
}


const ElementCard = () => {
	const id = `cvs-${"Hydrogen"}`;


	useEffect(() => {
		const canvas = document.getElementById(id) as HTMLCanvasElement;
		canvas.style.background = "red";
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

		ctx.fillStyle = "white";
		ctx.fillRect(0, 80, 100, 20);

		console.log(canvas);

	}, []);

	return (
		<canvas id={id} width={100} height={100}></canvas>
	);
}





const PeriodicTableView = () => {

    return ( 
		<div>
			<div className="mb-4 d-flex align-items-center justify-content-between"
				style={{
					background:
					"linear-gradient(135deg, rgba(6,182,212,0.18), rgba(59,130,246,0.12))",
					border: "1px solid rgba(255,255,255,0.06)",
					borderRadius: "22px",
					padding: "18px 24px",
					backdropFilter: "blur(10px)",
				}}
			>
			
				<div className="d-flex align-items-center gap-3">
						<div
						className="d-flex align-items-center justify-content-center"
						style={{
							width: "52px",
							height: "52px",
							borderRadius: "16px",
							background:
							"linear-gradient(135deg, #06b6d4, #3b82f6)",
						}}
						>
						<i className="bi bi-lightning-charge-fill text-white fs-4"></i>
						</div>

						<div>
							<h5 className="text-white fw-bold mb-1">
								Welcome Back 👋
							</h5>

							<div className="text-secondary">
								Ready to balance equations and explore chemistry?
							</div>
						</div>
					</div>

					<button className="btn btn-info fw-semibold px-4" style={{borderRadius: "14px", }} >
						Quick Start
					</button>
			</div>
			
			<PeriodicTable />

			
		</div>
	);
}


export default PeriodicTableView;