import { useState } from "react";
import { useAppNavigation } from "../utils/ReactUtils";

const Aside = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { navigateTo } = useAppNavigation();

    const navItems = [
        {
            label: "Periodic Table",
            icon: "bi-table",
            src: "/"
        },
        {
            label: "Balance Equation",
            icon: "bi-atom-fill",
            src: "/khembalance"
        },
        {
            label: "Molar Calculator",
            icon: "bi-calculator-fill",
            src: "/molar-calculator"
        },
        {
            label: "Reaction Simulator",
            icon: "bi-lightning-charge-fill",
            src: "/reaction-simulator"
        },
        // {
        //     label: "Settings",
        //     icon: "bi-gear-fill",
        // },
    ];


    const choseSelectedIndex = (index: number) => {
        const el = document.querySelectorAll(".asideNavButton");
        el[selectedIndex].classList.remove("selected");
        el[index].classList.add("selected");
        setSelectedIndex(index);
        navigateTo(navItems[index].src);
    }

    return(
        <aside
        style={{
          width: sidebarOpen ? "280px" : "90px",
          transition: "all 0.3s ease",
          background: "rgba(15, 23, 42, 0.92)",
          backdropFilter: "blur(14px)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
        className="d-flex flex-column shadow-lg"
      >
        {/* LOGO */}
        <div
          className="d-flex align-items-center justify-content-between p-4"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, #06b6d4, #3b82f6)",
              }}
            >
              <i className="bi bi-flask-fill text-white fs-4"></i>
            </div>

            {sidebarOpen && (
              <div>
                <h5 className="text-white fw-bold mb-0">
                  ChemLab
                </h5>

                <small className="text-secondary">
                  Chemistry Toolkit
                </small>
              </div>
            )}
          </div>

          <button
            className="btn btn-sm text-light"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i
              className={`bi ${
                sidebarOpen
                  ? "bi-chevron-left"
                  : "bi-chevron-right"
              }`}
            ></i>
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-grow-1 p-3">
          <div className="mb-3 px-2">
            {sidebarOpen && (
              <small className="text-uppercase text-secondary fw-bold">
                Navigation
              </small>
            )}
          </div>

          <div className="d-flex flex-column gap-2">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`btn text-start text-light border-0 asideNavButton ${index === 0 ? "selected":""}`}
                style={{
                  borderRadius: "16px",
                  padding: "14px 16px",
                  transition: "0.2s",
                }}
                onClick={() => choseSelectedIndex(index)}
              >
                <div className="d-flex align-items-center">
                  <i
                    className={`${item.icon} fs-5`}
                    style={{
                      minWidth: "30px",
                    }}
                  ></i>

                  {sidebarOpen && (
                    <span className="ms-3 fw-medium">
                      {item.label}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="p-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="d-flex align-items-center gap-3 p-2"
            style={{
              borderRadius: "16px",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "14px",
                objectFit: "cover",
              }}
            />

            {sidebarOpen && (
              <div>
                <div className="text-white fw-semibold">
                  Ibrahim
                </div>

                <small className="text-secondary">
                  Chemistry Developer
                </small>
              </div>
            )}
          </div>
        </div>
      </aside>
    );
}


export default Aside;