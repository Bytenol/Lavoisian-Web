// import { createContext, useContext, useState } from "react";

// const SnackbarContext = createContext("");

// // const Snackbar = ({ message: string, type="info", visible: boolean = false }) => {
// //     return(
// //         // <div className={`snackbar ${visible? "show": ""} ${type}`}>
// //         //     {message}
// //         // </div>
// //     );
// // }

// const SnackbarProvider = ({ children }) => {
//     const [snack, setSnack] = useState({
//         message: "",
//         type: "info",
//         visible: false,
//      });

//     const showSnackbar = (message: string, type = "info", duration = 3000) => {
//         setSnack({ message, type, visible: true });

//         setTimeout(() => {
//             setSnack((prev) => ({ ...prev, visible: false }));
//         }, duration);
//     }

//     return <SnackbarContext.Provider value={{ showSnackbar }}>
//         {children}
//         {/* <Snackbar {...snack} /> */}
//     </SnackbarContext.Provider>
// }


// export const useSnackbar = () => useContext(SnackbarContext);

// export default SnackbarProvider;

