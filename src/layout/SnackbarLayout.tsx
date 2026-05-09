import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface iSnackbarLayoutProps {
    header?: ReactNode,
    footer?: ReactNode,
    aside?: ReactNode,
}

  
export default function SnackbarLayout({ header, footer, aside }: iSnackbarLayoutProps) {
	return (
		<div  className="d-flex w-100 h-100"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 40%, #1e293b 100%)",
        overflow: "hidden",
      }}>
		
		{ aside }
		<div className="flex-grow-1 d-flex flex-column w-100 h-100">
			{ header }
			<main className="flex-grow-1 p-4" style={{overflowY: "auto",}}>
				<div
					style={{
					borderRadius: "28px",
					background: "rgba(15, 23, 42, 0.72)",
					border: "1px solid rgba(255,255,255,0.06)",
					minHeight: "600px",
					padding: "24px",
					backdropFilter: "blur(12px)",
					}}
				>
					<Outlet />
				</div>
			</main>
			{footer}
		</div>
		</div>
	);
}