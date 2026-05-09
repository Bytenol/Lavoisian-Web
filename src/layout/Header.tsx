const Header = () => {
    return(
	<header
		className="px-4 py-3 d-flex align-items-center justify-content-between"
		style={{
		background: "rgba(15, 23, 42, 0.75)",
		backdropFilter: "blur(10px)",
		borderBottom: "1px solid rgba(255,255,255,0.05)",
		}}
	>
		{/* LEFT */}
		<div>
			<h4 className="text-white fw-bold mb-0">
				Lavoisian
			</h4>

			<small className="text-secondary">
				Modern Chemistry Workspace
			</small>
		</div>

		{/* RIGHT */}
		<div className="d-flex align-items-center gap-3">
		
			{/* <div className="position-relative d-none d-md-block">
				<input
				type="text"
				className="form-control border-0 text-light"
				placeholder="Search..."
				style={{
					width: "250px",
					borderRadius: "16px",
					background: "rgba(255,255,255,0.06)",
					paddingLeft: "42px",
				}}
				/>

				<i
				className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
				></i>
			</div> */}

			{/* ICONS */}
			{/* <button className="btn text-light position-relative">
				<i className="bi bi-bell-fill fs-5"></i>

				<span
				className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
				>
				3
				</span>
			</button>

			<button className="btn text-light">
				<i className="bi bi-moon-stars-fill fs-5"></i>
			</button> */}
		</div>
	</header>
    );
}

export default Header;